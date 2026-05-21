-- pages_seo table
create table if not exists pages_seo (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  page_title text not null default '',
  meta_title text not null default '',
  meta_description text not null default '',
  og_title text not null default '',
  og_description text not null default '',
  og_image text not null default '',
  canonical_url text not null default '',
  no_index boolean not null default false,
  updated_at timestamptz not null default now()
);

-- Enable RLS (admin API uses service role, bypasses RLS)
alter table pages_seo enable row level security;

-- Default page rows
insert into pages_seo (slug, page_title, meta_title, meta_description) values
  ('home', 'Home', 'Asia Tours Pakistan – Premium Car Rental & Chauffeur Services', 'Book premium car rentals and professional chauffeur services across Pakistan. Airport transfers, corporate tours, luxury vehicles and more.'),
  ('about-us', 'About Us', 'About Asia Tours Pakistan – Trusted Car Rental Company', 'Learn about Asia Tours Pakistan – a trusted name in premium car rental and chauffeur services operating across Pakistan for over 15 years.'),
  ('contact-us', 'Contact Us', 'Contact Asia Tours Pakistan – Book a Car Today', 'Get in touch with Asia Tours Pakistan to book a car rental, airport transfer, or chauffeur service. Available 24/7 across Pakistan.'),
  ('services', 'Services', 'Our Services – Asia Tours Pakistan Car Rental', 'Explore our full range of services: airport transfers, corporate tours, luxury vehicles, custom itineraries, weddings and chauffeur services.'),
  ('areas', 'Service Areas', 'Service Areas – Asia Tours Pakistan', 'Asia Tours Pakistan provides premium car rental and chauffeur services in 45+ cities across Pakistan including Lahore, Islamabad, Karachi and more.'),
  ('services/airport-transfer', 'Airport Transfer', 'Airport Transfer Service Pakistan – Asia Tours', 'Professional airport transfer services across Pakistan. Meet & greet, flight tracking, on-time guarantee. Book your airport car now.'),
  ('services/corporate-tours', 'Corporate Tours', 'Corporate Car Service Pakistan – Asia Tours', 'Premium corporate transportation for business meetings, roadshows and executive travel across Pakistan. Professional drivers, luxury fleet.'),
  ('services/luxury-vehicles', 'Luxury Vehicles', 'Luxury Car Rental Pakistan – Asia Tours', 'Rent a luxury vehicle in Pakistan. Range Rovers, BMWs, Mercedes and more. Perfect for weddings, events and premium executive travel.'),
  ('services/custom-itineraries', 'Custom Itineraries', 'Custom Tour Itineraries Pakistan – Asia Tours', 'Create your perfect Pakistan travel itinerary. We handle all ground transport so you can focus on the experience.'),
  ('services/events-wedding', 'Events & Weddings', 'Wedding Car Service Pakistan – Asia Tours', 'Make your wedding day unforgettable with our premium wedding car and event transportation services across Pakistan.'),
  ('services/chauffeur-service', 'Chauffeur Service', 'Professional Chauffeur Service Pakistan – Asia Tours', 'Hire a professional chauffeur in Pakistan. Background-checked, suited drivers for executive, VIP and personal transport.'),
  ('areas/lahore', 'Lahore', 'Car Rental Lahore – Asia Tours Pakistan', 'Premium car rental and chauffeur services in Lahore. Airport transfers, corporate rides and city tours available 24/7.'),
  ('areas/islamabad', 'Islamabad', 'Car Rental Islamabad – Asia Tours Pakistan', 'Book a car in Islamabad. Premium fleet, professional drivers, airport transfers and executive transport across the capital.'),
  ('areas/rawalpindi', 'Rawalpindi', 'Car Rental Rawalpindi – Asia Tours Pakistan', 'Reliable car rental and chauffeur services in Rawalpindi. Available 24/7 for airport, corporate and city travel.'),
  ('areas/faisalabad', 'Faisalabad', 'Car Rental Faisalabad – Asia Tours Pakistan', 'Premium car rental in Faisalabad. Professional drivers, luxury fleet for business and leisure travel.'),
  ('areas/multan', 'Multan', 'Car Rental Multan – Asia Tours Pakistan', 'Book a car in Multan with Asia Tours. Professional chauffeur services for airport transfers and city travel.'),
  ('areas/karachi', 'Karachi', 'Car Rental Karachi – Asia Tours Pakistan', 'Premium car rental and chauffeur services in Karachi. Corporate, airport and event transport available.'),
  ('areas/peshawar', 'Peshawar', 'Car Rental Peshawar – Asia Tours Pakistan', 'Reliable car rental in Peshawar. Professional drivers and premium fleet for all travel needs.'),
  ('areas/murree', 'Murree', 'Car Rental Murree – Asia Tours Pakistan', 'Hire a car in Murree for a memorable hill station experience. Expert drivers, safe and comfortable vehicles.'),
  ('areas/sialkot', 'Sialkot', 'Car Rental Sialkot – Asia Tours Pakistan', 'Premium car rental in Sialkot. Airport transfers and corporate rides with professional chauffeurs.'),
  ('areas/gujranwala', 'Gujranwala', 'Car Rental Gujranwala – Asia Tours Pakistan', 'Book a car in Gujranwala. Reliable transportation for business and leisure with Asia Tours Pakistan.'),
  ('areas/bahawalpur', 'Bahawalpur', 'Car Rental Bahawalpur – Asia Tours Pakistan', 'Premium car rental in Bahawalpur. Professional chauffeur services available 24/7.'),
  ('areas/quetta', 'Quetta', 'Car Rental Quetta – Asia Tours Pakistan', 'Hire a car in Quetta with Asia Tours. Safe and comfortable travel for all occasions.'),
  ('areas/abbottabad', 'Abbottabad', 'Car Rental Abbottabad – Asia Tours Pakistan', 'Book a car in Abbottabad. Perfect for visiting hill stations and scenic routes in Hazara.'),
  ('areas/nathia-gali', 'Nathia Gali', 'Car Rental Nathia Gali – Asia Tours Pakistan', 'Hire a car for Nathia Gali. Experienced drivers for scenic hill station routes from Islamabad and Rawalpindi.'),
  ('areas/ayubia', 'Ayubia', 'Car Rental Ayubia – Asia Tours Pakistan', 'Book a car to Ayubia National Park. Safe and comfortable transport for families and groups.')
on conflict (slug) do nothing;
