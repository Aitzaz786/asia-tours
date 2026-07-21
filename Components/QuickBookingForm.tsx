"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { format } from "date-fns";
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
  easeCurve?: [number, number, number, number];
};

type ToastState = { title: string; message: string; tone: "success" | "error" } | null;

const fieldShell =
  "group relative flex min-w-0 items-center rounded-[22px] px-4 py-2.5 sm:px-5 lg:rounded-none lg:bg-transparent lg:px-3 lg:after:absolute lg:after:right-[-6px] lg:after:top-1/2 lg:after:h-9 lg:after:w-px lg:after:-translate-y-1/2 lg:after:bg-[#e8e1dc] xl:px-4";

const iconShell =
  "mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#D4AF37] transition-colors group-focus-within:text-[#B8860B]";

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

export default function QuickBookingForm(_props: QuickBookingFormProps = {}) {
  const [pickupDate, setPickupDate] = useState<Date>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarPlacement, setCalendarPlacement] = useState<"top" | "bottom">("bottom");
  const [calendarCoords, setCalendarCoords] = useState({ top: 0, left: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [mounted, setMounted] = useState(false);
  const dateFieldRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateCalendarPlacement = () => {
    const dateField = dateFieldRef.current;
    if (!dateField) return;

    const rect = dateField.getBoundingClientRect();
    const estimatedCalendarHeight = 360;
    const gap = 8;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const place: "top" | "bottom" =
      spaceBelow < estimatedCalendarHeight && spaceAbove > spaceBelow ? "top" : "bottom";

    setCalendarPlacement(place);
    setCalendarCoords({
      top: place === "top" ? rect.top - gap : rect.bottom + gap,
      left: Math.min(
        Math.max(rect.left + rect.width / 2, 148),
        window.innerWidth - 148,
      ),
    });
  };

  useEffect(() => {
    if (!calendarOpen) return;

    updateCalendarPlacement();
    const closeCalendarOnOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      const inField = dateFieldRef.current?.contains(target);
      const inCalendar = calendarRef.current?.contains(target);
      if (!inField && !inCalendar) {
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
        {toast && (
          <div className="pointer-events-none fixed right-4 top-4 z-[120] w-[calc(100%-2rem)] max-w-sm">
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
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#8a837d] hover:bg-[#f0ebe4]"
                  aria-label="Close notification"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="relative z-30 mx-auto -mt-12 w-[calc(100%-1.5rem)] max-w-[1500px] overflow-visible rounded-2xl border border-[rgba(212,175,55,0.12)] bg-[linear-gradient(135deg,#FFFFFF_0%,#FAF8F3_100%)] px-3 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] sm:-mt-14 sm:w-[calc(100%-2rem)] sm:rounded-[20px] sm:px-4 sm:py-3.5 lg:-mt-16 lg:w-[calc(100%-5rem)] lg:rounded-[22px] lg:px-5 xl:w-[calc(100%-7rem)] 2xl:w-[calc(100%-9rem)]"
      >
      <div className="relative flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-3">
        <div className="relative flex min-w-0 items-center rounded-[22px] bg-[#111111] px-4 py-2.5 text-white  sm:px-5 lg:w-[23%] lg:bg-transparent lg:text-[#111111] lg:shadow-none lg:px-3 lg:after:absolute lg:after:right-[-6px] lg:after:top-1/2 lg:after:h-10 lg:after:w-px lg:after:-translate-y-1/2 lg:after:bg-[#e8e1dc] xl:px-4">
          <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#0A0A0A]">
            <CarFront className="h-[18px] w-[18px]" />
          </div>
          <div className="min-w-0">
            <p className="max-w-[18ch] text-sm font-black leading-5 text-white lg:text-[#111111]">
              Need to Rent a Luxury Car?
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium leading-5 text-white/70 lg:text-[#4b5563]">
              <Sparkles className="h-3.5 w-3.5 text-[#E8C766]" />
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

            {calendarOpen && mounted
              ? createPortal(
                  <div
                    ref={calendarRef}
                    style={{
                      position: "fixed",
                      left: calendarCoords.left,
                      top: calendarCoords.top,
                      transform:
                        calendarPlacement === "top"
                          ? "translate(-50%, -100%)"
                          : "translateX(-50%)",
                      zIndex: 200,
                    }}
                    className="w-72 rounded-2xl border border-[#efe3d8] bg-white text-black shadow-[0_20px_60px_rgba(15,23,42,0.22)]"
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
                          "h-9 w-9 rounded-xl text-sm font-medium outline-none hover:bg-[#F5E9C8] hover:text-[#D4AF37] focus-visible:ring-2 focus-visible:ring-[#D4AF37]/30",
                        selected:
                          "[&>button]:!bg-[#D4AF37] [&>button]:!text-[#0A0A0A] [&>button]:!font-bold [&>button]:!shadow-none",
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
                  </div>,
                  document.body,
                )
              : null}
          </div>

          <div className="flex items-center px-1 py-1 sm:col-span-2 sm:px-0 lg:col-span-1 lg:pl-3 lg:pr-0 xl:pl-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="hero-send-button inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-8 text-sm font-black text-[#0A0A0A] hover:bg-[#B8860B] disabled:cursor-not-allowed disabled:opacity-75 lg:w-auto lg:min-w-[132px]"
            >
              {isSubmitting ? (
                <>
                  Sending <Loader2 className="h-4 w-4" />
                </>
              ) : (
                <>
                  Send <Send className="h-4 w-4 rotate-45 lg:rotate-0" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      </form>
    </>
  );
}
