/*
 * When a user is invited to an organization, a record will be added to this
 * table. Once the invitation is accepted, the record will be deleted. We'll
 * handle the mechanics of invitation later.
 */
create table publ.organization_invitations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references publ.organizations on delete cascade,
  code text,
  user_id uuid references publ.users on delete cascade,
  email citext,
  check ((user_id is null) <> (email is null)),
  check ((code is null) = (email is null)),
  unique (organization_id, user_id),
  unique (organization_id, email)
);
alter table publ.organization_invitations enable row level security;

create index on publ.organization_invitations(user_id);

-- We're not granting any privileges here since we don't need any currently.
-- grant select on publ.organization_invitations to :DATABASE_VISITOR;

-- Send the user an invitation email to join the organization
create trigger _500_send_email after insert on publ.organization_invitations
  for each row execute procedure priv.tg__add_job('organization_invitations__send_invite');
