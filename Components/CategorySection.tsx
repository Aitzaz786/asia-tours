"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

type CategoryCard = {
  title: string;
  image: string;
  alt: string;
};

const categories: CategoryCard[] = [
  {
    title: "Sport Car",
    image: "/black.jpeg",
    alt: "Black sports car parked in a scenic location",
  },
  {
    title: "Convertible Car",
    image: "/JDP_2022 Mercedes-AMG G 63 Matte Gray Front Quarter View.webp",
    alt: "Convertible-style premium car in an urban setting",
  },
  {
    title: "Sedan Car",
    image: "/2023-BMW-i7-exterior-1-scaled.jpg",
    alt: "Luxury sedan driving through a mountain road",
  },
  {
    title: "Luxury car",
    image: "/range-rover-vogue-01.webp",
    alt: "Luxury vehicle photographed in warm evening light",
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
              className="group relative min-h-[340px] overflow-hidden rounded-[28px] sm:min-h-[430px] lg:min-h-[520px] xl:min-h-[560px]"
            >
              <Image
                src={category.image}
                alt={category.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.08)_0%,rgba(10,10,10,0.18)_35%,rgba(10,10,10,0.62)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_28%)]" />

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
