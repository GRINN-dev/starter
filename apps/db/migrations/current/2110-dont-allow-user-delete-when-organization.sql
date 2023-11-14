/*
 * This trigger/trigger function prevents deleting a user if they're the owner
 * of any organizations (first you must delete the organizations or transfer
 * ownership before you can delete your account).
 */
create function publ.tg_users__deletion_organization_checks_and_actions() returns trigger as $$
begin
  -- Check they're not an organization owner
  if exists(
    select 1
    from publ.organization_memberships
    where user_id = publ.current_user_id()
    and is_owner is true
  ) then
    raise exception 'You cannot delete your account until you are not the owner of any organizations.' using errcode = 'OWNER';
  end if;

  -- Reassign billing contact status back to the organization owner
  update publ.organization_memberships
    set is_billing_contact = true
    where is_owner = true
    and organization_id in (
      select organization_id
      from publ.organization_memberships my_memberships
      where my_memberships.user_id = publ.current_user_id()
      and is_billing_contact is true
    );

  return old;
end;
$$ language plpgsql;

create trigger _500_deletion_organization_checks_and_actions
  before delete
  on publ.users
  for each row
  when (publ.current_user_id() is not null)
  execute procedure publ.tg_users__deletion_organization_checks_and_actions();
