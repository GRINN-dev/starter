/*
 * Organizations have a name, and a unique identifier we call the "slug" (it's
 * like a user's username). Both of these are updatable.
 */
create table publ.organizations (
  id uuid primary key default gen_random_uuid(),
  slug citext not null unique,
  name text not null,
  created_at timestamptz not null default now()
);
alter table publ.organizations enable row level security;

grant select on publ.organizations to :DATABASE_VISITOR;
grant update(name, slug) on publ.organizations to :DATABASE_VISITOR;

-- Note we can't define the RLS policies for an organization until we've defined membership of the organization, so RLS policies will come a little later.
