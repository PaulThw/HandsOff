-- Create a table for public profiles linked to auth.users
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  role text check (role in ('user', 'interpreter', 'admin')) default 'user',
  full_name text,
  avatar_url text,
  bio text,
  languages text[],
  specializations text[],
  hourly_rate numeric,
  location text,
  
  updated_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for bookings
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  interpreter_id uuid references profiles(id) on delete cascade not null,
  date date not null,
  start_time time not null,
  duration_minutes integer not null,
  status text check (status in ('pending', 'confirmed', 'cancelled', 'completed')) default 'pending',
  location text,
  notes text,
  
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table bookings enable row level security;

create policy "Users can view their own bookings." on bookings
  for select using (auth.uid() = user_id or auth.uid() = interpreter_id);

create policy "Users can create bookings." on bookings
  for insert with check (auth.uid() = user_id);

create policy "Relevant parties can update bookings." on bookings
  for update using (auth.uid() = user_id or auth.uid() = interpreter_id);
