"use client";

import Link from "next/link";
import {
  FaYoutube,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa6";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import { PiSparkleFill } from "react-icons/pi";
import { motion } from "framer-motion";

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Booking & Cancellation", href: "/terms-and-conditions#booking-cancellation" },
  { label: "Contact Support", href: "/contact-us" },
];
const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Areas", href: "/areas" },
];

const contactItems = [
  {
    label: "+92 300 4591145",
    href: "tel:+923004591145",
    Icon: FiPhone,
  },
  {
    label: "contact@asiatourspk.com",
    href: "mailto:contact@asiatourspk.com",
    Icon: FiMail,
  },
  {
    label: "Punjab Society, Ghazi Road, Lahore",
    href: "/contact-us",
    Icon: FiMapPin,
  },
];

const socialLinks = [
  { name: "YouTube", href: "#", Icon: FaYoutube },
  { name: "Facebook", href: "#", Icon: FaFacebookF },
  { name: "Instagram", href: "#", Icon: FaInstagram },
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
    <div className="px-3 pb-3 pt-2 sm:px-5 sm:pb-5 sm:pt-4 lg:p-10">
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: easeCurve }}
        className="relative overflow-hidden rounded-[22px] text-white sm:rounded-3xl lg:rounded-4xl"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(212, 175, 55, 0.10) 0%, rgba(10, 10, 10, 1) 42%), linear-gradient(135deg, #0A0A0A 0%, #14110A 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -right-16 top-0 hidden h-[280px] w-[280px] rounded-full blur-2xl sm:block"
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,0.10), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 hidden sm:block">
          {sparklePositions.map((position) => (
            <PiSparkleFill
              key={position}
              className={`absolute ${position} text-[18px] text-[#1f1f1f] sm:text-[22px]`}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeCurve } },
              }}
              className="col-span-2 sm:col-span-1"
            >
              <img
                src="/black.webp"
                alt="Asia Tours"
                className="h-14 w-auto sm:h-16 lg:h-[4.5rem]"
              />
              <p className="mt-3 max-w-xs text-[13px] leading-6 text-[#8b8b8b] sm:mt-5 sm:text-sm sm:leading-7 lg:text-base">
                Experience the ease and convenience of renting a car with Asia Tours.
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeCurve } },
              }}
            >
              <h3 className="text-base font-bold text-white sm:text-xl">Legal Policy</h3>
              <ul className="mt-3 space-y-2 sm:mt-5 sm:space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-[#8b8b8b] transition-colors duration-200 hover:text-[#D4AF37] sm:text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeCurve } },
              }}
            >
              <h3 className="text-base font-bold text-white sm:text-xl">Explore</h3>
              <ul className="mt-3 space-y-2 sm:mt-5 sm:space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-[#8b8b8b] transition-colors duration-200 hover:text-[#D4AF37] sm:text-base"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeCurve } },
              }}
              className="col-span-2 sm:col-span-1"
            >
              <h3 className="text-base font-bold text-white sm:text-xl">Contact Us</h3>
              <ul className="mt-3 space-y-3 sm:mt-5">
                {contactItems.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group inline-flex items-start gap-2.5 text-[13px] text-[#8b8b8b] transition-colors duration-200 hover:text-[#D4AF37] sm:text-base"
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                      <span className="leading-snug">{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <div className="mt-8 border-t border-[#242424] pt-5 sm:mt-10 sm:pt-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <p className="order-2 text-center text-xs text-[#7d7d7d] sm:order-1 sm:text-left sm:text-sm">
                © 2026 Asia Tours. All rights reserved.
              </p>
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
                className="order-1 flex items-center justify-center gap-2 sm:order-2 sm:gap-2.5"
              >
                {socialLinks.map(({ name, href, Icon }) => (
                  <motion.a
                    key={name}
                    href={href}
                    aria-label={name}
                    variants={{
                      hidden: { opacity: 0, scale: 0 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.4, ease: easeCurve },
                      },
                    }}
                    whileHover={{ scale: 1.15, y: -3 }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#171717] text-white transition-colors duration-200 hover:bg-[#D4AF37] hover:text-[#0A0A0A] sm:h-10 sm:w-10"
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
