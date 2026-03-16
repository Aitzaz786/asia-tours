import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "../servicesData";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050a11] px-6 py-20 text-white sm:px-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/services"
          className="mb-8 inline-block text-xs uppercase tracking-[0.18em] text-[#c9a96e] hover:text-[#fa3132]"
        >
          Back to Services
        </Link>

        <h1 className="text-4xl font-semibold text-white sm:text-5xl">{service.title}</h1>
        <p className="mt-4 text-lg leading-8 text-[#b8b8b8]">{service.details}</p>

        <section className="mt-10 rounded-2xl border border-[#c9a96e]/20 bg-[#0b121c] p-6 sm:p-8">
          <h2 className="text-2xl font-medium text-white">Service Highlights</h2>
          <ul className="mt-5 space-y-3">
            {service.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#d8d8d8]">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#fa3132]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
