"use client";

import Image from "next/image";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { SECTION_Y } from "@/lib/sectionSpacing";

type CategoryCard = {
  title: string;
  image: string;
  alt: string;
  objectPosition?: string;
  scale?: number;
  mirror?: boolean; // ← yeh add karo
};

const categories: CategoryCard[] = [
{
  title: "SUV / 4x4",
  image: "/suvan.webp",
  alt: "SUV 4x4",
  objectPosition: "center center",

},
  {
    title: "Sedan Car",
    image: "/Audi a6/audi-a6_100726069_h.webp",
    alt: "Sedan Car",
    objectPosition: "center center",
  },
 {
  title: "Luxury car",
  image: "/luxury.webp",
  alt: "Luxury car",
  objectPosition: "center 100%", 
  mirror: true, 
    scale: 1.3,
},
    {
    title: "Wedding Cars",
    image: "/weeding.webp",
    alt: "Convertible-style premium car in an urban setting",
    objectPosition: "center 60%",
    mirror: true,
  },
];

export default function CategorySection() {
  return (
    <section className={`bg-white px-3 sm:px-5 lg:px-7 ${SECTION_Y}`}>
      <div className="mx-auto max-w-[1800px]">

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {categories.map((category) => (
            <article
              key={category.title}
              className="group relative min-h-[340px] overflow-hidden rounded-[28px] sm:min-h-[430px] lg:min-h-[520px] xl:min-h-[410px]"
            >
            <Image
  src={category.image}
  alt={category.alt}
  fill
  className="object-cover transition-transform duration-700 group-hover:scale-105"
style={{ 
  objectPosition: category.objectPosition || "center center",
  transform: `${category.mirror ? "scaleX(-1) " : ""}${category.scale ? `scale(${category.scale})` : ""}`
}}
/>

              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent_0%,rgba(10,10,10,0.58)_100%)]" />

              <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
                <h3 className="max-w-[220px] text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  {category.title}
                </h3>

                <div className="flex justify-end">
                  <button
                    type="button"
                    aria-label={`Open ${category.title}`}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] text-[#0A0A0A] transition-all duration-300 md:group-hover:scale-105 md:group-hover:rotate-45"
                  >
                    <FiArrowRight className="text-2xl md:hidden" />
                    <FiArrowUpRight className="hidden text-2xl md:block" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
