-- METRO INDIA public directory schema (no admin roles or admin dashboard).
-- Run in Supabase SQL Editor.
create extension if not exists pgcrypto;

create type public.metro_status as enum ('operational','under_construction','approved','proposed');

create table public.states (
 id uuid primary key default gen_random_uuid(),
 name text not null unique,
 code text unique,
 is_union_territory boolean not null default false,
 created_at timestamptz not null default now()
);
create table public.districts (
 id uuid primary key default gen_random_uuid(),
 state_id uuid not null references public.states(id) on delete cascade,
 name text not null,
 created_at timestamptz not null default now(),
 unique(state_id,name)
);
create table public.authorities (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 website_url text,
 verified boolean not null default false,
 created_at timestamptz not null default now()
);
create table public.metro_networks (
 id uuid primary key default gen_random_uuid(),
 authority_id uuid references public.authorities(id),
 name text not null,
 city text not null,
 state_id uuid references public.states(id),
 status public.metro_status not null default 'proposed',
 description text,
 official_url text,
 booking_url text,
 source_url text,
 last_verified_at timestamptz,
 created_at timestamptz not null default now()
);
create table public.metro_lines (
 id uuid primary key default gen_random_uuid(),
 network_id uuid not null references public.metro_networks(id) on delete cascade,
 name text not null,
 line_code text,
 color_hex text,
 status public.metro_status not null default 'proposed'
);
create table public.stations (
 id uuid primary key default gen_random_uuid(),
 network_id uuid not null references public.metro_networks(id) on delete cascade,
 district_id uuid references public.districts(id),
 name text not null,
 latitude double precision,
 longitude double precision,
 status public.metro_status not null default 'proposed',
 opened_on date,
 source_url text,
 last_verified_at timestamptz,
 check (latitude is null or latitude between -90 and 90),
 check (longitude is null or longitude between -180 and 180)
);
create table public.line_stations (
 line_id uuid not null references public.metro_lines(id) on delete cascade,
 station_id uuid not null references public.stations(id) on delete cascade,
 stop_order integer not null check(stop_order > 0),
 primary key(line_id,station_id),
 unique(line_id,stop_order)
);
create table public.metro_projects (
 id uuid primary key default gen_random_uuid(),
 network_id uuid references public.metro_networks(id),
 title text not null,
 district_id uuid references public.districts(id),
 status public.metro_status not null,
 planned_length_km numeric(9,2),
 completed_length_km numeric(9,2),
 expected_opening date,
 source_url text not null,
 last_verified_at timestamptz,
 notes text,
 check (planned_length_km is null or planned_length_km >= 0),
 check (completed_length_km is null or completed_length_km >= 0)
);
create table public.project_milestones (
 id uuid primary key default gen_random_uuid(),
 project_id uuid not null references public.metro_projects(id) on delete cascade,
 title text not null,
 milestone_date date,
 status text not null default 'planned',
 source_url text
);
create table public.fare_rules (
 id uuid primary key default gen_random_uuid(),
 network_id uuid not null references public.metro_networks(id) on delete cascade,
 origin_station_id uuid references public.stations(id),
 destination_station_id uuid references public.stations(id),
 fare_amount numeric(10,2) not null check(fare_amount >= 0),
 currency text not null default 'INR',
 valid_from date,
 valid_until date,
 source_url text not null,
 last_verified_at timestamptz
);
create table public.booking_providers (
 id uuid primary key default gen_random_uuid(),
 network_id uuid not null references public.metro_networks(id) on delete cascade,
 provider_name text not null,
 booking_url text not null,
 integration_type text not null default 'external_link',
 is_active boolean not null default true,
 verified_at timestamptz
);
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text,
 created_at timestamptz not null default now()
);
create table public.bookings (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id),
 network_id uuid not null references public.metro_networks(id),
 provider_id uuid references public.booking_providers(id),
 origin_station_id uuid references public.stations(id),
 destination_station_id uuid references public.stations(id),
 travel_date date,
 status text not null default 'redirected',
 provider_reference text,
 created_at timestamptz not null default now()
);
create table public.data_sources (
 id uuid primary key default gen_random_uuid(),
 entity_type text not null,
 entity_id uuid not null,
 source_name text not null,
 source_url text not null,
 checked_at timestamptz not null default now(),
 notes text
);

-- Enable RLS. Directory information is public-read-only.
do $$
declare t text;
begin
 foreach t in array array['states','districts','authorities','metro_networks','metro_lines','stations','line_stations','metro_projects','project_milestones','fare_rules','booking_providers','profiles','bookings','data_sources']
 loop execute format('alter table public.%I enable row level security',t); end loop;
end $$;

create policy "public read states" on public.states for select using (true);
create policy "public read districts" on public.districts for select using (true);
create policy "public read verified authorities" on public.authorities for select using (verified=true);
create policy "public read networks" on public.metro_networks for select using (true);
create policy "public read lines" on public.metro_lines for select using (true);
create policy "public read stations" on public.stations for select using (true);
create policy "public read line stations" on public.line_stations for select using (true);
create policy "public read projects" on public.metro_projects for select using (true);
create policy "public read milestones" on public.project_milestones for select using (true);
create policy "public read fares" on public.fare_rules for select using (true);
create policy "public read active providers" on public.booking_providers for select using (is_active=true);
create policy "user read own profile" on public.profiles for select to authenticated using (id=auth.uid());
create policy "user update own profile" on public.profiles for update to authenticated using (id=auth.uid()) with check (id=auth.uid());
create policy "user read own bookings" on public.bookings for select to authenticated using (user_id=auth.uid());
create policy "user create own bookings" on public.bookings for insert to authenticated with check (user_id=auth.uid());
create policy "user read data sources" on public.data_sources for select using (true);

-- New accounts are always ordinary users. No role escalation is provided.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path=public
as $$
begin
 insert into public.profiles(id,display_name)
 values(new.id,coalesce(new.raw_user_meta_data->>'display_name',''))
 on conflict(id) do nothing;
 return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

-- No public insert/update/delete policy exists for metro directory data.
-- Populate it only through trusted, reviewed deployment/data-import processes.
