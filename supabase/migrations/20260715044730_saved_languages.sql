create table public.saved_languages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  language jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, name)
);

alter table public.saved_languages enable row level security;

create policy "read own saved languages"
  on public.saved_languages for select
  using (auth.uid() = user_id);

create policy "insert own saved languages"
  on public.saved_languages for insert
  with check (auth.uid() = user_id);

create policy "update own saved languages"
  on public.saved_languages for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "delete own saved languages"
  on public.saved_languages for delete
  using (auth.uid() = user_id);
