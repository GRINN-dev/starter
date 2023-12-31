/*
 * Shortcut telling the client if the current user is the organization owner
 * without having to manually traverse into organization_memberships.
 */
create function publ.organizations_current_user_is_owner(
  org publ.organizations
) returns boolean as $$
  select exists(
    select 1
    from publ.organization_memberships
    where organization_id = org.id
    and user_id = publ.current_user_id()
    and is_owner is true
  )
$$ language sql stable;

/*
 * Shortcut telling the client if the current user is the organization billing
 * contact without having to manually traverse into organization_memberships.
 */
create function publ.organizations_current_user_is_billing_contact(
  org publ.organizations
) returns boolean as $$
  select exists(
    select 1
    from publ.organization_memberships
    where organization_id = org.id
    and user_id = publ.current_user_id()
    and is_billing_contact is true
  )
$$ language sql stable;
