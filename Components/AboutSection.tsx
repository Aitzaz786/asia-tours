"use client";

import { FiArrowUpRight, FiClipboard, FiMapPin } from "react-icons/fi";
import { PiSparkleFill } from "react-icons/pi";
import { motion } from "framer-motion";

const features = [
  {
    Icon: FiClipboard,
    title: "Easy Booking Process",
    desc: "We Have Optimized The Booking Process So That Our Clients Can Experience The Easiest And The Safest Service",
  },
  {
    Icon: FiMapPin,
    title: "Convenient Pick-Up & Return Process",
    desc: "We Have Optimized The Booking Process So That Our Clients Can Experience The Easiest And The Safest Service",
  },
];

export default function AboutSection() {
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const featureContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const featureItem = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: easeCurve },
    },
  };

  return (
    <section className="bg-white px-4 pt-16 pb-36 sm:px-8">
      <div className="mx-auto grid max-w-[1600px]  grid-cols-1 items-center gap-16 lg:grid-cols-2">

        {/* ── Left column : staggered pill images ── */}
        <div className="relative mx-auto h-full w-full max-w-[1500px] lg:mx-0">

          {/* orange dot — top-left */}
          {/* <motion.span
            initial={{ opacity: 0, y: -14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: easeCurve }}
            className="absolute left-49.5 top-1 z-20 h-3 w-3 rounded-full bg-[#ff4500]"
          />

          {/* sparkle — top, beside image 1 */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.5, ease: easeCurve }}
            className="absolute left-49 top-7 z-20"
          >
            <PiSparkleFill className="text-2xl text-gray-800" />
          </motion.div>  */}

          {/* Image 1 — top-left pill */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: easeCurve }}
            className="h- w-full overflow-hidden rounded rounded-[100px] ring-2 ring-gray-200"
          >
            <img
              src="https://di-uploads-pod20.dealerinspire.com/edvoylesautomotivegroup/uploads/2022/10/pexels-antoni-shkraba-7144212.jpg"
              alt="Stylish customer stepping out of luxury car"
              className="h-full w-full object-contain "
            />
          </motion.div>

          {/* Image 2 — bottom-right overlap pill */}
          {/* <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeCurve }}
            className="absolute left-64 top-50.25 z-10 h-[384px] w-64 overflow-hidden rounded-[200px] ring-2 ring-gray-200"
          >
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
              alt="Satisfied customer inside rental car"
              className="h-full w-full object-cover "
            />
          </motion.div> */}

          {/* large decorative asterisk — between images */}
          {/* <motion.span
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 360 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.4, ease: easeCurve }}
            className="absolute right-0 top-16 z-20 text-[68px] font-black leading-none text-[#ff4500]"
          >
            ✳
          </motion.span> */}

          {/* sparkle — bottom-center */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.5, ease: easeCurve }}
            className="absolute bottom-2 left-46.25 z-20"
          >
            <PiSparkleFill className="text-2xl text-gray-800" />
          </motion.div> */}
        </div>

        {/* ── Right column : content ── */}
        <div>
          {/* badge */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: easeCurve }}
            className="mb-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#ff4500]"
          >
            <span className="text-[19px] font-black leading-none">✳</span>
            <span>About Us</span>
          </motion.p>

          {/* heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeCurve }}
            className="about-serif-font text-4xl font-bold leading-tight text-gray-900 sm:text-5xl"
          >
            Your trusted partner in reliable car rental
          </motion.h2>

          {/* description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeCurve }}
            className="mt-4 max-w-lg text-base leading-7 text-gray-500"
          >
            Aqestic Optio Amet A Ququam Saepe Aliquid Voluate Dicta Fuga Dolor
            Saerror Sed Earum A Magni Soluta Quam Minus Dolor Dolor
          </motion.p>

          {/* feature cards */}
          <motion.div
            variants={featureContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-8"
          >
            {features.map(({ Icon, title, desc }, i) => (
              <motion.div key={title} variants={featureItem}>
                <div className="flex items-start gap-4 py-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                    <Icon className="text-xl text-[#ff4500]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-500">{desc}</p>
                  </div>
                </div>
                {i < features.length - 1 && (
                  <hr className="border-gray-100" />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.5, ease: easeCurve }}
            className="mt-8 inline-flex items-center gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-[#ff4500] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e53d00]"
            >
              Learn More
            </motion.button>
            <motion.button
              aria-label="Go to contact"
              whileHover={{ scale: 1.15, rotate: 45 }}
              whileTap={{ scale: 0.9 }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#ff4500] text-white transition-colors hover:bg-[#e53d00]"
            >
              <FiArrowUpRight className="text-lg" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
