import Link from "next/link";

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
  heroImage: string;
  heroAlt: string;
  heroCaption: string;
};

export default function LegalDocumentPage({
  eyebrow,
  title,
  description,
  lastUpdated,
  sections,
  heroImage,
  heroAlt,
  heroCaption,
}: LegalDocumentPageProps) {
  const titleParts = title.split(" ");
  const accentWord = titleParts.pop();
  const titleLead = titleParts.join(" ");

  return (
    <main id="main" className="legal-page">
      <section className="legal-hero" style={{ backgroundImage: `url('${heroImage}')` }}>
        <div className="wrap legal-hero-inner">
          <div className="legal-hero-copy">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{titleLead}<br /><em>{accentWord}.</em></h1>
            <p className="legal-hero-description">{description}</p>
            <div className="legal-updated"><span>LAST UPDATED</span><strong>{lastUpdated}</strong></div>
            <div className="legal-hero-actions">
              <Link className="btn goldbtn" href={`#${sections[0]?.id ?? "document"}`}>Read the document <span>↓</span></Link>
              <Link className="textlink" href="/contact-us/">Ask our team <span>↗</span></Link>
            </div>
          </div>
          <figure className="legal-hero-card">
            <img src={heroImage} alt={heroAlt} width={1920} height={1280} fetchPriority="high" />
            <figcaption>{heroCaption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="legal-body section">
        <div className="wrap legal-layout">
          <aside className="legal-toc">
            <p className="eyebrow">IN THIS DOCUMENT</p>
            <h2>Clear details.<br /><span>Easy to find.</span></h2>
            <nav aria-label={`${title} sections`}>
              <ol>
                {sections.map((section, index) => (
                  <li key={section.id}><Link href={`#${section.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.title}</Link></li>
                ))}
              </ol>
            </nav>
            <p className="legal-note">Need help understanding a section? Our team can clarify the service and booking details before you confirm.</p>
          </aside>

          <article className="legal-document">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className="legal-section">
                <span className="legal-section-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                </div>
              </section>
            ))}
          </article>
        </div>
      </section>

      <section className="closing closing-premium detailclosing">
        <div className="wrap">
          <div className="closing-copy">
            <p className="eyebrow">A LITTLE CLARITY</p>
            <h2>Still have a question?<br /><em>Let’s make it clear.</em></h2>
          </div>
          <div className="closing-action">
            <span className="closing-index">CLEAR ANSWERS · PERSONAL SUPPORT</span>
            <p>Tell us which part you would like to discuss. We’ll help you understand the relevant booking or privacy details.</p>
            <Link className="btn goldbtn" href="/contact-us/">Contact Asia Tours <span>↗</span></Link>
            <a className="closingphone" href="tel:+923004591145">Or call ＋92 300 4591145</a>
          </div>
        </div>
        <span className="closingwatermark" aria-hidden="true">ASIA</span>
      </section>
    </main>
  );
}
