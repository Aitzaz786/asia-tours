import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const contactMethods = [
  {
    title: "Call Our Team",
    value: "+92 300 0000000",
    description: "Speak directly with our booking desk for urgent reservations and live coordination.",
    icon: Phone,
    href: "tel:+923000000000",
  },
  {
    title: "Email Us",
    value: "hello@asiatours.com",
    description: "Send itinerary details, vehicle preferences, or corporate travel requirements anytime.",
    icon: Mail,
    href: "mailto:hello@asiatours.com",
  },
  {
    title: "Visit Office",
    value: "Islamabad, Pakistan",
    description: "Meet our team to discuss executive transport, long-term bookings, and event travel planning.",
    icon: MapPin,
    href: "#location",
  },
];

const trustPoints = [
  "Fast response for new booking requests",
  "Luxury fleet recommendations based on your route",
  "Event, airport, and intercity coordination support",
  "Professional service with polished vehicle standards",
];

const serviceSteps = [
  {
    title: "Share your plans",
    text: "Tell us your date, route, number of guests, and preferred vehicle style.",
  },
  {
    title: "Receive recommendations",
    text: "We suggest the best available options based on comfort, timing, and occasion.",
  },
  {
    title: "Confirm smoothly",
    text: "Once approved, we coordinate the pickup and prepare your service experience.",
  },
];

