import Link from "next/link";
import DarkHeroShell, { HOME_HERO_CONTENT_HEIGHT } from "@/Components/DarkHeroShell";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalDocumentPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export default function LegalDocumentPage({
  eyebrow,
  title,
  description,
  lastUpdated,
  sections,
}: LegalDocumentPageProps) {
  const titleParts = title.split(" ");
  const accentWord = titleParts.pop();
  const titleLead = titleParts.join(" ");

  return (
    <main className="bg-[#faf9f7] text-[#171512]">
      <section className="home-hero relative z-30 w-full overflow-x-hidden pb-8 sm:pb-12 lg:pb-14">
        <DarkHeroShell>
          <div className={`relative z-10 flex w-full flex-col items-center justify-center px-5 pb-16 pt-28 text-center sm:px-8 sm:pb-20 sm:pt-36 lg:px-12 ${HOME_HERO_CONTENT_HEIGHT}`}>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-7 bg-[#D4AF37]" />
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#D4AF37]">{eyebrow}</p>
              <span className="h-px w-7 bg-[#D4AF37]" />
            </div>

            <h1 className="max-w-[14ch] text-[2.8rem] font-black leading-[1.04] tracking-[-2px] text-white sm:text-6xl lg:text-[4.8rem]">
              {titleLead} <em className="not-italic text-[#D4AF37]">{accentWord}</em>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/50 sm:text-base">{description}</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
              Last updated: {lastUpdated}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={`#${sections[0]?.id ?? "document"}`}
                className="shimmer-btn relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#D4AF37] px-8 py-3.5 text-sm font-bold text-[#0A0A0A] shadow-[0_20px_45px_rgba(212,175,55,0.3)]"
              >
                Read the policy
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black shadow-md transition-all hover:bg-white/90"
              >
                Contact our team
              </Link>
            </div>
          </div>
        </DarkHeroShell>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-3xl border border-[#e8e1d8] bg-white p-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#B8860B]">On this page</p>
              <nav className="mt-5" aria-label={`${title} sections`}>
                <ol className="space-y-3">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <Link
                        href={`#${section.id}`}
                        className="group flex gap-3 text-sm leading-6 text-[#6b6560] transition-colors hover:text-[#B8860B]"
                      >
                        <span className="font-bold text-[#D4AF37]">{String(index + 1).padStart(2, "0")}</span>
                        <span>{section.title}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          <article className="min-w-0 rounded-[28px] border border-[#e8e1d8] bg-white px-6 py-3 sm:px-10 lg:px-14">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-32 border-b border-[#eee8e0] py-9 last:border-b-0 sm:py-11"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 text-xs font-black tracking-wider text-[#D4AF37]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{section.title}</h2>
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph} className="mt-5 text-[15px] leading-7 text-[#665f58] sm:text-base sm:leading-8">
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets && (
                      <ul className="mt-5 space-y-3 text-[15px] leading-7 text-[#665f58] sm:text-base">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </article>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[28px] bg-[#11100e] px-7 py-9 text-white sm:px-10 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#D4AF37]">Need clarification?</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Our team is ready to help.</h2>
          </div>
          <Link
            href="/contact-us"
            className="inline-flex rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-bold text-[#0A0A0A] transition-colors hover:bg-[#B8860B]"
          >
            Contact Asia Tours
          </Link>
        </div>
      </section>
    </main>
  );
}