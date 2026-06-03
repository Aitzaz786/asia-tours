"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

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
  image: "/suvan.png",
  alt: "SUV 4x4",
  objectPosition: "center center",

},
  {
    title: "Sedan Car",
    image: "/Audi a6/audi-a6_100726069_h.jpg",
    alt: "Sedan Car",
    objectPosition: "center center",
  },
 {
  title: "Luxury car",
  image: "/luxury.png",
  alt: "Luxury car",
  objectPosition: "center 100%", 
  mirror: true, 
    scale: 1.3,
},
    {
    title: "Wedding Cars",
    image: "/weeding.png",
    alt: "Convertible-style premium car in an urban setting",
    objectPosition: "center 60%",
    mirror: true,
  },
];

export default function CategorySection() {
  return (
    <section className="bg-white px-3 pb-14 sm:px-5 sm:pb-16 lg:px-7">
      <div className="mx-auto max-w-[1800px]">

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {categories.map((category, index) => (
            <motion.article
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
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
                    className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#ff4d0a] text-white shadow-[0_18px_40px_rgba(255,77,10,0.3)] transition-all duration-300 group-hover:scale-105 group-hover:rotate-45"
                  >
                    <FiArrowUpRight className="text-2xl" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
