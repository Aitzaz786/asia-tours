create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  category text not null default 'Travel guide',
  author text not null default 'Asia Tours Editorial Team',
  cover_image text not null default '',
  cover_alt text not null default '',
  is_published boolean not null default false,
  published_at timestamptz,
  meta_title text not null default '',
  meta_description text not null default '',
  og_title text not null default '',
  og_description text not null default '',
  og_image text not null default '',
  canonical_url text not null default '',
  no_index boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blogs_published_at_idx
  on public.blogs (is_published, published_at desc);
create index if not exists blogs_slug_idx on public.blogs (slug);

alter table public.blogs enable row level security;

drop policy if exists "public_read_published_blogs" on public.blogs;
create policy "public_read_published_blogs" on public.blogs
  for select to anon, authenticated
  using (is_published = true and published_at is not null and published_at <= now());

drop policy if exists "admin_manage_blogs" on public.blogs;
create policy "admin_manage_blogs" on public.blogs
  for all to authenticated
  using (true)
  with check (true);

insert into public.blogs (
  slug, title, excerpt, content, category, author, cover_image, cover_alt,
  is_published, published_at, meta_title, meta_description,
  og_title, og_description, og_image, canonical_url, no_index
) values (
  'how-to-choose-the-right-car-for-your-journey',
  'How to choose the right car for your journey',
  'A practical guide to matching your passengers, luggage, route and occasion with the right rental vehicle in Pakistan.',
  E'The right vehicle changes the way a journey feels. Before choosing a car, start with the people travelling, the luggage you are carrying and the roads ahead.\n\nFor city meetings and airport transfers, an executive sedan offers a calm cabin, easy access and a polished arrival. Families and groups usually benefit from an SUV or wagon, especially when luggage space matters. For weddings and milestone events, consider the character of the arrival as carefully as the passenger count.\n\nLonger routes need a little more planning. Ask about seating comfort, air conditioning, fuel arrangements, chauffeur charges, tolls and waiting time before confirming your booking. A clear itinerary helps the rental team recommend an option that suits the complete trip.\n\nAt Asia Tours, every recommendation begins with a conversation. Share your date, pickup point, destination and preferences, and our team will help you consider the right fit.',
  'Travel guide',
  'Asia Tours Editorial Team',
  '/gold/assets/hero-neutral-2.webp',
  'Premium chauffeur-driven vehicles prepared for a journey in Pakistan',
  true,
  now(),
  'How to Choose the Right Rental Car in Pakistan | Asia Tours',
  'Choose the right rental car for city travel, airport transfers, weddings and longer journeys across Pakistan with this practical Asia Tours guide.',
  'How to choose the right car for your journey',
  'Match your passengers, luggage, route and occasion with the right chauffeur-driven rental vehicle in Pakistan.',
  '/gold/assets/hero-neutral-2.webp',
  'https://asiatourspk.com/blog/how-to-choose-the-right-car-for-your-journey',
  false
)
on conflict (slug) do nothing;

