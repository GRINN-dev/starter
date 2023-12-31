/*
 * This table details who is a member of an organization. When someone is
 * invited to an organization they won't have an entry in this table until
 * their invitation is accepted (for invitations, see
 * `organization_invitations`).
 */

create table publ.organization_memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references publ.organizations on delete cascade,
  user_id uuid not null references publ.users on delete cascade,
  is_owner boolean not null default false,
  is_billing_contact boolean not null default false,
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);
alter table publ.organization_memberships enable row level security;

create index on publ.organization_memberships (user_id);

grant select on publ.organization_memberships to :DATABASE_VISITOR;

-- We can't define RLS policies on organization_memberships yet because we need
-- to know if you're invited; so RLS policies will come later.
