import type { Metadata } from "next";
import LegalDocumentPage, { type LegalSection } from "@/Components/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | Asia Tours Pakistan",
  description:
    "Read the terms governing bookings, payments, cancellations, vehicle use, and chauffeur services provided by Asia Tours Pakistan.",
};

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement to these terms",
    paragraphs: [
      "These Terms & Conditions apply when you browse our website, request a quote, make a booking, or use a vehicle or chauffeur service provided by Asia Tours. By confirming a booking, you agree to these terms and to the details stated in your quotation or booking confirmation.",
      "If a written quotation or booking confirmation contains service-specific terms, those terms will apply to that booking in addition to this document.",
    ],
  },
  {
    id: "booking-eligibility",
    title: "Bookings and eligibility",
    bullets: [
      "You must provide accurate contact, passenger, pickup, destination, and itinerary information.",
      "The person making the booking must be at least 18 years old and authorized to accept these terms for all passengers included in the booking.",
      "A booking is confirmed only after Asia Tours provides written confirmation and any required advance payment has been received.",
      "Vehicle requests are subject to availability. If a selected vehicle becomes unavailable, we may offer a comparable or upgraded alternative.",
    ],
  },
  {
    id: "pricing-payments",
    title: "Pricing and payments",
    paragraphs: [
      "Prices are quoted in Pakistani Rupees unless stated otherwise. Your confirmation will describe the included hours, distance, driver service, fuel, tolls, parking, taxes, and any security deposit where applicable.",
      "Additional time, distance, route changes, waiting time, parking, tolls, accommodation, or special requests not included in the original quotation may result in extra charges. Payment deadlines and accepted methods will be communicated before confirmation.",
    ],
  },
  {
    id: "booking-cancellation",
    title: "Booking changes, cancellation and refunds",
    paragraphs: [
      "Please contact us as early as possible if you need to change or cancel a booking. A change is subject to vehicle and chauffeur availability and may affect the price.",
      "Any cancellation charge or refundable amount depends on the notice provided, booking type, vehicle reserved, third-party costs already committed, and the cancellation terms shown in your confirmation. No-show bookings and cancellations after dispatch may be non-refundable.",
      "If Asia Tours must cancel due to vehicle unavailability or an operational issue, we will offer a suitable alternative or refund the amount paid for the affected service. We are not responsible for indirect costs arising from circumstances outside our reasonable control.",
    ],
  },
  {
    id: "passenger-conduct",
    title: "Passenger conduct and vehicle care",
    bullets: [
      "Passengers must follow reasonable safety instructions from the chauffeur and wear seat belts where available.",
      "Smoking, illegal substances, unlawful activity, dangerous behavior, and deliberate damage are prohibited in our vehicles.",
      "The booking customer may be charged for damage, excessive cleaning, missing items, fines, or losses caused by passengers in their party.",
      "Passenger numbers and luggage must remain within the safe and legal capacity of the booked vehicle.",
    ],
  },
  {
    id: "delays-force-majeure",
    title: "Delays and events beyond our control",
    paragraphs: [
      "We plan journeys carefully, but travel times can be affected by traffic, weather, road closures, security restrictions, mechanical issues, public events, or other circumstances outside our reasonable control. Customers should allow suitable time for airports, meetings, and fixed departures.",
      "We will make reasonable efforts to notify you, provide an alternative vehicle, or adjust the service when disruption occurs, but exact arrival or journey times cannot be guaranteed in such circumstances.",
    ],
  },
  {
    id: "liability",
    title: "Liability",
    paragraphs: [
      "Nothing in these terms excludes liability that cannot legally be excluded. To the extent permitted by law, Asia Tours is not liable for indirect or consequential loss, missed connections, loss of business, or loss caused by inaccurate information supplied by the customer.",
      "Customers remain responsible for their personal belongings. Please contact us promptly about lost property; although we will try to assist, we cannot guarantee recovery or storage.",
    ],
  },
  {
    id: "law-contact",
    title: "Governing law and contact",
    paragraphs: [
      "These terms are governed by the applicable laws of Pakistan. We encourage customers to contact us first so that any concern can be resolved promptly and fairly.",
      "Questions may be sent to contact@asiatourspk.com or discussed by phone at +92 300 4591145.",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalDocumentPage
      eyebrow="Legal information"
      title="Terms & Conditions"
      description="Clear terms for bookings, payments, cancellations, passenger responsibilities, and the premium transport services we provide."
      lastUpdated="July 21, 2026"
      sections={sections}
      heroImage="/gold/assets/terms-hero-v1.webp"
      heroAlt="Asia Tours travel concierge reviewing an itinerary and booking terms with a client"
      heroCaption="CLEAR PLANS · CONSIDERED JOURNEYS"
    />
  );
}
