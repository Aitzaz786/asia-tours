"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MapPin,
  Phone,
  Send,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { CalendarMonth, DayPicker, useDayPicker } from "react-day-picker";
import { submitInquiry } from "@/app/actions/submitInquiry";

type QuickBookingFormProps = {
  easeCurve: [number, number, number, number];
};

type ToastState = { title: string; message: string; tone: "success" | "error" } | null;

const fieldShell =
  "group relative flex min-w-0 items-center rounded-[22px] px-4 py-2.5 sm:px-5 lg:rounded-none lg:bg-transparent lg:px-3 lg:after:absolute lg:after:right-[-6px] lg:after:top-1/2 lg:after:h-9 lg:after:w-px lg:after:-translate-y-1/2 lg:after:bg-[#e8e1dc] xl:px-4";

const iconShell =
  "mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff4500]/10 text-[#ff4500] transition-all group-focus-within:bg-[#ff4500] group-focus-within:text-white";

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
          className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-[#e8ddd4] text-[#6d655e] transition-colors hover:border-[#ff4d0a] hover:text-[#ff4d0a] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => nextMonth && goToMonth(nextMonth)}
          disabled={!nextMonth}
          className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-[#e8ddd4] text-[#6d655e] transition-colors hover:border-[#ff4d0a] hover:text-[#ff4d0a] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function QuickBookingForm({ easeCurve }: QuickBookingFormProps) {
  const [pickupDate, setPickupDate] = useState<Date>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarPlacement, setCalendarPlacement] = useState<"top" | "bottom">("bottom");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const dateFieldRef = useRef<HTMLDivElement>(null);

  const updateCalendarPlacement = () => {
    const dateField = dateFieldRef.current;
    if (!dateField) return;

    const rect = dateField.getBoundingClientRect();
    const estimatedCalendarHeight = 350;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    setCalendarPlacement(
      spaceBelow < estimatedCalendarHeight && spaceAbove > spaceBelow ? "top" : "bottom",
    );
  };

  useEffect(() => {
    if (!calendarOpen) return;

    updateCalendarPlacement();
    const closeCalendarOnOutsideClick = (event: MouseEvent) => {
      if (
        dateFieldRef.current &&
        !dateFieldRef.current.contains(event.target as Node)
      ) {
        setCalendarOpen(false);
      }
    };
    const closeCalendarOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCalendarOpen(false);
      }
    };

    window.addEventListener("resize", updateCalendarPlacement);
    window.addEventListener("scroll", updateCalendarPlacement, true);
    document.addEventListener("mousedown", closeCalendarOnOutsideClick);
    document.addEventListener("keydown", closeCalendarOnEscape);

    return () => {
      window.removeEventListener("resize", updateCalendarPlacement);
      window.removeEventListener("scroll", updateCalendarPlacement, true);
      document.removeEventListener("mousedown", closeCalendarOnOutsideClick);
      document.removeEventListener("keydown", closeCalendarOnEscape);
    };
  }, [calendarOpen]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!pickupDate) {
      setToast({
        title: "Pickup date required",
        message: "Please select your pickup date before sending the booking request.",
        tone: "error",
      });
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    setIsSubmitting(true);
    try {
      await submitInquiry({
        full_name: data.get("fullName") as string,
        phone: data.get("mobileNo") as string,
        pickup_location: data.get("pickupLocation") as string,
        pickup_date: format(pickupDate, "dd MMM yyyy"),
        form_source: "quick_booking",
      });

      form.reset();
      setPickupDate(undefined);
      setToast({
        title: "Booking request sent",
        message: "Thank you. Our team will contact you shortly with confirmation.",
        tone: "success",
      });
    } catch {
      setToast({
        title: "Unable to send request",
        message: "Please try again in a moment or contact us directly.",
        tone: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.97 }}
            transition={{ duration: 0.26 }}
            className="pointer-events-none fixed right-4 top-4 z-[120] w-[calc(100%-2rem)] max-w-sm"
          >
            <div
              className={`pointer-events-auto rounded-2xl border bg-white px-5 py-4 shadow-2xl backdrop-blur-xl ${
                toast.tone === "success" ? "border-green-100" : "border-red-100"
              }`}
              role="status"
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white ${
                    toast.tone === "success" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {toast.tone === "success" ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#111111]">{toast.title}</p>
                  <p className="mt-0.5 text-sm leading-6 text-[#66615b]">{toast.message}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setToast(null)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#8a837d] transition-colors hover:bg-[#f0ebe4]"
                  aria-label="Close notification"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: easeCurve }}
        onSubmit={handleSubmit}
        autoComplete="off"
        className="relative z-30 mx-auto -mt-8 w-[calc(100%-1.5rem)] max-w-[1500px] overflow-visible rounded-[28px] border border-white/75 bg-white/95 px-3 py-3 shadow-[0_24px_70px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:-mt-14 sm:w-[calc(100%-2rem)] sm:px-4 sm:py-3 lg:-mt-16 lg:w-[calc(100%-5rem)] lg:rounded-full lg:px-5 xl:w-[calc(100%-7rem)] 2xl:w-[calc(100%-9rem)]"
      >
      <div className="relative flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-3">
        <div className="relative flex min-w-0 items-center rounded-[22px] bg-[#111111] px-4 py-2.5 text-white shadow-[0_16px_36px_rgba(17,17,17,0.16)] sm:px-5 lg:w-[23%] lg:bg-transparent lg:text-[#111111] lg:shadow-none lg:px-3 lg:after:absolute lg:after:right-[-6px] lg:after:top-1/2 lg:after:h-10 lg:after:w-px lg:after:-translate-y-1/2 lg:after:bg-[#e8e1dc] xl:px-4">
          <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff4500] text-white shadow-[0_12px_24px_rgba(255,69,0,0.28)]">
            <CarFront className="h-[18px] w-[18px]" />
          </div>
          <div className="min-w-0">
            <p className="max-w-[18ch] text-sm font-black leading-5 text-white lg:text-[#111111]">
              Need to Rent a Luxury Car?
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium leading-5 text-white/70 lg:text-[#4b5563]">
              <Sparkles className="h-3.5 w-3.5 text-[#ff8a5c]" />
              Quick premium booking
            </p>
          </div>
        </div>

        <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr_1fr_auto] lg:items-center lg:gap-3">
          <div className={fieldShell}>
            <span className={iconShell}>
              <UserRound className="h-4.5 w-4.5" />
            </span>
            <label htmlFor="fullName" className="flex min-w-0 flex-1 flex-col justify-center">
              <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#111111]">
                Full Name
              </span>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter Full Name"
                autoComplete="new-password"
                required
                className="mt-0.5 w-full bg-transparent text-[13px] font-medium text-black outline-none placeholder:text-[#5f6368]"
              />
            </label>
          </div>

          <div className={fieldShell}>
            <span className={iconShell}>
              <Phone className="h-4.5 w-4.5" />
            </span>
            <label htmlFor="mobileNo" className="flex min-w-0 flex-1 flex-col justify-center">
              <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#111111]">
                Mobile No
              </span>
              <input
                id="mobileNo"
                name="mobileNo"
                type="tel"
                placeholder="Enter Phone no."
                autoComplete="new-password"
                required
                className="mt-0.5 w-full bg-transparent text-[13px] font-medium text-black outline-none placeholder:text-[#5f6368]"
              />
            </label>
          </div>

          <div className={fieldShell}>
            <span className={iconShell}>
              <MapPin className="h-4.5 w-4.5" />
            </span>
            <label htmlFor="pickupLocation" className="flex min-w-0 flex-1 flex-col justify-center">
              <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#111111]">
                Pickup Location
              </span>
              <input
                id="pickupLocation"
                name="pickupLocation"
                type="text"
                placeholder="Enter Location"
                autoComplete="new-password"
                required
                className="mt-0.5 w-full bg-transparent text-[13px] font-medium text-black outline-none placeholder:text-[#5f6368]"
              />
            </label>
          </div>

          <div ref={dateFieldRef} className={`${fieldShell} relative lg:after:hidden`}>
            <span className={iconShell}>
              <CalendarDays className="h-4.5 w-4.5" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#111111]">
                Pickup Date
              </span>
              <button
                id="pickupDate"
                type="button"
                onClick={() => {
                  updateCalendarPlacement();
                  setCalendarOpen((open) => !open);
                }}
                className="mt-0.5 flex w-full items-center justify-between gap-2 text-left text-[13px] font-medium text-black outline-none"
              >
                <span className={pickupDate ? "text-black" : "text-[#5f6368]"}>
                  {pickupDate ? format(pickupDate, "dd MMM yyyy") : "Select Date"}
                </span>
                <CalendarDays className="h-4 w-4 shrink-0 text-[#111111]" />
              </button>
            </div>

            {calendarOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className={`absolute left-1/2 z-50 w-72 -translate-x-1/2 rounded-2xl border border-[#efe3d8] bg-white text-black shadow-[0_20px_60px_rgba(15,23,42,0.14)] lg:left-auto lg:right-0 lg:translate-x-0 ${
                  calendarPlacement === "top"
                    ? "bottom-[calc(100%+8px)]"
                    : "top-[calc(100%+8px)]"
                }`}
              >
                <DayPicker
                  mode="single"
                  selected={pickupDate}
                  onSelect={(date) => {
                    setPickupDate(date);
                    if (date) setCalendarOpen(false);
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
                      "h-9 w-9 rounded-xl text-sm font-medium transition-all outline-none hover:bg-[#fff4ef] hover:text-[#ff4d0a] focus-visible:ring-2 focus-visible:ring-[#ff4d0a]/30",
                    selected:
                      "[&>button]:!bg-[#ff4d0a] [&>button]:!text-white [&>button]:!font-bold [&>button]:shadow-[0_4px_14px_rgba(255,77,10,0.35)]",
                    today:
                      "[&>button]:border [&>button]:border-[#ff4d0a]/40 [&>button]:text-[#ff4d0a] [&>button]:font-semibold",
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
            ) : null}
          </div>

          <div className="flex items-center px-1 py-1 sm:col-span-2 sm:px-0 lg:col-span-1 lg:pl-3 lg:pr-0 xl:pl-4">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="hero-send-button inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#ff4500] px-8 text-sm font-black text-white shadow-[0_18px_36px_rgba(255,69,0,0.28)] transition-colors hover:bg-[#e53d00] disabled:cursor-not-allowed disabled:opacity-75 lg:w-auto lg:min-w-[132px]"
            >
              {isSubmitting ? (
                <>
                  Sending <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Send <Send className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
      </motion.form>
    </>
  );
}