export default function ContactUsPage() {
  return (
    <main className="bg-[#fcfaf7] text-[#050a11]">
      <section className="bg-[#071018] px-4 pb-8 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 sm:rounded-[42px]">
            <div className="absolute inset-0">
              <Image
                src="/about.jpeg"
                alt="Luxury vehicle contact page hero"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,17,0.95),rgba(5,10,17,0.74),rgba(5,10,17,0.42))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,77,10,0.18),transparent_28%)]" />

            <div className="relative grid min-h-[560px] gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14 lg:py-16">
              <div className="flex max-w-3xl flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2 text-sm text-[#c9a96e]">
                  <Link href="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span>Contact Us</span>
                </div>

                <p className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a96e]">
                  <Sparkles className="h-4 w-4" />
                  <span>Contact Asia Tours</span>
                </p>

                <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.95] text-white sm:text-5xl lg:text-[5rem]">
                  Let’s plan your next
                  <span className="mt-2 block text-[#f0e5d4]">premium journey.</span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                  Reach our team for bookings, itinerary planning, airport transfers, executive movement, family travel, and tailored luxury transport support.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href="tel:+923000000000"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff4d0a] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(255,77,10,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#eb4300]"
                  >
                    <span>Call Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:hello@asiatours.com"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
                  >
                    Send Email
                  </a>
                </div>
              </div>

              <div className="self-end">
                <div className="rounded-[30px] border border-white/10 bg-[#08111a]/80 p-6 text-white backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#c9a96e]">Quick Support</p>
                  <h2 className="mt-4 text-3xl font-semibold">Need a fast response?</h2>
                  <p className="mt-3 text-sm leading-7 text-white/68">
                    Our team helps with same-day plans, airport timing, vehicle selection, and premium travel coordination.
                  </p>

                  <div className="mt-6 grid gap-3">
                    {[
                      { label: "Booking Desk", value: "Available Daily" },
                      { label: "Response Time", value: "Usually within minutes" },
                      { label: "Support Style", value: "Call, email, and tailored planning" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-white/45">{item.label}</p>
                        <p className="mt-2 text-lg font-semibold">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[34px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.04)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a96e]">
              Direct Contact
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Multiple ways to reach our team
            </h2>

            <div className="mt-8 space-y-4">
              {contactMethods.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.title}
                    href={item.href}
                    className="block rounded-[24px] border border-[#efe4d8] bg-[#fffaf7] p-5 transition-all hover:-translate-y-0.5 hover:border-[#f3d4c8]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff1ea] text-[#ff4d0a]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#c9a96e]">
                          {item.title}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold">{item.value}</h3>
                        <p className="mt-2 text-sm leading-7 text-[#66615b]">{item.description}</p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-8 rounded-[28px] bg-[#071018] p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ff4d0a]/14 text-[#ff8457]">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a96e]">
                    Availability
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold">Daily booking support</h3>
                  <p className="mt-3 text-sm leading-7 text-white/72">
                    Our team is available for reservations, itinerary planning, and premium fleet recommendations throughout the week.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[34px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.04)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a96e]">
              Send Inquiry
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Tell us about your travel plans
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[#66615b]">
              Share your trip details below and our team will suggest the right service or vehicle for your schedule and occasion.
            </p>

            <form className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#111111]">Full Name</span>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl border border-[#eadfd4] bg-[#fffaf7] px-4 py-3 text-sm text-[#111111] outline-none transition-colors placeholder:text-[#958e88] focus:border-[#ff4d0a]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#111111]">Phone Number</span>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full rounded-2xl border border-[#eadfd4] bg-[#fffaf7] px-4 py-3 text-sm text-[#111111] outline-none transition-colors placeholder:text-[#958e88] focus:border-[#ff4d0a]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#111111]">Email Address</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-[#eadfd4] bg-[#fffaf7] px-4 py-3 text-sm text-[#111111] outline-none transition-colors placeholder:text-[#958e88] focus:border-[#ff4d0a]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#111111]">Service Type</span>
                <select className="w-full rounded-2xl border border-[#eadfd4] bg-[#fffaf7] px-4 py-3 text-sm text-[#111111] outline-none transition-colors focus:border-[#ff4d0a]">
                  <option>Executive Chauffeur</option>
                  <option>Airport Transfer</option>
                  <option>Wedding & Events</option>
                  <option>Intercity Travel</option>
                  <option>Custom Booking</option>
                </select>
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-[#111111]">Pickup Location</span>
                <input
                  type="text"
                  placeholder="Where should we pick you up?"
                  className="w-full rounded-2xl border border-[#eadfd4] bg-[#fffaf7] px-4 py-3 text-sm text-[#111111] outline-none transition-colors placeholder:text-[#958e88] focus:border-[#ff4d0a]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#111111]">Travel Date</span>
                <input
                  type="date"
                  className="w-full rounded-2xl border border-[#eadfd4] bg-[#fffaf7] px-4 py-3 text-sm text-[#111111] outline-none transition-colors focus:border-[#ff4d0a]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#111111]">Passengers</span>
                <input
                  type="number"
                  min="1"
                  placeholder="Number of guests"
                  className="w-full rounded-2xl border border-[#eadfd4] bg-[#fffaf7] px-4 py-3 text-sm text-[#111111] outline-none transition-colors placeholder:text-[#958e88] focus:border-[#ff4d0a]"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-[#111111]">Trip Details</span>
                <textarea
                  rows={6}
                  placeholder="Tell us your route, vehicle preference, event type, airport timing, or any special request."
                  className="w-full rounded-[24px] border border-[#eadfd4] bg-[#fffaf7] px-4 py-3 text-sm text-[#111111] outline-none transition-colors placeholder:text-[#958e88] focus:border-[#ff4d0a]"
                />
              </label>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-[#ff4d0a] px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(255,77,10,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#eb4300]"
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="px-4 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[34px] bg-[#071018] p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a96e]">
              Why Contact Us
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              We help turn simple inquiries into smooth premium travel
            </h2>

            <div className="mt-8 grid gap-3">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff4d0a]/14">
                    <Check className="h-4 w-4 text-[#ff8457]" />
                  </span>
                  <p className="text-sm leading-7 text-white/78">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="location" className="rounded-[34px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.04)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c9a96e]">
              Booking Journey
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              What happens after you contact us
            </h2>

            <div className="mt-8 space-y-4">
              {serviceSteps.map((step, index) => (
                <div key={step.title} className="rounded-[24px] border border-[#efe4d8] bg-[#fffaf7] p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff1ea] text-sm font-semibold text-[#ff4d0a]">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#66615b]">{step.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] border border-[#efe4d8] bg-[#fffaf7] p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff1ea] text-[#ff4d0a]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Service-first support</h3>
                  <p className="mt-2 text-sm leading-7 text-[#66615b]">
                    We focus on practical coordination, polished service, and matching the right vehicle to your exact travel needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[40px] border border-[#eadfd4] bg-white px-6 py-16 text-center shadow-[0_18px_50px_rgba(15,23,42,0.04)] sm:px-10 lg:py-20">
          <p className="text-xl text-[#c9a96e]">{"\u2726"}</p>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-[3rem]">
            Need quick answers before you book?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#66615b]">
            Explore our frequently asked questions or connect directly with the team for help choosing the right premium travel option.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[#ff4d0a] px-8 py-4 text-base font-semibold text-white shadow-[0_18px_45px_rgba(255,77,10,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#eb4300]"
            >
              Back to Home
            </Link>
            <a
              href="mailto:hello@asiatours.com"
              className="inline-flex items-center justify-center rounded-full border border-[#f0d8cc] px-8 py-4 text-base font-semibold text-[#111111] transition-colors hover:bg-[#fff5f1]"
            >
              Email Our Team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
