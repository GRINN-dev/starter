/*
  TABLE: publ.vehicles
  DESCRIPTION: Tous les véhicules renseignées dans notre BDD
*/
drop table if exists publ.vehicles cascade;
create table publ.vehicles (
    id uuid not null default uuid_generate_v4() primary key unique, 
    owner_name text not null,
    type text not null,
    price int not null,
    year int not null,
    fuel_consumption float,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- indexes
  create index on publ.vehicles(created_at);
  create index on publ.vehicles(updated_at);

-- RBAC
  grant select on publ.vehicles to :DATABASE_VISITOR;
  grant update(owner_name,type,price,fuel_consumption,year) on publ.vehicles to :DATABASE_VISITOR;
  grant insert(owner_name,type,price,fuel_consumption,year) on publ.vehicles to :DATABASE_VISITOR;
  grant delete on publ.vehicles to :DATABASE_VISITOR;

-- triggers
  create trigger _100_timestamps
  before insert or update on publ.vehicles
  for each row
  execute procedure priv.tg__timestamps();

-- RLS
  alter table publ.vehicles enable row level security;

 create policy no_limit /*TODO: update policy*/
   on publ.vehicles
   for all
   using (true)
   with check(true);

-- fixtures
  -- fixtures go here
/*
  END TABLE: publ.vehicles
*/