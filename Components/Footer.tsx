"use client";

import Link from "next/link";
import {
  FaYoutube,
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import { PiSparkleFill } from "react-icons/pi";
import { motion } from "framer-motion";

const legalLinks = ["Term & Condition", "Privacy Policy", "Legal Notice", "Accessibility"];
const quickLinks = ["Home", "About Us", "Car Type", "Service"];

const socialLinks = [
  { name: "YouTube", href: "#", Icon: FaYoutube },
  { name: "Facebook", href: "#", Icon: FaFacebookF },
  { name: "X", href: "#", Icon: FaXTwitter },
  { name: "Instagram", href: "#", Icon: FaInstagram },
  { name: "LinkedIn", href: "#", Icon: FaLinkedinIn },
];

const sparklePositions = [
  "left-[8%] top-[18%]",
  "left-[36%] top-[10%]",
  "left-[74%] top-[16%]",
  "left-[18%] top-[54%]",
  "left-[56%] top-[64%]",
  "left-[88%] top-[46%]",
];

const Footer = () => {
  const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  return (
   <div className="p-10">
     <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: easeCurve }}
      className="relative overflow-hidden rounded-4xl  bg-[#0a0a0a] text-white"
     >
      <div className="pointer-events-none absolute inset-0">
        {sparklePositions.map((position) => (
          <PiSparkleFill
            key={position}
            className={`absolute ${position} text-[18px] text-[#1f1f1f] sm:text-[22px]`}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12 lg:py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeCurve } } }}>
            <h2 className="text-4xl font-extrabold tracking-wide sm:text-5xl">
            <img
  src="/black.jpeg"
  alt="Logo"
            className="w-39"
 
/>
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-7 text-[#8b8b8b] sm:text-base">
              Experience the ease and convenience of renting a car with Novaride.
            </p>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeCurve } } }}>
            <h3 className="text-xl font-bold text-white">Legal Policy</h3>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-[#8b8b8b] transition-colors duration-200 hover:text-[#ff4500] sm:text-base"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeCurve } } }}>
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-[#8b8b8b] transition-colors duration-200 hover:text-[#ff4500] sm:text-base"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeCurve } } }}>
            <h3 className="max-w-[18ch] text-xl font-bold text-white">Subscribe To The Newsletters</h3>
            <form className="mt-5">
              <label htmlFor="newsletter-email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Email..."
                  className="h-13 w-full rounded-full border border-[#2b2b2b] bg-[#1b1b1b] pl-5 pr-16 text-sm text-white outline-none transition-colors placeholder:text-[#707070] focus:border-[#ff4500]"
                />
                <motion.button
                  type="button"
                  aria-label="Submit email"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-1.5 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#ff4500] text-white transition-transform duration-200 hover:scale-105"
                >
                  <FiArrowUpRight className="text-lg" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>

        <div className="mt-10 border-t border-[#242424] pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#7d7d7d]">© 2026 Novaride. All rights reserved.</p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              className="flex items-center gap-2.5"
            >
              {socialLinks.map(({ name, href, Icon }) => (
                <motion.a
                  key={name}
                  href={href}
                  aria-label={name}
                  variants={{ hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: easeCurve } } }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] text-white transition-colors duration-200 hover:bg-[#ff4500]"
                >
                  <Icon className="text-sm" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.footer>
   </div>
  );
};

export default Footer;