"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const sideArticles = [
  {
    title: "Exploring Your Rental Car Options: Sedan, Suv, Or Convertible?",
    image: "/articles/side-1.svg",
    imageAlt: "Modern villa at dusk with silver sports car",
    showDot: true,
  },
  {
    title: "The Pros And Cons Of Renting A Car Vs. Using Rideshare Services",
    image: "/articles/side-2.svg",
    imageAlt: "Dark modern house with parked car",
    showDot: false,
  },
  {
    title: "Why You Should Consider Renting A Luxury Car For Your Next Trip",
    image: "/articles/side-3.svg",
    imageAlt: "Red supercar with autumn trees",
    showDot: false,
  },
];

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.2" y="4.8" width="13.6" height="12" rx="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.4 3.2v3.2M13.6 3.2v3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3.2 8.2h13.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 11.2h1.6M11.4 11.2H13M7 14h1.6M11.4 14H13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" aria-hidden="true">
      <path d="M6 14 14 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M4.8 10h10.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11.3 6.2 15.2 10l-3.9 3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SideArticleCard({ title, image, imageAlt, showDot }: { title: string; image: string; imageAlt: string; showDot: boolean }) {
  return (
    <motion.article whileHover={{ x: 6, transition: { duration: 0.2 } }} className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
      <div className="relative h-44 w-full overflow-hidden rounded-2xl sm:h-36 sm:w-50 sm:shrink-0">
        <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 200px" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="inline-flex items-center gap-2 text-sm text-gray-500">
          <CalendarIcon className="h-4 w-4" />
          <span>August 5, 2024</span>
          {showDot ? <span className="ml-1 inline-block h-2 w-2 rounded-full bg-[#ff4500]" aria-hidden="true" /> : null}
        </p>

        <h3 className="mt-3 text-base font-semibold leading-7 text-black sm:text-lg">
          {title}
        </h3>

        <motion.div whileHover={{ x: 4 }} className="mt-4 inline-flex">
          <Link href="/about-us" className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff4500] transition-opacity hover:opacity-80">
          <span className="hover:underline">Read Story</span>
          <motion.span whileHover={{ scale: 1.2, rotate: 45 }} whileTap={{ scale: 0.9 }} className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#ff4500] text-white">
            <ArrowRight />
          </motion.span>
        </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function LatestArticlesSection() {
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  return (
    <section className="bg-white px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easeCurve }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="inline-flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#ff4500]">
            <span className="text-xs">✳</span>
            <span>Latest Articles</span>
          </p>

          <h2 className="about-serif-font mx-auto mt-4 max-w-2xl text-4xl font-bold leading-[1.06] text-black sm:text-[2.8rem] lg:text-[3.35rem]">
            Stay informed and inspired for your next journey
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.35fr_1fr]">
          <motion.article
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeCurve }}
            whileHover={{ scale: 1.02 }}
            className="relative min-h-87.5 overflow-hidden rounded-2xl sm:min-h-105 lg:min-h-140"
          >
            <Image
              src="/articles/featured.svg"
              alt="SUV parked by mountain road at sunset"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 780px"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" aria-hidden="true" />

            <div className="absolute bottom-0 left-0 z-10 p-6 sm:p-8">
              <p className="inline-flex items-center gap-2 text-sm text-white">
                <CalendarIcon className="h-4 w-4" />
                <span>August 5, 2024</span>
              </p>

              <h3 className="mt-3 max-w-lg text-xl font-bold leading-8 text-white sm:text-2xl sm:leading-9">
                Top Tips For Booking Your Car Rental: What You Need To Know
              </h3>

              <motion.div whileHover={{ scale: 1.15, rotate: 45 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="/services"
                aria-label="Read featured story"
                className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#ff4500] text-white transition-colors hover:bg-[#e53d00]"
              >
                <ArrowUpRight />
              </Link>
              </motion.div>
            </div>
          </motion.article>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="flex flex-col gap-6 lg:justify-between"
          >
            {sideArticles.map((article) => (
              <motion.div
                key={article.title}
                variants={{
                  hidden: { opacity: 0, x: 40 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeCurve } },
                }}
              >
                <SideArticleCard
                  title={article.title}
                  image={article.image}
                  imageAlt={article.imageAlt}
                  showDot={article.showDot}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}