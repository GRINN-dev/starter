----------------------------------------
---- Config DB -------------------------
----------------------------------------
drop schema if exists publ cascade;
drop schema if exists priv cascade;

revoke all on schema public from public;

alter default privileges revoke all on sequences from public;
alter default privileges revoke all on functions from public;

grant all on schema public to :DATABASE_OWNER;
create schema publ;
create schema priv;

grant usage on schema public, publ to :DATABASE_VISITOR, :DATABASE_AUTHENTICATOR;

alter default privileges in schema public, publ
  grant usage, select on sequences to :DATABASE_VISITOR;

alter default privileges in schema public, publ
  grant execute on functions to :DATABASE_VISITOR;


----------------------------------------
---- Timestamp integrity trigger -------
----------------------------------------
create function priv.tg__timestamps() returns trigger as $$
begin
  NEW.created_at = (case when TG_OP = 'INSERT' then NOW() else OLD.created_at end);
  NEW.updated_at = (case when TG_OP = 'UPDATE' and OLD.updated_at >= NOW() then OLD.updated_at + interval '1 millisecond' else NOW() end);
  return NEW;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;
comment on function priv.tg__timestamps() is
  E'This trigger should be called on all tables with created_at, updated_at - it ensures that they cannot be manipulated and that updated_at will always be larger than the previous updated_at.';

----------------------------------------
---- Slugify function ------------------
----------------------------------------
CREATE OR REPLACE FUNCTION priv.to_slug(text)
RETURNS text AS $$
DECLARE
  slug text;
