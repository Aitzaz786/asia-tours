import type { Metadata } from "next";
import LegalDocumentPage, { type LegalSection } from "@/Components/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Asia Tours Pakistan",
  description:
    "Learn how Asia Tours Pakistan collects, uses, protects, and manages personal information provided through its website and booking services.",
};

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "Scope of this policy",
    paragraphs: [
      "This Privacy Policy explains how Asia Tours handles personal information when you visit our website, contact our team, request a quotation, make a booking, or use our car rental and chauffeur services.",
      "By using our website or providing information to us, you acknowledge the practices described in this policy.",
    ],
  },
  {
    id: "information-collected",
    title: "Information we collect",
    bullets: [
      "Identity and contact details such as your name, phone number, email address, and billing information.",
      "Booking details including pickup and destination, dates, passenger count, vehicle preference, itinerary, and special requests.",
      "Communications sent through forms, email, telephone, WhatsApp, or other support channels.",
      "Technical information such as device, browser, IP address, pages visited, and basic analytics or cookie data where enabled.",
      "Identification or business details when reasonably required to confirm a booking, meet legal obligations, or prevent fraud.",
    ],
  },
  {
    id: "how-we-use-data",
    title: "How we use your information",
    bullets: [
      "Respond to inquiries, prepare quotations, confirm bookings, and deliver requested services.",
      "Coordinate chauffeurs, vehicles, routes, pickups, payments, and customer support.",
      "Send operational updates about a booking and maintain service records.",
      "Improve our website, fleet planning, customer experience, safety, and fraud prevention.",
      "Comply with lawful requests, accounting requirements, and other applicable legal obligations.",
      "Send promotional communication only where permitted; you may ask us to stop at any time.",
    ],
  },
  {
    id: "sharing",
    title: "When information may be shared",
    paragraphs: [
      "We do not sell personal information. We may share only the information reasonably needed with chauffeurs, vehicle providers, payment or technology providers, professional advisers, and other service partners involved in fulfilling a booking or operating our business.",
      "We may also disclose information when required by law, to respond to a valid authority request, to protect customers or the public, or to establish and defend legal rights. Service providers are expected to handle information securely and only for the agreed purpose.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and website analytics",
    paragraphs: [
      "Our website may use essential cookies and similar technologies to support functionality, security, preferences, and performance measurement. Analytics services may provide aggregated information about how visitors use the site.",
      "You can manage cookies through your browser settings. Disabling certain cookies may affect some website features.",
    ],
  },
  {
    id: "retention-security",
    title: "Retention and security",
    paragraphs: [
      "We retain personal information only for as long as reasonably necessary for bookings, customer support, accounting, dispute resolution, safety, and legal compliance. Retention periods vary according to the type of record and why it is held.",
      "We use reasonable administrative and technical safeguards to protect information. No internet transmission or storage method is completely secure, so absolute security cannot be guaranteed.",
    ],
  },
  {
    id: "your-choices",
    title: "Your choices and requests",
    paragraphs: [
      "We may need to verify your identity before completing a request. Some information may need to be retained where required by law or for legitimate business records.",
    ],
    bullets: [
      "Ask for access to or correction of the personal information we hold about you.",
      "Request deletion where we no longer have a lawful or operational reason to retain the information.",
      "Withdraw consent for optional communications or unsubscribe from marketing messages.",
      "Raise a concern about how your information has been handled.",
    ],
  },
  {
    id: "updates-contact",
    title: "Policy updates and contact",
    paragraphs: [
      "We may update this policy to reflect changes in our services, technology, or legal requirements. The latest version will be posted on this page with a revised update date.",
      "For privacy questions or requests, email contact@asiatourspk.com, call +92 300 4591145, or write to Asia Tours, Punjab Society, Ghazi Road, Lahore, Pakistan.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentPage
      eyebrow="Your privacy"
      title="Privacy Policy"
      description="How we collect, use, share, retain, and protect information while arranging your journey with Asia Tours."
      lastUpdated="July 21, 2026"
      sections={sections}
    />
  );
}