create extension if not exists "uuid-ossp";

create table if not exists appointments (
  id uuid primary key default uuid_generate_v4(),
  guest_name text not null,
  proposed_dates jsonb not null,
  activities text[] not null,
  created_at timestamp default now()
);

alter table appointments enable row level security;

drop policy if exists "anon can insert" on appointments;
create policy "anon can insert" on appointments
  for insert to anon
  with check (true);
