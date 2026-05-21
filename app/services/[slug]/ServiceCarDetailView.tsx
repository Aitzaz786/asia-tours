"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleGauge,
  Fuel,
  Snowflake,
  Sparkles,
  Users,
} from "lucide-react";
import type { Fleet, Highlight } from "@/Data/cars";
import { getFleetSlug } from "@/Data/cars";

type Props = {
  fleet: Fleet;
  similarFleets: Fleet[];
};

type GalleryItem = {
  src: string;
  alt: string;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

function getHighlightValue(highlights: Highlight[] | undefined, label: string) {
  return highlights?.find((item) => item.label === label)?.value;
}

function formatBoolean(value: string | number | boolean | undefined) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value ?? "-");
}

function buildGallery(fleet: Fleet): GalleryItem[] {
  const slug = getFleetSlug(fleet.name);

  const specificGallery: Record<string, GalleryItem[]> = {
    "toyota-land-cruiser-v8": [
      { src: fleet.image, alt: fleet.imageAlt },
      { src: "/V8/land1.jpg", alt: "Toyota Land Cruiser V8 front view" },
      { src: "/V8/land2.webp", alt: "Toyota Land Cruiser V8 side profile" },
      { src: "/V8/V8-for-Rental-550x500.webp", alt: "Toyota Land Cruiser V8 rental detail" },
    ],
  };

  const fallbackGallery: GalleryItem[] = [
    { src: fleet.image, alt: fleet.imageAlt },
    { src: "/2025_toyota_land_cruiser_exterior_06.jpg", alt: "Luxury SUV exterior detail" },
    { src: "/2023-BMW-i7-exterior-1-scaled.jpg", alt: "Executive car exterior detail" },
    { src: "/exterior-image-164.avif", alt: "Premium vehicle side angle" },
  ];

  return (specificGallery[slug] ?? fallbackGallery).slice(0, 4);
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const aboutPoints = [
  "Professional booking coordination before departure",
  "Clean and presentation-ready vehicle standards",
  "Suitable for business, family, and event travel",
  "Luxury-focused experience from inquiry to arrival",
];

export default function ServiceCarDetailView({ fleet, similarFleets }: Props) {
  const gallery = useMemo(() => buildGallery(fleet), [fleet]);
  const [selectedImage, setSelectedImage] = useState(gallery[0]?.src ?? fleet.image);
  const [selectedAlt, setSelectedAlt] = useState(gallery[0]?.alt ?? fleet.imageAlt);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [zoomActive, setZoomActive] = useState(false);

  const passengers = getHighlightValue(fleet.highlights, "Passengers");
  const fuel = getHighlightValue(fleet.highlights, "Fuel");
  const ac = getHighlightValue(fleet.highlights, "A/C");
  const mileage = getHighlightValue(fleet.highlights, "Mileage");

  const vehicleDetails = [
    {
      label: "Passengers",
      value: String(passengers ?? "-"),
      description: "Comfortable seating for executive rides, family travel, and event movement.",
      icon: Users,
    },
    {
      label: "Fuel",
      value: String(fuel ?? "-"),
      description: "Reliable fuel setup prepared for city routes and premium intercity plans.",
      icon: Fuel,
    },
    {
      label: "Mileage",
      value: String(mileage ?? "-"),
      description: "Efficient enough for smooth day bookings while keeping the premium feel intact.",
      icon: CircleGauge,
    },
    {
      label: "A/C",
      value: formatBoolean(ac),
      description: "Climate-controlled comfort for warm weather and full-day journeys.",
      icon: Snowflake,
    },
  ];

  const description =
    "A polished premium vehicle option for executive movement, airport transfers, special occasions, and comfortable private travel.";

  const monthlyPrice = Math.round(fleet.price * 26);
  const outstationPrice = Math.round(fleet.price * 1.18);

  return (
    <main className="overflow-hidden  text-[#101010]">
      <section className="relative px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] "
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-[34px] border border-[#eee4da] bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-7 lg:p-8"
          >
            <div className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-[#efe5db] bg-[#fffaf7] px-4 py-2 text-sm text-[#6a625a]">
              <Link href="/" className="transition-colors hover:text-[#ff4500]">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/services" className="transition-colors hover:text-[#ff4500]">
                Services
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-[#111111]">{fleet.name}</span>
            </div>

            <div className="grid gap-8 xl:grid-cols-[500px_minmax(0,1fr)] xl:items-start xl:justify-between">
              <div className="w-full xl:w-[500px]">
                <div
                  className="group relative h-[360px] overflow-hidden rounded-[28px] border border-[#ece3d8] bg-[#f7f1ea] shadow-[0_18px_45px_rgba(15,23,42,0.07)] sm:h-[500px] xl:w-[500px]"
                  onMouseMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const x = ((event.clientX - rect.left) / rect.width) * 100;
                    const y = ((event.clientY - rect.top) / rect.height) * 100;
                    setZoomPosition({ x, y });
                  }}
                  onMouseEnter={() => setZoomActive(true)}
                  onMouseLeave={() => setZoomActive(false)}
                >
                  <Image
                    src={selectedImage}
                    alt={selectedAlt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,17,0.06),rgba(5,10,17,0.28))]" />
                  <div
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${zoomActive ? "opacity-100" : "opacity-0"}`}
                    style={{
                      backgroundImage: `url("${selectedImage}")`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: "180%",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
              
                </div>

                <div className="mt-4 grid grid-cols-4 gap-3">
                  {gallery.map((item) => {
                    const active = item.src === selectedImage;

                    return (
                      <button
                        key={item.src}
                        type="button"
                        onClick={() => {
                          setSelectedImage(item.src);
                          setSelectedAlt(item.alt);
                        }}
                        className={`relative h-20 overflow-hidden rounded-[20px] border transition-all duration-300 sm:h-24 ${
                          active
                            ? "border-[#ff4500] shadow-[0_14px_28px_rgba(255,69,0,0.18)]"
                            : "border-[#ece3d8] hover:-translate-y-0.5 hover:border-[#ffcfbf]"
                        }`}
                      >
                        <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="120px" />
                        <div className={`absolute inset-0 ${active ? "bg-[#ff4500]/12" : "bg-black/10"}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex min-w-0 flex-col">
                <div className=" text-black  ">
                
                  <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-[3.3rem]">
                    {fleet.name}
                  </h1>
              

             <div className="mt-2 overflow-x-auto rounded-lg border border-black/10 bg-black/[0.05] p-5">
  <table className="min-w-full divide-y divide-black/10 text-left">
    <tbody className="divide-y divide-black/10">
      {/* Daily Price Row */}
      <tr className="bg-white">
        <td className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-black/45">
          Daily Price
        </td>
        <td className="px-4 py-3 text-2xl font-semibold text-black">
          PKR {formatPrice(fleet.price)}
        </td>
      </tr>

      {/* Horizontal line */}
      <tr>
        <td colSpan={2}>
          <hr className="border-black/10 my-2" />
        </td>
      </tr>

      {/* Vehicle Details Rows */}
      {vehicleDetails.map((item) => (
        <tr key={item.label} className="bg-white hover:bg-gray-50 transition-colors">
          <td className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#b98d73]">
            {item.label}
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#fff1eb] text-[#ff4500]">
                <item.icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#101010]">{item.value}</h3>
                <p className="text-sm text-[#6e675f]">{item.description}</p>
              </div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/contact-us"
                      className="inline-flex items-center justify-center rounded-full bg-[#ff4500] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(255,69,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e03d00]"
                    >
                      Book This Vehicle
                    </Link>
                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center rounded-full border border-black/14 bg-black/[0.05] px-7 py-3.5 text-sm font-semibold text-black transition-colors duration-300 hover:bg-black/[0.10]"
                    >
                      Back to Services
                    </Link>
                  </div>


              
                </div>

            
              </div>
                 
            </div>
      <div className="mt-6 overflow-x-auto rounded-lg border border-black/10 bg-black/[0.05] p-5">
  <table className="min-w-full text-left">
    <tbody>
      {/* Pricing Rows */}
      <tr className="border-b border-black/10">
        <td className="px-4 py-3 text-xs uppercase tracking-[0.18em] text-black/45">Daily</td>
        <td className="px-4 py-3 text-lg font-semibold">PKR {formatPrice(fleet.price)}</td>
      </tr>

      <tr className="border-b border-black/10">
        <td className="px-4 py-3 text-xs uppercase tracking-[0.18em] text-black/45">Outstation</td>
        <td className="px-4 py-3 text-lg font-semibold">PKR {formatPrice(outstationPrice)}</td>
      </tr>

      <tr className="border-b border-black/10">
        <td className="px-4 py-3 text-xs uppercase tracking-[0.18em] text-black/45">Monthly</td>
        <td className="px-4 py-3 text-lg font-semibold">PKR {formatPrice(monthlyPrice)}</td>
      </tr>

      {/* Vehicle Details Rows */}
      {vehicleDetails.map((item) => (
        <tr key={item.label} className="border-b border-black/10">
          <td className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#b98d73]">
            {item.label}
          </td>
          <td className="px-4 py-3 text-sm text-[#101010]">
            {item.value} {item.description && `- ${item.description}`}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  <div className="mt-8  bg-white p-5 sm:p-7 lg:p-8">
    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b98d73]">
    About Car
  </p>
  <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#111111] sm:text-4xl">
    Elegant details with a cleaner premium presentation
  </h2>
  <p className="mt-5 max-w-3xl text-sm leading-8 text-[#6e675f] sm:text-base">
    {fleet.name} is designed for travelers who want a vehicle that feels reliable, refined, and comfortable from the moment it arrives. It works beautifully for executive pickups, airport movement, family plans, and special occasions where presentation matters.
  </p>

  <div className="mt-8 space-y-4">
    {aboutPoints.map((point, index) => (
      <div key={index} className="flex items-start gap-3">
        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff4500]/20 text-[#ff4500] font-bold">
          ✓
        </span>
        <p className="text-sm leading-7 text-[#544f49]">{point}</p>
      </div>
    ))}
  </div>
    </div>
          </motion.div>
         


        </div>
        
      </section>




  <section className="max-w-[1800px] mx-auto  flex flex-col items-center rounded-[40px] bg-[#0b0b0b] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
    
    {/* Section Intro */}
    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff4500] mb-2">
      Similar Cars
    </p>
    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-white">
      Explore More Premium Options
    </h2>
    <p className="text-center text-gray-300 max-w-2xl mb-8">
      Discover our hand-picked selection of vehicles that match your style and comfort. Book your next ride today and enjoy a premium experience.
    </p>

    {/* Vehicles Grid */}
  <div className="w-full mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {similarFleets.map((item) => (
    <motion.article
      key={item.name}
      whileHover={{ scale: 1.03 }}
      className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
    >
      {/* Image */}
      <div className="relative w-full h-56 overflow-hidden rounded-t-2xl">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col items-center text-center">
        <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
        <p className="mt-2 text-lg font-bold text-orange-500">
          PKR {formatPrice(item.price)} / day
        </p>
        <Link
          href={`/services/${getFleetSlug(item.name)}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors duration-300"
        >
          View Details <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  ))}
</div>

    {/* CTA Button at bottom */}
    <Link
      href="/services"
      className="mt-10 inline-block bg-[#f74900] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
    >
      View All Services
    </Link>
  </section>



 <section className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-[28px] bg-white px-4 py-14 sm:min-h-[360px] sm:rounded-[36px] sm:px-6 lg:min-h-[400px] lg:px-10">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">
        <span className="text-[7rem] font-bold tracking-tighter text-slate-900 select-none sm:text-[10rem] lg:text-[20rem]">
          ASIA
        </span>
      </div>

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#ff4500]"
        >
          <span className="text-2xl font-bold">{"\u2726"}</span>
        </motion.div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Ready to reserve <span className="text-[#ff4500]">{fleet.name}?</span>
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
      Share your route and timing with us. We&apos;ll help you confirm availability and prepare a smooth premium booking experience.
        </p>

      <div className="flex justify-center items-center gap-5">
          <div className="group relative mt-8 sm:mt-10">
          <Link
            href="/contact-us"
            className="relative z-10 block rounded-full bg-[#ff4500] px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] text-white transition-transform duration-300 hover:scale-105 active:scale-95 sm:px-10"
          >
            Contact Us
          </Link>

          <div className="absolute left-1/2 top-full mt-4 hidden h-[1px] w-0 -translate-x-1/2 bg-[#ff4500] transition-all duration-500 group-hover:w-32 sm:block" />
        </div>
   <div className="group relative mt-8 sm:mt-10">
     <Link
        href="/services"

        
        className="inline-flex items-center justify-center rounded-full border border-[#efddcf] bg-white px-8 py-4 text-base font-semibold text-[#111111] hover:bg-[#fff7f2] transition-colors duration-300"
      >
        View All Cars
      </Link>

          <div className="absolute left-1/2 top-full mt-4 hidden h-[1px] w-0 -translate-x-1/2 bg-[#ff4500] transition-all duration-500 group-hover:w-32 sm:block" />
        </div>
      </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:mt-12 sm:gap-8">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-200" />
            24/7 Support
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-200" />
            Secure Booking
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-4 hidden h-20 w-[1px] bg-gradient-to-t from-orange-100 to-transparent sm:left-10 sm:block" />
      <div className="absolute right-4 top-0 hidden h-20 w-[1px] bg-gradient-to-b from-orange-100 to-transparent sm:right-10 sm:block" />
    </section>
    </main>
  );
}
