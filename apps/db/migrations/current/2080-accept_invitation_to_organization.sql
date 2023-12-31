/*
 * This function accepts an invitation to join the organization and adds you to
 * the organization (deleting the invite).  If you were invited by username (or
 * your account could already be determined) you can accept an invitation
 * directly by the invitation_id; otherwise you will need the code as well to
 * prove you are the person that was invited (for example if you were invited
 * using a different email address to that which you created your account
 * with).
 */
create function publ.accept_invitation_to_organization(invitation_id uuid, code text = null)
  returns void as $$
declare
  v_organization publ.organizations;
begin
  v_organization = publ.organization_for_invitation(invitation_id, code);

  -- Accept the user into the organization
  insert into publ.organization_memberships (organization_id, user_id)
    values(v_organization.id, publ.current_user_id())
    on conflict do nothing;

  -- Delete the invitation
  delete from publ.organization_invitations where id = invitation_id;
end;
$$ language plpgsql volatile security definer set search_path = pg_catalog, public, pg_temp;
