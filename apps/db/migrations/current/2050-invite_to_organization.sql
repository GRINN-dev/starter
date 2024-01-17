/*
 * This function allows you to invite someone to an organization; you
 * need to know their email (in which case they will be sent an invitation to
 * create an account if they don't already have one, this is handled by the
 * _500_send_email trigger on organization_invitations).
 */
create function publ.invite_to_organization(organization_id uuid, email citext)
  returns void as $$
declare
  v_code text;
  v_user publ.users;
begin
  -- Are we allowed to add this person
  -- Are we logged in
  if publ.current_user_id() is null then
    raise exception 'You must log in to invite a user' using errcode = 'LOGIN';
  end if;

  -- Are we the owner of this organization
  if not exists(
    select 1 from publ.organization_memberships
      where organization_memberships.organization_id = invite_to_organization.organization_id
      and organization_memberships.user_id = publ.current_user_id()
      and is_owner is true
  ) then
    raise exception 'You''re not the owner of this organization' using errcode = 'DNIED';
  end if;

  v_code = encode(gen_random_bytes(7), 'hex');

  -- Invite the user
  insert into publ.organization_invitations(organization_id, user_id, email, code)
    values (invite_to_organization.organization_id, null, email, v_code);
end;
$$ language plpgsql volatile security definer set search_path = pg_catalog, public, pg_temp;

-- we keep the possibiolity of inviting directly a user in the future, but as of now, we don't need it