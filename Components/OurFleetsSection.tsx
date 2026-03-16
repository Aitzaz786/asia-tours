"use client";

import Image from "next/image";
import { useRef } from "react";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { LuDoorOpen, LuUsers } from "react-icons/lu";
import { PiAsteriskSimpleFill } from "react-icons/pi";
import { motion } from "framer-motion";

type Fleet = {
  name: string;
  category: string;
  doors: number;
  passengers: number;
  price: number;
  image: string;
  imageAlt: string;
};

const fleets: Fleet[] = [
  {
    name: "Harrier Wagon",
    category: "Coupe Car",
    doors: 4,
    passengers: 2,
    price: 169,
    image: "/fleets/harrier-wagon.svg",
    imageAlt: "Gray silver coupe car",
  },
  {
    name: "Eclipse Sedan",
    category: "Coupe Car",
    doors: 4,
    passengers: 2,
    price: 139,
    image: "/fleets/eclipse-sedan.svg",
    imageAlt: "Blue coupe sedan",
  },
  {
    name: "Breeze Compact",
    category: "Convertible Car",
    doors: 4,
    passengers: 2,
    price: 139,
    image: "/fleets/breeze-compact.svg",
    imageAlt: "Purple compact convertible",
  },
  {
    name: "Voyager GT",
    category: "Luxury Car",
    doors: 4,
    passengers: 1,
    price: 259,
    image: "/fleets/voyager-gt.svg",
    imageAlt: "Green luxury grand touring car",
  },
  {
    name: "Viper SXT",
    category: "Coupe Car",
    doors: 4,
    passengers: 2,
    price: 329,
    image: "/fleets/viper-sxt.svg",
    imageAlt: "Dark gray black sports coupe",
  },
];

export default function OurFleetsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const cardsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardItem = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeCurve },
    },
    rest: { y: 0 },
    hover: { y: -6, transition: { duration: 0.3 } },
  };

  const handleScroll = (direction: "left" | "right") => {
    const container = scrollRef.current;

    if (!container) {
      return;
    }

    const cardWidth = 292;
    const gapWidth = 24;

    container.scrollBy({
      left: direction === "left" ? -(cardWidth + gapWidth) : cardWidth + gapWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <span className="absolute left-4 top-16 h-3 w-3 rounded-full bg-[#ff4500] sm:left-8 lg:left-14" aria-hidden="true" />

      <div className="mx-auto max-w-350">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easeCurve }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold tracking-[0.18em] text-[#ff4500] uppercase">
            <PiAsteriskSimpleFill className="text-xs" aria-hidden="true" />
            <span>Our Fleets</span>
          </p>

          <h2 className="about-serif-font mx-auto mt-4 max-w-xl text-4xl font-bold leading-[1.06] text-black sm:text-[2.85rem] lg:text-[3.35rem]">
            Explore our perfect and extensive fleet
          </h2>
        </motion.div>

        <motion.div
          variants={cardsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          ref={scrollRef}
          className="scrollbar-hide mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 pr-6 pl-1 sm:gap-6 lg:pr-24"
        >
          {fleets.map((fleet) => (
            <motion.article
              key={fleet.name}
              variants={cardItem}
              whileHover="hover"
              initial="rest"
              animate="rest"
              whileTap={{ scale: 0.99 }}
              className="w-[84vw] min-w-65 max-w-70 shrink-0 snap-start rounded-3xl border border-gray-200 bg-white p-4 sm:w-67.5 sm:p-5"
            >
              <motion.div
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.05, transition: { duration: 0.4 } },
                }}
                className="flex h-45.5 items-center justify-center rounded-[20px] bg-gray-50 px-4"
              >
                <Image
                  src={fleet.image}
                  alt={fleet.imageAlt}
                  width={238}
                  height={116}
                  className="h-auto w-full max-w-59.5 object-contain"
                />
              </motion.div>

              <div className="mt-5 inline-flex rounded-full bg-gray-950 px-3 py-1 text-xs font-medium text-white">
                {fleet.category}
              </div>

              <h3 className="mt-4 text-[1.15rem] font-bold text-black">{fleet.name}</h3>

              <div className="mt-5 space-y-3 border-b border-gray-200 pb-5">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="inline-flex items-center gap-2.5">
                    <LuDoorOpen className="text-base text-gray-500" aria-hidden="true" />
                    <span>Doors</span>
                  </span>
                  <span>{fleet.doors}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="inline-flex items-center gap-2.5">
                    <LuUsers className="text-base text-gray-500" aria-hidden="true" />
                    <span>Passengers</span>
                  </span>
                  <span>{fleet.passengers}</span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4">
                <p className="flex items-end gap-1.5 leading-none text-black">
                  <span className="text-[1.7rem] font-bold">${fleet.price}</span>
                  <span className="pb-1 text-sm text-gray-500">/Per Day</span>
                </p>

                <motion.button
                  type="button"
                  aria-label={`View ${fleet.name}`}
                  whileHover={{ scale: 1.15, rotate: 45 }}
                  whileTap={{ scale: 0.9 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#ff4500] text-white transition-colors hover:bg-[#e53d00]"
                >
                  <FiArrowUpRight className="text-base" aria-hidden="true" />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <motion.button
            type="button"
            aria-label="Scroll fleets left"
            onClick={() => handleScroll("left")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#ff4500] text-white transition-colors hover:bg-[#e53d00]"
          >
            <FiArrowLeft className="text-lg" aria-hidden="true" />
          </motion.button>

          <motion.button
            type="button"
            aria-label="Scroll fleets right"
            onClick={() => handleScroll("right")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#ff4500] text-white transition-colors hover:bg-[#e53d00]"
          >
            <FiArrowRight className="text-lg" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}