BEGIN
  slug := translate(lower($1), ' ', '-');
  slug := unaccent(slug);
  slug := translate(slug, '@', '-');
  slug := translate(slug, '.', '-');
  slug := translate(slug, '_', '-');
  slug := translate(slug, '/', '-');
  slug := translate(slug, '&', 'and');
  slug := translate(slug, '''', '');
  slug := translate(slug, '"', '');
  RETURN slug;
END;
$$ LANGUAGE plpgsql;



----------------------------------------
---- Auth Utils ------------------------
----------------------------------------
create table priv.sessions (
  uuid uuid not null default gen_random_uuid() primary key,
  user_id uuid not null,
  refresh_token text,
  created_at timestamptz not null default now(),
  total_refreshes int not null default 0,
  last_refresh_at timestamptz not null default now(),
);
alter table priv.sessions enable row level security;

-- To allow us to efficiently see what sessions are open for a particular user.
create index on priv.sessions (user_id);
create index on priv.sessions (refresh_token);

create function publ.current_session_id() returns uuid as $$
  select nullif(pg_catalog.current_setting('jwt.claims.sid', true), '')::uuid;
$$ language sql stable;
comment on function publ.current_session_id() is
  E'Handy method to get the current session ID.';

create function publ.current_user_id() returns uuid as $$
  select nullif(pg_catalog.current_setting('jwt.claims.sub', true), '')::uuid;
$$ language sql stable;
comment on function publ.current_user_id() is
  E'Handy method to get the current user ID for use in RLS policies, etc; in GraphQL, use `currentUser{id}` instead.';


----------------------------------------
---- Users -----------------------------
----------------------------------------
drop table if exists publ.users cascade;
create table publ.users (
    id uuid not null default uuid_generate_v4() primary key unique, 
    firstname text not null,
    lastname text not null,
    birthdate date,
    avatar_url text check(avatar_url ~ '^https?://[^/]+'),
    phone_number text,
    gender text,
    email citext not null check (email ~ '[^@]+@[^@]+\.[^@]+'),
    is_admin boolean not null default false,
    is_verified boolean not null default false,
    is_suspended boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.users(created_at);
  create index on publ.users(updated_at);
  create index on publ.users(firstname);
  create index on publ.users(lastname);
  create index on publ.users(email);

-- RBAC
-- on ne propose pas d'insert car soumis au register
  grant select on publ.users to :DATABASE_VISITOR; 
  grant update(firstname, lastname, gender, avatar_url, birthdate, phone_number) on publ.users to :DATABASE_VISITOR;
  grant delete on publ.users to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.users
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.users enable row level security;

  -- Users are publicly visible, like on GitHub, Twitter, Facebook, Trello, etc.
  create policy select_all on publ.users for select using (true);
  -- You can only update yourself.
  create policy update_self on publ.users for update using (id = publ.current_user_id());

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.users
*/


-- We couldn't implement this relationship on the sessions table until the users table existed!
alter table priv.sessions
  add constraint sessions_user_id_fkey
  foreign key ("user_id") references publ.users on delete cascade;

comment on table publ.users is
  E'A user who can log in to the application.';

comment on column publ.users.id is
  E'Unique identifier for the user.';
comment on column publ.users.avatar_url is
  E'Optional avatar URL.';
comment on column publ.users.is_admin is
  E'If true, the user has elevated privileges.';


create function publ.current_user() returns publ.users as $$
  select users.* from publ.users where id = publ.current_user_id();
$$ language sql stable;
comment on function publ.current_user() is
  E'The currently logged in user (or null if not logged in).';


----------------------------------------
---- User Secrets ----------------------
----------------------------------------
create table priv.user_secrets (
  user_id uuid not null primary key references publ.users on delete cascade,
  password_hash text,
  last_login_at timestamptz not null default now(),
  failed_password_attempts int not null default 0,
  first_failed_password_attempt timestamptz,
  reset_password_token text,
  reset_password_token_generated timestamptz,
  failed_reset_password_attempts int not null default 0,
  first_failed_reset_password_attempt timestamptz,
  delete_account_token text,
  delete_account_token_generated timestamptz,
  verification_token text,
  verification_email_sent_at timestamptz,
  password_reset_email_sent_at timestamptz
);
alter table priv.user_secrets enable row level security;
comment on table priv.user_secrets is
  E'The contents of this table should never be visible to the user. Contains data mostly related to authentication.';

/*
 * When we insert into `users` we _always_ want there to be a matching
 * `user_secrets` entry, so we have a trigger to enforce this:
 */
create function priv.tg_user_secrets__insert_with_user() returns trigger as $$
declare
  v_verification_token text;
begin  
  if NEW.is_verified is false then
    v_verification_token = encode(gen_random_bytes(7), 'hex');
  end if;

  insert into priv.user_secrets(user_id, verification_token) values(NEW.id, v_verification_token);
  return NEW;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;


create trigger _500_insert_secrets
  after insert on publ.users
  for each row
  execute procedure priv.tg_user_secrets__insert_with_user();
comment on function priv.tg_user_secrets__insert_with_user() is
  E'Ensures that every user record has an associated user_secret record.';



/*
 * Because you can register with email/password or using OAuth (social
 * login), we need a way to tell the user whether or not they have a
 * password. This is to help the UI display the right interface: change
 * password or set password.
 */


create function publ.users_has_password(u publ.users) returns boolean as $$
  select (password_hash is not null) from priv.user_secrets where user_secrets.user_id = u.id and u.id = publ.current_user_id();
$$ language sql stable security definer set search_path to pg_catalog, public, pg_temp;



----------------------------------------
---- User Emails -----------------------
----------------------------------------

create function publ.tg_users__send_verification_email() returns trigger as $$
begin
  perform graphile_worker.add_job('users__send_verification', json_build_object('user', NEW));
  return NEW;
end;
$$ language plpgsql stable security definer set search_path to pg_catalog, public, pg_temp;

create trigger _900_send_verification_email
  after insert on publ.users
  for each row
  when (NEW.is_verified is false)
  execute procedure
   priv.tg__add_job('users__send_verification');

-- You can't verify an email address that someone else has already verified. (Email is taken.)
create function publ.tg_users__forbid_if_verified() returns trigger as $$
begin
  if exists(select 1 from publ.users where email = NEW.email and is_verified is true) then
    raise exception 'An account using that email address has already been created.' using errcode='EMTKN';
  end if;
  return NEW;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;
create trigger _200_forbid_existing_email before insert on publ.users for each row execute procedure publ.tg_users__forbid_if_verified();

-- If the email wasn't already verified (e.g. via a social login provider) then
-- queue up the verification email to be sent.










/*
 * When the user receives the email verification message it will contain the
 * token; this function is responsible for checking the token and marking the
 * email as verified if it matches. Note it is a `SECURITY DEFINER` function,
 * which means it runs with the security of the user that defined the function
 * (which is the database owner) - i.e. it can do anything the database owner
 * can do. This means we have to be very careful what we put in the function,
 * and make sure that it checks that the user is allowed to do what they're
 * trying to do - in this case, we do that check by ensuring the token matches.
 */


create function publ.verify_email(user_id uuid, token text) returns boolean as $$
begin
  update publ.users
  set
    is_verified = true
  where id = user_id
  and exists(
    select 1 from priv.user_secrets where user_secrets.user_id = users.id and verification_token = token
  );
  return found;
end;
$$ language plpgsql strict volatile security definer set search_path to pg_catalog, public, pg_temp;
comment on function publ.verify_email(user_id uuid, token text) is
  E'Once you have received a verification token for your email, you may call this mutation with that token to make your email verified.';


create function publ.resend_email_verification_code(user_id uuid) returns boolean as $$
begin
  if exists(
    select 1
    from publ.users
    where users.id = user_id
    and user_id = publ.current_user_id()
    and is_verified is false
  ) then
    perform graphile_worker.add_job('user_emails__send_verification', json_build_object('id', user_id));
    return true;
  end if;
  return false;
end;
$$ language plpgsql strict volatile security definer set search_path to pg_catalog, public, pg_temp;
comment on function publ.resend_email_verification_code(user_id uuid) is
  E'If you didn''t receive the verification code for this email, we can resend it. We silently cap the rate of resends on the backend, so calls to this function may not result in another email being sent if it has been called recently.';

--! split: 00220-user_authentications.sql
/*
 * In addition to logging in with email and password, users may use
 * other authentication methods, such as "social login" (OAuth) with GitHub,
 * Twitter, Facebook, etc. We store details of these logins to the
 * user_authentications and user_authentication_secrets tables.
 *
 * The user is allowed to delete entries in this table (which will unlink them
 * from that service), but adding records to the table requires elevated
 * privileges (it's managed by the `installPassportStrategy.ts` middleware,
 * which calls out to the `priv.link_or_register_user` database
 * function).
 */
create table publ.user_authentications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references publ.users on delete cascade,
  service text not null,
  identifier text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint uniq_user_authentications unique(service, identifier)
);

alter table publ.user_authentications enable row level security;

-- Make it efficient to find all the authentications for a particular user.
create index on publ.user_authentications(user_id);

-- Keep created_at and updated_at up to date.
create trigger _100_timestamps
  before insert or update on publ.user_authentications
  for each row
  execute procedure priv.tg__timestamps();

comment on table publ.user_authentications is
  E'Contains information about the login providers this user has used, so that they may disconnect them should they wish.';
comment on column publ.user_authentications.service is
  E'The login service used, e.g. `twitter` or `github`.';
comment on column publ.user_authentications.identifier is
  E'A unique identifier for the user within the login service.';
comment on column publ.user_authentications.details is
  E'Additional profile details extracted from this login method';

-- Users may view and delete their social logins.
create policy select_own on publ.user_authentications for select using (user_id = publ.current_user_id());
create policy delete_own on publ.user_authentications for delete using (user_id = publ.current_user_id());
-- TODO: on delete, check this isn't the last one, or that they have a verified
-- email address or password. For now we're not worrying about that since all
-- the OAuth providers we use verify the email address.

-- Notify the user if a social login is removed.
create trigger _500_audit_removed
  after delete on publ.user_authentications
  for each row
  execute procedure priv.tg__add_audit_job(
    'unlinked_account',
    'user_id',
    'service',
    'identifier'
  );
-- NOTE: we don't need to notify when a linked account is added here because
-- that's handled in the link_or_register_user function.

grant select on publ.user_authentications to :DATABASE_VISITOR;
grant delete on publ.user_authentications to :DATABASE_VISITOR;

/**********/

-- This table contains secret information for each user_authentication; could
-- be things like access tokens, refresh tokens, profile information. Whatever
-- the passport strategy deems necessary.
create table priv.user_authentication_secrets (
  user_authentication_id uuid not null primary key references publ.user_authentications on delete cascade,
  details jsonb not null default '{}'::jsonb
);
alter table priv.user_authentication_secrets enable row level security;

-- NOTE: user_authentication_secrets doesn't need an auto-inserter as we handle
-- that everywhere that can create a user_authentication row.

--! split: 00230-login.sql
/*
 * This function handles logging in a user with their email
 * address and password.
 *
 * Note that it is not in publ; this function is intended to be called
 * with elevated privileges (namely from `PassportLoginPlugin.ts`). The reason
 * for this is because we want to be able to track failed login attempts (to
 * help protect user accounts). If this were callable by a user, they could
 * roll back the transaction when a login fails and no failed attempts would be
 * logged, effectively giving them infinite retries. We want to disallow this,
 * so we only let code call into `login` that we trust to not roll back the
 * transaction afterwards.
 */
create function priv.login(email citext, password text) returns priv.sessions as $$
declare
  v_user publ.users;
  v_user_secret priv.user_secrets;
  v_login_attempt_window_duration interval = interval '5 minutes';
  v_session priv.sessions;
begin

    -- It's an email
    select users.* into v_user
    from publ.users
    where users.email = login.email
    and users.is_suspended = false limit 1;

  if not (v_user is null) then
    -- Load their secrets
    select * into v_user_secret from priv.user_secrets
    where user_secrets.user_id = v_user.id;

    -- Have there been too many login attempts?
    if (
      v_user_secret.first_failed_password_attempt is not null
    and
      v_user_secret.first_failed_password_attempt > NOW() - v_login_attempt_window_duration
    and
      v_user_secret.failed_password_attempts >= 3
    ) then
      raise exception 'User account locked - too many login attempts. Try again after 5 minutes.' using errcode = 'LOCKD';
    end if;

    -- Not too many login attempts, let's check the password.
    -- NOTE: `password_hash` could be null, this is fine since `NULL = NULL` is null, and null is falsy.
    if v_user_secret.password_hash = crypt(password, v_user_secret.password_hash) then
      -- Excellent - they're logged in! Let's reset the attempt tracking
      update priv.user_secrets
      set failed_password_attempts = 0, first_failed_password_attempt = null, last_login_at = now()
      where user_id = v_user.id;
      -- Create a session for the user
      insert into priv.sessions (user_id) values (v_user.id) returning * into v_session;
      -- And finally return the session
      return v_session;
    else
      -- Wrong password, bump all the attempt tracking figures
      update priv.user_secrets
      set
        failed_password_attempts = (case when first_failed_password_attempt is null or first_failed_password_attempt < now() - v_login_attempt_window_duration then 1 else failed_password_attempts + 1 end),
        first_failed_password_attempt = (case when first_failed_password_attempt is null or first_failed_password_attempt < now() - v_login_attempt_window_duration then now() else first_failed_password_attempt end)
      where user_id = v_user.id;
      return null; -- Must not throw otherwise transaction will be aborted and attempts won't be recorded
    end if;
  else
    -- No user with that email was found
    return null;
  end if;
end;
$$ language plpgsql strict volatile;

comment on function priv.login(email citext, password text) is
  E'Returns a user that matches the email/password combo, or null on failure.';

--! split: 00240-logout.sql
/*
 * Logging out deletes the session, and clears the session_id in the
 * transaction. This is a `SECURITY DEFINER` function, so we check that the
 * user is allowed to do it by matching the current_session_id().
 */
create function publ.logout() returns void as $$
begin
  -- Delete the session
  delete from priv.sessions where uuid = publ.current_session_id();
  -- Clear the identifier from the transaction
  perform set_config('jwt.claims.sid', '', true);
end;
$$ language plpgsql security definer volatile set search_path to pg_catalog, public, pg_temp;

--! split: 00250-forgot_password.sql
/*
 * When a user forgets their password we want to let them set a new one; but we
 * need to be very careful with this. We don't want to reveal whether or not an
 * account exists by the email address, so we email the entered email address
 * whether or not it's registered. If it's not registered, we track these
 * attempts in `unregistered_email_password_resets` to ensure that we don't
 * allow spamming the address; otherwise we store it to `user_secrets`.
 *
 * `publ.forgot_password` is responsible for checking these things and
 * queueing a reset password token to be emailed to the user. For what happens
 * after the user receives this email, see instead `priv.reset_password`.
 *
 * NOTE: unlike priv.login and priv.reset_password, rolling back
 * the results of this function will not cause any security issues so we do not
 * need to call it indirectly as we do for those other functions. (Rolling back
 * will undo the tracking of when we sent the email but it will also prevent
 * the email being sent, so it's harmless.)
 */

create table priv.unregistered_email_password_resets (
  email citext constraint unregistered_email_pkey primary key,
  attempts int not null default 1,
  latest_attempt timestamptz not null
);
comment on table priv.unregistered_email_password_resets is
  E'If someone tries to recover the password for an email that is not registered in our system, this table enables us to rate-limit outgoing emails to avoid spamming.';
comment on column priv.unregistered_email_password_resets.attempts is
  E'We store the number of attempts to help us detect accounts being attacked.';
comment on column priv.unregistered_email_password_resets.latest_attempt is
  E'We store the time the last password reset was sent to this email to prevent the email getting flooded.';

/**********/

create function publ.forgot_password(email citext) returns void as $$
declare
  v_user publ.users;
  v_token text;
  v_token_min_duration_between_emails interval = interval '3 minutes';
  v_token_max_duration interval = interval '3 days';
  v_now timestamptz = clock_timestamp(); -- Function can be called multiple during transaction
  v_latest_attempt timestamptz;
begin
  -- Find the matching user:
  select users.* into v_user
  from publ.users
  where users.email = forgot_password.email
  order by is_verified desc, id desc;

  -- If there is no match:
  if v_user is null then
    -- This email doesn't exist in the system; trigger an email stating as much.

    -- We do not allow this email to be triggered more than once every 15
    -- minutes, so we need to track it:
    insert into priv.unregistered_email_password_resets (email, latest_attempt)
      values (forgot_password.email, v_now)
      on conflict on constraint unregistered_email_pkey
      do update
        set latest_attempt = v_now, attempts = unregistered_email_password_resets.attempts + 1
        where unregistered_email_password_resets.latest_attempt < v_now - interval '15 minutes'
      returning latest_attempt into v_latest_attempt;

    if v_latest_attempt = v_now then
      perform graphile_worker.add_job(
        'user__forgot_password_unregistered_email',
        json_build_object('email', forgot_password.email::text)
      );
    end if;

    -- TODO: we should clear out the unregistered_email_password_resets table periodically.

    return;
  end if;

  -- There was a match.
  -- See if we've triggered a reset recently:
  if exists(
    select 1
    from priv.user_secrets
    where user_id = v_user.id
    and password_reset_email_sent_at is not null
    and password_reset_email_sent_at > v_now - v_token_min_duration_between_emails
  ) then
    -- If so, take no action.
    return;
  end if;

  -- Fetch or generate reset token:
  update priv.user_secrets
  set
    reset_password_token = (
      case
      when reset_password_token is null or reset_password_token_generated < v_now - v_token_max_duration
      then encode(gen_random_bytes(7), 'hex')
      else reset_password_token
      end
    ),
    reset_password_token_generated = (
      case
      when reset_password_token is null or reset_password_token_generated < v_now - v_token_max_duration
      then v_now
      else reset_password_token_generated
      end
    )
  where user_id = v_user.user_id
  returning reset_password_token into v_token;

  -- Don't allow spamming an email:
  update priv.user_secrets
  set password_reset_email_sent_at = v_now
  where user_id = v_user.id;

  -- Trigger email send:
  perform graphile_worker.add_job(
    'user__forgot_password',
    json_build_object('id', v_user.id, 'email', v_user.email::text, 'token', v_token)
  );

end;
$$ language plpgsql strict security definer volatile set search_path to pg_catalog, public, pg_temp;

comment on function publ.forgot_password(email public.citext) is
  E'If you''ve forgotten your password, give us one of your email addresses and we''ll send you a reset token. Note this only works if you have added an email address!';

--! split: 00260-reset_password.sql
/*
 * This is the second half of resetting a users password, please see
 * `publ.forgot_password` for the first half.
 *
 * The `priv.reset_password` function checks the reset token is correct
 * and sets the user's password to be the newly provided password, assuming
 * `assert_valid_password` is happy with it. If the attempt fails, this is
 * logged to avoid a brute force attack. Since we cannot risk this tracking
 * being lost (e.g. by a later error rolling back the transaction), we put this
 * function into priv and explicitly call it from the `resetPassword`
 * field in `PassportLoginPlugin.ts`.
 */

create function priv.assert_valid_password(new_password text) returns void as $$
begin
  -- TODO: add better assertions!
  if length(new_password) < 8 then
    raise exception 'Password is too weak' using errcode = 'WEAKP';
  end if;
end;
$$ language plpgsql volatile;



create function priv.reset_password(user_id uuid, reset_token text, new_password text) returns boolean as $$
declare
  v_user publ.users;
  v_user_secret priv.user_secrets;
  v_token_max_duration interval = interval '3 days';
begin
  select users.* into v_user
  from publ.users
  where id = user_id;

  if not (v_user is null) then
    -- Load their secrets
    select * into v_user_secret from priv.user_secrets
    where user_secrets.user_id = v_user.id;

    -- Have there been too many reset attempts?
    if (
      v_user_secret.first_failed_reset_password_attempt is not null
    and
      v_user_secret.first_failed_reset_password_attempt > NOW() - v_token_max_duration
    and
      v_user_secret.failed_reset_password_attempts >= 20
    ) then
      raise exception 'Password reset locked - too many reset attempts' using errcode = 'LOCKD';
    end if;

    -- Not too many reset attempts, let's check the token
    if v_user_secret.reset_password_token = reset_token then
      -- Excellent - they're legit

      perform priv.assert_valid_password(new_password);

      -- Let's reset the password as requested
      update priv.user_secrets
      set
        password_hash = crypt(new_password, gen_salt('bf')),
        failed_password_attempts = 0,
        first_failed_password_attempt = null,
        reset_password_token = null,
        reset_password_token_generated = null,
        failed_reset_password_attempts = 0,
        first_failed_reset_password_attempt = null
      where user_secrets.user_id = v_user.id;

      -- Revoke the users' sessions
      delete from priv.sessions
      where sessions.user_id = v_user.id;

      -- Notify user their password was reset
      perform graphile_worker.add_job(
        'user__audit',
        json_build_object(
          'type', 'reset_password',
          'user_id', v_user.id,
          'current_user_id', publ.current_user_id()
        ));

      return true;
    else
      -- Wrong token, bump all the attempt tracking figures
      update priv.user_secrets
      set
        failed_reset_password_attempts = (case when first_failed_reset_password_attempt is null or first_failed_reset_password_attempt < now() - v_token_max_duration then 1 else failed_reset_password_attempts + 1 end),
        first_failed_reset_password_attempt = (case when first_failed_reset_password_attempt is null or first_failed_reset_password_attempt < now() - v_token_max_duration then now() else first_failed_reset_password_attempt end)
      where user_secrets.user_id = v_user.id;
      return null;
    end if;
  else
    -- No user with that id was found
    return null;
  end if;
end;
$$ language plpgsql strict volatile;

--! split: 00270-request_account_deletion.sql
/*
 * For security reasons we don't want to allow a user to just delete their user
 * account without confirmation; so we have them request deletion, receive an
 * email, and then click the link in the email and press a button to confirm
 * deletion. This function handles the first step in this process; see
 * `publ.confirm_account_deletion` for the second half.
 */

create function publ.request_account_deletion() returns boolean as $$
declare
  v_user publ.users;
  v_token text;
  v_token_max_duration interval = interval '3 days';
begin
  if publ.current_user_id() is null then
    raise exception 'You must log in to delete your account' using errcode = 'LOGIN';
  end if;

  -- Get the email to send account deletion token to
  select * into v_user
    from publ.users
    where id = publ.current_user_id()
    order by is_verified desc, id desc
    limit 1;

  -- Fetch or generate token
  update priv.user_secrets
  set
    delete_account_token = (
      case
      when delete_account_token is null or delete_account_token_generated < NOW() - v_token_max_duration
      then encode(gen_random_bytes(7), 'hex')
      else delete_account_token
      end
    ),
    delete_account_token_generated = (
      case
      when delete_account_token is null or delete_account_token_generated < NOW() - v_token_max_duration
      then now()
      else delete_account_token_generated
      end
    )
  where user_id = publ.current_user_id()
  returning delete_account_token into v_token;

  -- Trigger email send
  perform graphile_worker.add_job('user__send_delete_account_email', json_build_object('email', v_user.email::text, 'token', v_token));
  return true;
end;
$$ language plpgsql strict security definer volatile set search_path to pg_catalog, public, pg_temp;

comment on function publ.request_account_deletion() is
  E'Begin the account deletion flow by requesting the confirmation email';

--! split: 00280-confirm_account_deletion.sql
/*
 * This is the second half of the account deletion process, for the first half
 * see `publ.request_account_deletion`.
 */
create function publ.confirm_account_deletion(token text) returns boolean as $$
declare
  v_user_secret priv.user_secrets;
  v_token_max_duration interval = interval '3 days';
begin
  if publ.current_user_id() is null then
    raise exception 'You must log in to delete your account' using errcode = 'LOGIN';
  end if;

  select * into v_user_secret
    from priv.user_secrets
    where user_secrets.user_id = publ.current_user_id();

  if v_user_secret is null then
    -- Success: they're already deleted
    return true;
  end if;

  -- Check the token
  if (
    -- token is still valid
    v_user_secret.delete_account_token_generated > now() - v_token_max_duration
  and
    -- token matches
    v_user_secret.delete_account_token = token
  ) then
    -- Token passes; delete their account :(
    delete from publ.users where id = publ.current_user_id();
    return true;
  end if;

  raise exception 'The supplied token was incorrect - perhaps you''re logged in to the wrong account, or the token has expired?' using errcode = 'DNIED';
end;
$$ language plpgsql strict volatile security definer set search_path to pg_catalog, public, pg_temp;

comment on function publ.confirm_account_deletion(token text) is
  E'If you''re certain you want to delete your account, use `requestAccountDeletion` to request an account deletion token, and then supply the token through this mutation to complete account deletion.';

--! split: 00285-change_password.sql
/*
 * To change your password you must specify your previous password. The form in
 * the web UI may confirm that the new password was typed correctly by making
 * the user type it twice, but that isn't necessary in the API.
 */

create function publ.change_password(old_password text, new_password text) returns boolean as $$
declare
  v_user publ.users;
  v_user_secret priv.user_secrets;
begin
  select users.* into v_user
  from publ.users
  where id = publ.current_user_id();

  if not (v_user is null) then
    -- Load their secrets
    select * into v_user_secret from priv.user_secrets
    where user_secrets.user_id = v_user.id;

    if v_user_secret.password_hash = crypt(old_password, v_user_secret.password_hash) then
      perform priv.assert_valid_password(new_password);

      -- Reset the password as requested
      update priv.user_secrets
      set
        password_hash = crypt(new_password, gen_salt('bf'))
      where user_secrets.user_id = v_user.id;

      -- Revoke all other sessions
      delete from priv.sessions
      where sessions.user_id = v_user.id
      and sessions.uuid <> publ.current_session_id();

      -- Notify user their password was changed
      perform graphile_worker.add_job(
        'user__audit',
        json_build_object(
          'type', 'change_password',
          'user_id', v_user.id,
          'current_user_id', publ.current_user_id()
        ));

      return true;
    else
      raise exception 'Incorrect password' using errcode = 'CREDS';
    end if;
  else
    raise exception 'You must log in to change your password' using errcode = 'LOGIN';
  end if;
end;
$$ language plpgsql strict volatile security definer set search_path to pg_catalog, public, pg_temp;

comment on function publ.change_password(old_password text, new_password text) is
  E'Enter your old password and a new password to change your password.';

grant execute on function publ.change_password(text, text) to :DATABASE_VISITOR;

--! split: 00400-user-registration.sql
/*
 * A user account may be created explicitly via the GraphQL `register` mutation
 * (which calls `really_create_user` below), or via OAuth (which, via
 * `installPassportStrategy.ts`, calls link_or_register_user below, which may
 * then call really_create_user). Ultimately `really_create_user` is called in
 * all cases to create a user account within our system, so it must do
 * everything we'd expect in this case including validating email/password,
 * setting the password (if any), storing the email address, etc.
 */

create function priv.really_create_user(
  firstname text,
  lastname text,
  email text,
  email_is_verified bool,
  birthdate date default null,
  phone_number text default null,
  avatar_url text default null,
  experience_points integer default 0,
  role text default 'MEMBER',
  password text default null
) returns publ.users as $$
declare
  v_user publ.users;
begin
  if password is not null then
    perform priv.assert_valid_password(password);
  end if;
  if email is null then
    raise exception 'Email is required' using errcode = 'MODAT';
  end if;

  -- Insert the new user
  insert into publ.users ( firstname, lastname, birthdate, email, is_verified, phone_number, avatar_url, role) values
    ( firstname, lastname, birthdate, email, email_is_verified, phone_number, avatar_url, role)
    returning * into v_user;

  -- Store the password
  if password is not null then
    update priv.user_secrets
    set password_hash = crypt(password, gen_salt('bf'))
    where user_id = v_user.id;
  end if;

  -- Refresh the user
  select * into v_user from publ.users where id = v_user.id;

  return v_user;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;

comment on function priv.really_create_user is
  E'Creates a user account. All arguments are optional, it trusts the calling method to perform sanitisation.';

/**********/

/*
 * The `register_user` function is called by `link_or_register_user` when there
 * is no matching user to link the login to, so we want to register the user
 * using OAuth or similar credentials.
 */

create function priv.register_user(
  f_service character varying,
  f_identifier character varying,
  f_profile json,
  f_auth_details json,
  f_email_is_verified boolean default false
) returns publ.users as $$
declare
  v_user publ.users;
  v_firstname text;
  v_lastname text;
  v_birthdate date;
  v_email citext;
  v_phone_number text;
  v_avatar_url text;
  v_user_authentication_id uuid;
begin
  -- Extract data from the user’s OAuth profile data.
  v_firstname := f_profile ->> 'firstname';
  v_lastname := f_profile ->> 'lastname';
  v_birthdate := f_profile ->> 'birthdate';
  v_email := f_profile ->> 'email';
  v_phone_number := f_profile ->> 'phone_number';
  v_avatar_url := f_profile ->> 'avatar_url';

  -- Create the user account
  v_user = priv.really_create_user(
    firstname => v_firstname,
    lastname => v_lastname,
    birthdate => v_birthdate,
    email => v_email,
    email_is_verified => f_email_is_verified,
    phone_number => v_phone_number,
    avatar_url => v_avatar_url
  );

  -- Insert the user’s private account data (e.g. OAuth tokens)
  insert into publ.user_authentications (user_id, service, identifier, details) values
    (v_user.id, f_service, f_identifier, f_profile) returning id into v_user_authentication_id;
  insert into priv.user_authentication_secrets (user_authentication_id, details) values
    (v_user_authentication_id, f_auth_details);

  return v_user;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

comment on function priv.register_user(f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_email_is_verified boolean) is
  E'Used to register a user from information gleaned from OAuth. Primarily used by link_or_register_user';

/**********/

/*
 * The `link_or_register_user` function is called from
 * `installPassportStrategy.ts` when a user logs in with a social login
 * provider (OAuth), e.g. GitHub, Facebook, etc. If the user is already logged
 * in then the new provider will be linked to the users account, otherwise we
 * will try to retrieve an existing account using these details (matching the
 * service/identifier or the email address), and failing that we will register
 * a new user account linked to this service via the `register_user` function.
 *
 * This function is also responsible for keeping details in sync with the login
 * provider whenever the user logs in; you'll see this in the `update`
 * statemets towards the bottom of the function.
 */

create function priv.link_or_register_user(
  f_user_id uuid,
  f_service character varying,
  f_identifier character varying,
  f_profile json,
  f_auth_details json
) returns publ.users as $$
declare
  v_matched_user_id uuid;
  v_matched_authentication_id uuid;
  v_email citext;
  v_firstname text;
  v_lastname text;
  v_avatar_url text;
  v_user publ.users;
begin
  -- See if a user account already matches these details
  select id, user_id
    into v_matched_authentication_id, v_matched_user_id
    from publ.user_authentications
    where service = f_service
    and identifier = f_identifier
    limit 1;

  if v_matched_user_id is not null and f_user_id is not null and v_matched_user_id <> f_user_id then
    raise exception 'A different user already has this account linked.' using errcode = 'TAKEN';
  end if;

  v_email = f_profile ->> 'email';
  v_firstname := f_profile ->> 'firstname';
  v_lastname := f_profile ->> 'lastname';
  v_avatar_url := f_profile ->> 'avatar_url';

  if v_matched_authentication_id is null then
    if f_user_id is not null then
      -- Link new account to logged in user account
      insert into publ.user_authentications (user_id, service, identifier, details) values
        (f_user_id, f_service, f_identifier, f_profile) returning id, user_id into v_matched_authentication_id, v_matched_user_id;
      insert into priv.user_authentication_secrets (user_authentication_id, details) values
        (v_matched_authentication_id, f_auth_details);
      perform graphile_worker.add_job(
        'user__audit',
        json_build_object(
          'type', 'linked_account',
          'user_id', f_user_id,
          'extra1', f_service,
          'extra2', f_identifier,
          'current_user_id', publ.current_user_id()
        ));
    elsif v_email is not null then
      -- See if the email is registered
      select * into v_user from publ.users where email = v_email and is_verified is true;
      if v_user is not null then
        -- User exists!
        insert into publ.user_authentications (user_id, service, identifier, details) values
          (v_user.id, f_service, f_identifier, f_profile) returning id, user_id into v_matched_authentication_id, v_matched_user_id;
        insert into priv.user_authentication_secrets (user_authentication_id, details) values
          (v_matched_authentication_id, f_auth_details);
        perform graphile_worker.add_job(
          'user__audit',
          json_build_object(
            'type', 'linked_account',
            'user_id', f_user_id,
            'extra1', f_service,
            'extra2', f_identifier,
            'current_user_id', publ.current_user_id()
          ));
      end if;
    end if;
  end if;
  if v_matched_user_id is null and f_user_id is null and v_matched_authentication_id is null then
    -- Create and return a new user account
    return priv.register_user(f_service, f_identifier, f_profile, f_auth_details, true);
  else
    if v_matched_authentication_id is not null then
      update publ.user_authentications
        set details = f_profile
        where id = v_matched_authentication_id;
      update priv.user_authentication_secrets
        set details = f_auth_details
        where user_authentication_id = v_matched_authentication_id;
      update publ.users
        set
          firstname = coalesce(users.firstname, v_firstname),
          lastname = coalesce(users.lastname, v_lastname),
          avatar_url = coalesce(users.avatar_url, v_avatar_url)
        where id = v_matched_user_id
        returning  * into v_user;
      return v_user;
    else
      -- v_matched_authentication_id is null
      -- -> v_matched_user_id is null (they're paired)
      -- -> f_user_id is not null (because the if clause above)
      -- -> v_matched_authentication_id is not null (because of the separate if block above creating a user_authentications)
      -- -> contradiction.
      raise exception 'This should not occur';
    end if;
  end if;
end;
$$ language plpgsql volatile security definer set search_path to pg_catalog, public, pg_temp;

comment on function priv.link_or_register_user(f_user_id uuid, f_service character varying, f_identifier character varying, f_profile json, f_auth_details json) is
  E'If you''re logged in, this will link an additional OAuth login to your account if necessary. If you''re logged out it may find if an account already exists (based on OAuth details or email address) and return that, or create a new user account if necessary.';

--fixtures

insert into publ.users (id, firstname, lastname, email, is_verified, is_admin) values
  (
    'ad55efe4-c88b-46c3-b641-07a1b69f488c',
    'Admin',
    'Super',
    'superadmin@grinn.tech',
    true,
    true
  );

  update priv.user_secrets set password_hash = crypt('password', gen_salt('bf')) where user_id = 'ad55efe4-c88b-46c3-b641-07a1b69f488c';




  create or replace function publ.current_user() returns publ.users as $$

     (select * from publ.users where id = publ.current_user_id());

  $$ language sql stable security definer set search_path to pg_catalog, public, pg_temp;
  grant execute on function publ.current_user() to :DATABASE_VISITOR;
