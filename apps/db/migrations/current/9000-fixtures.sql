delete from publ.users where id = 'ad55efe4-c88b-46c3-b641-07a1b69f488c';

insert into publ.users (id, firstname, lastname, is_verified, is_admin) values
  (
    'ad55efe4-c88b-46c3-b641-07a1b69f488c',
    'Admin',
    'Jojo',
    true,
    true
  );

  update priv.user_secrets set password_hash = crypt('password', gen_salt('bf')) where user_id = 'ad55efe4-c88b-46c3-b641-07a1b69f488c';

insert into publ.user_emails (user_id, email, is_verified) values
  (
    'ad55efe4-c88b-46c3-b641-07a1b69f488c',
    'superadmin@grinn.tech',
    true
    );