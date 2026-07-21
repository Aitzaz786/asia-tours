"use client";

import { Fragment, FormEvent, useEffect, useRef, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarMonth, DayPicker, useDayPicker } from "react-day-picker";
import { format } from "date-fns";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircleMore,
  Phone,
  X,
  Send,
  Check,
} from "lucide-react";
import { submitInquiry } from "@/app/actions/submitInquiry";

/* ── Custom calendar header ─────────────────────────── */
function CalendarCaption({ calendarMonth }: { calendarMonth: CalendarMonth }) {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();
  return (
    <div className="flex items-center justify-between px-1 pb-1">
      <span className="text-sm font-bold text-[#111111]">
        {format(calendarMonth.date, "MMMM yyyy")}
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => previousMonth && goToMonth(previousMonth)}
          disabled={!previousMonth}
          className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-[#e8ddd4] text-[#6d655e] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => nextMonth && goToMonth(nextMonth)}
          disabled={!nextMonth}
          className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-[#e8ddd4] text-[#6d655e] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ── Date Picker ────────────────────────────────────── */
function DatePickerField({
  value,
  onChange,
}: {
  value: Date | undefined;
  onChange: (d: Date | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`flex w-full items-center gap-2.5 rounded-xl border bg-[#fdfaf8] px-4 py-3 text-sm outline-none transition-all ${
          open
            ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/10"
            : "border-[#e8ddd4] hover:border-[#cfc5ba]"
        }`}
      >
        <CalendarDays className={`h-4 w-4 shrink-0 ${value ? "text-[#D4AF37]" : "text-[#aaa49d]"}`} />
        <span className={value ? "text-[#111111]" : "text-[#c0b8b0]"}>
          {value ? format(value, "dd MMM yyyy") : "Pick a date"}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-[calc(100%+8px)] z-[999] w-72 rounded-2xl border border-[#efe3d8] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.14)]"
          >
            <DayPicker
              mode="single"
              selected={value}
              onSelect={(d) => {
                onChange(d);
                if (d) setOpen(false);
              }}
              disabled={{ before: new Date() }}
              showOutsideDays
              classNames={{
                root: "p-4",
                months: "flex flex-col",
                month: "space-y-3",
                month_caption: "hidden",
                nav: "hidden",
                month_grid: "w-full border-collapse",
                weekdays: "flex",
                weekday:
                  "w-9 text-center text-[10px] font-semibold uppercase tracking-wide text-[#b0a89f] pb-2",
                week: "flex mt-1",
                day: "relative p-0",
                day_button:
                  "h-9 w-9 rounded-xl text-sm font-medium transition-all outline-none hover:bg-[#F5E9C8] hover:text-[#D4AF37] focus-visible:ring-2 focus-visible:ring-[#D4AF37]/30",
                selected:
                  "[&>button]:!bg-[#D4AF37] [&>button]:!text-[#0A0A0A] [&>button]:!font-bold [&>button]:shadow-[0_4px_14px_rgba(212,175,55,0.35)]",
                today:
                  "[&>button]:border [&>button]:border-[#D4AF37]/40 [&>button]:text-[#D4AF37] [&>button]:font-semibold",
                outside:
                  "[&>button]:text-[#d0c9c2] [&>button]:hover:bg-transparent [&>button]:hover:text-[#d0c9c2]",
                disabled:
                  "[&>button]:!text-[#ddd8d2] [&>button]:!cursor-not-allowed [&>button]:hover:bg-transparent",
                hidden: "invisible",
              }}
              components={{
                MonthCaption: CalendarCaption,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Data ────────────────────────────────────────────── */
const serviceOptions = [
  { id: 1, label: "Executive Chauffeur", icon: "🚘" },
  { id: 2, label: "Airport Transfer", icon: "✈️" },
  { id: 3, label: "Wedding & Events", icon: "💍" },
  { id: 4, label: "Intercity Travel", icon: "🛣️" },
  { id: 5, label: "Tour Package", icon: "🏔️" },
  { id: 6, label: "Custom Booking", icon: "✨" },
];

const quickLinks = [
  { icon: Phone, label: "+92 300 4591145", href: "tel:+923004591145", sub: "Call us anytime" },
  { icon: Mail, label: "contact@asiatourspk.com", href: "mailto:contact@asiatourspk.com", sub: "Reply within 2 hrs" },
  { icon: MessageCircleMore, label: "WhatsApp", href: "https://wa.me/923004591145", sub: "Instant response" },
];

type ToastState = { title: string; message: string; tone: "success" | "error" } | null;

/* ── Page ────────────────────────────────────────────── */
export default function ContactUsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [selectedService, setSelectedService] = useState(serviceOptions[0]);
  const [travelDate, setTravelDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    const html = document.documentElement;
    html.style.overflowY = "scroll";
    html.style.scrollbarGutter = "stable";
    const observer = new MutationObserver(() => {
      if (html.style.overflow === "hidden") {
        html.style.overflow = "";
        html.style.overflowY = "scroll";
        html.style.paddingRight = "";
      }
    });
    observer.observe(html, { attributes: true, attributeFilter: ["style"] });
    return () => {
      observer.disconnect();
      html.style.overflowY = "";
      html.style.scrollbarGutter = "";
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!travelDate) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    setIsSubmitting(true);
    try {
      await submitInquiry({
        full_name: data.get("fullName") as string,
        phone: data.get("phone") as string,
        email: data.get("email") as string,
        service_type: selectedService.label,
        pickup_location: data.get("pickupLocation") as string,
        travel_date: format(travelDate, "dd MMM yyyy"),
        passengers: Number(data.get("passengers")),
        trip_details: data.get("tripDetails") as string,
        form_source: "contact_us",
      });

      form.reset();
      setSelectedService(serviceOptions[0]);
      setTravelDate(undefined);
      setToast({
        title: "Inquiry sent successfully",
        message: "Our concierge team will review your details and contact you shortly.",
        tone: "success",
      });
    } catch {
      setToast({
        title: "Unable to send inquiry",
        message: "Please try again or reach us by phone, email, or WhatsApp.",
        tone: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="overflow-x-hidden">

      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.97 }}
            transition={{ duration: 0.26 }}
            className="pointer-events-none fixed right-4 top-4 z-50 w-[calc(100%-2rem)] max-w-sm"
          >
            <div
              className={`pointer-events-auto rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur-xl ${
                toast.tone === "success" ? "border-green-100 bg-white" : "border-red-100 bg-white"
              }`}
              role="status" aria-live="polite"
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white ${toast.tone === "success" ? "bg-green-500" : "bg-red-500"}`}>
                  {toast.tone === "success" ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#111111]">{toast.title}</p>
                  <p className="mt-0.5 text-sm leading-6 text-[#66615b]">{toast.message}</p>
                </div>
                <button type="button" onClick={() => setToast(null)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#8a837d] transition-colors hover:bg-[#f0ebe4]" aria-label="Close">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Split Layout ── */}
      <section className="min-h-[calc(100vh-80px)] px-4 py-16 sm:px-6 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-6xl">

          {/* wrapper: NO overflow-hidden — rounded corners on each child separately */}
          <div className="rounded-none shadow-none sm:rounded-3xl sm:shadow-[0_0px_28px_rgba(15,23,42,0.14)] lg:flex lg:items-start">

       {/* ── Left Panel (Enhanced UI) ── */}
<div className="relative flex flex-col justify-between rounded-t-3xl border border-white/10 bg-gradient-to-b from-[#0f0f0f] to-[#0b0b0b] px-8 py-10 shadow-none sm:shadow-2xl lg:sticky lg:top-6 lg:w-[440px] lg:shrink-0 lg:self-start lg:rounded-l-3xl lg:rounded-r-none lg:px-10 lg:py-8">

  {/* Header */}
  <div className="relative">
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9a96e] backdrop-blur">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D4AF37]" />
      Asia Tours Concierge
    </span>

    <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white">
      Let&apos;s plan your{" "}
      <span className="bg-gradient-to-r from-[#D4AF37] via-[#E8C766] to-[#E8C766] bg-clip-text text-transparent">
        perfect journey
      </span>
    </h1>

    <p className="mt-4 text-sm leading-7 text-white/55">
      Every inquiry is handled by a dedicated travel specialist — not a bot.
      We listen, plan, and deliver unforgettable experiences.
    </p>

    <a
      href="https://www.google.com/maps/search/?api=1&query=Punjab+Society%2C+Ghazi+Road%2C+Lahore%2C+Punjab+54770%2C+Pakistan"
      target="_blank"
      rel="noreferrer"
      className="group mt-6 block rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition-colors hover:border-[#D4AF37]/35 hover:bg-white/[0.065]"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#D4AF37]">
          <MapPin className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8C766]">
            Visit Our Office
          </span>
          <span className="mt-1.5 block text-base font-bold leading-6 text-white">
            Punjab Society, Ghazi Road
          </span>
          <span className="mt-0.5 block text-sm leading-6 text-white/60">
            Lahore, Punjab 54770, Pakistan
          </span>
          <span className="mt-2 block text-xs font-semibold text-[#D4AF37] transition-colors group-hover:text-[#E8C766]">
            Open in Google Maps →
          </span>
        </span>
      </div>
    </a>
    {/* Quick Links */}
    <div className="mt-5 space-y-2.5">
      {quickLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="group flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/40 hover:bg-white/10 sm:hover:shadow-lg"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#E8C766] transition-all group-hover:bg-[#D4AF37]/25 group-hover:scale-110">
            <link.icon className="h-4 w-4" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white group-hover:text-[#E8C766] transition">
              {link.label}
            </p>
            <p className="text-[11px] text-white/40">{link.sub}</p>
          </div>
        </a>
      ))}
    </div>
  </div>

  {/* Map Section */}
  <div className="relative z-10 mt-5">
    <div className="overflow-hidden rounded-2xl border border-white/10 shadow-none sm:shadow-xl">
      <iframe
        title="Asia Tours Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6806.636040066094!2d74.36807269729556!3d31.46043684869127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919066888d233a7%3A0x907b9a4ede569120!2sPunjab%20Co-Operative%20Housing%20Society%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1780288188150!5m2!1sen!2s"
        width="100%"
        height="130"
        style={{ border: 0, display: "block", pointerEvents: "auto" }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>


    <div className="mt-3 flex items-start gap-2.5">
      <Clock3 className="mt-0.5 h-4 w-4 text-[#c9a96e]" />
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {["Mon-Sun 8am-10pm", "24/7 WhatsApp Support", "Emergency Available"].map((s) => (
          <span key={s} className="text-[11px] text-white/40">
            {s}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>

            {/* ── Right Panel (form) ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="flex-1 rounded-b-[40px] bg-white px-7 py-10 shadow-[0_0px_28px_rgba(15,23,42,0.14)] sm:px-10 sm:py-12 sm:shadow-none lg:rounded-b-none lg:rounded-r-[40px]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c9a96e]">Send Inquiry</p>
              <h3 className="mt-2 text-2xl font-extrabold text-[#111111] sm:text-3xl">Tell us your travel plans</h3>
              <p className="mt-2 text-sm leading-7 text-[#6d655e]">
                Fill in the details and our team will respond with tailored options and pricing.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#444]">Full Name</span>
                    <input type="text" name="fullName" autoComplete="name" required placeholder="Your full name"
                      className="w-full rounded-xl border border-[#e8ddd4] bg-[#fdfaf8] px-4 py-3 text-sm text-[#111111] outline-none transition-all placeholder:text-[#c0b8b0] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#444]">Phone</span>
                    <input type="tel" name="phone" autoComplete="tel" required placeholder="+92 300 0000000"
                      className="w-full rounded-xl border border-[#e8ddd4] bg-[#fdfaf8] px-4 py-3 text-sm text-[#111111] outline-none transition-all placeholder:text-[#c0b8b0] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10" />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#444]">Email</span>
                    <input type="email" name="email" autoComplete="email" required placeholder="you@email.com"
                      className="w-full rounded-xl border border-[#e8ddd4] bg-[#fdfaf8] px-4 py-3 text-sm text-[#111111] outline-none transition-all placeholder:text-[#c0b8b0] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10" />
                  </label>
                  <div>
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#444]">Service Type</span>
                    <Listbox value={selectedService} onChange={setSelectedService}>
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-xl border border-[#e8ddd4] bg-[#fdfaf8] px-4 py-3 text-left text-sm text-[#111111] outline-none transition-all focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10">
                          <span className="flex items-center gap-2">
                  
                            <span className="block truncate">{selectedService.label}</span>
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                            <ChevronDown className="h-4 w-4 text-[#aaa49d]" />
                          </span>
                        </Listbox.Button>
                        <Transition as={Fragment}
                          enter="transition ease-out duration-150" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-100" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
                          <Listbox.Options className="absolute z-30 mt-1.5 w-full overflow-hidden rounded-2xl border border-[#efe3d8] bg-white py-1 shadow-2xl focus:outline-none">
                            {serviceOptions.map((opt) => (
                              <Listbox.Option key={opt.id} value={opt} as={Fragment}>
                                {({ active, selected }) => (
                                  <li className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm transition-colors ${active ? "bg-[#F5E9C8] text-[#D4AF37]" : "text-[#111111]"}`}>
                                    <span className={`flex-1 ${selected ? "font-semibold" : ""}`}>{opt.label}</span>
                                    {selected && <Check className="h-3.5 w-3.5 text-[#D4AF37]" />}
                                  </li>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#444]">Pickup Location</span>
                  <input type="text" name="pickupLocation" autoComplete="street-address" required placeholder="Where should we pick you up?"
                    className="w-full rounded-xl border border-[#e8ddd4] bg-[#fdfaf8] px-4 py-3 text-sm text-[#111111] outline-none transition-all placeholder:text-[#c0b8b0] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10" />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#444]">Travel Date</span>
                    <DatePickerField value={travelDate} onChange={setTravelDate} />
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#444]">Passengers</span>
                    <input type="number" name="passengers" min="1" required placeholder="No. of guests"
                      className="w-full rounded-xl border border-[#e8ddd4] bg-[#fdfaf8] px-4 py-3 text-sm text-[#111111] outline-none transition-all placeholder:text-[#c0b8b0] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10" />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#444]">Trip Details</span>
                  <textarea name="tripDetails" rows={4} required
                    placeholder="Describe your route, vehicle preference, event type, airport timing, or any special request."
                    className="w-full resize-none rounded-xl border border-[#e8ddd4] bg-[#fdfaf8] px-4 py-3 text-sm text-[#111111] outline-none transition-all placeholder:text-[#c0b8b0] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10" />
                </label>

                <div className="h-px bg-[#f0ebe4]" />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-[#8a837d]">
                    Faster reply?{" "}
                    <a href="https://wa.me/923004591145" target="_blank" rel="noreferrer"
                      className="font-semibold text-[#169c49] underline-offset-2 hover:underline">WhatsApp us</a>
                  </p>
                  <motion.button type="submit" disabled={isSubmitting || !travelDate}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-semibold text-[#0A0A0A] shadow-[0_10px_36px_rgba(212,175,55,0.30)] transition-colors hover:bg-[#B8860B] disabled:cursor-not-allowed disabled:opacity-55">
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Sending..." : "Send Inquiry"}
                  </motion.button>
                </div>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: '0'
        }}
      >
        <h2>Book a Luxury Car in Pakistan</h2>
        <p>Asia Tours Pakistan offers premium car rental and chauffeur services across 50+ cities including Lahore, Islamabad, Rawalpindi, Multan, Faisalabad, Murree, and Bahawalpur. Our fleet includes Toyota Land Cruiser V8, Range Rover, Mercedes-Benz S-Class, BMW 7 Series, Bentley Continental GT, Audi A6, and Toyota Hiace Wagon. All vehicles are fully insured and available 24/7. Call or WhatsApp +923004591145 or email contact@asiatourspk.com for instant booking support.</p>
        <p>We provide airport transfers, wedding transport, corporate travel, and long-distance rentals across Pakistan. Punjab Society, Ghazi Road, Lahore, Punjab 54770, Pakistan.</p>
      </div>
    </main>
  );
}
