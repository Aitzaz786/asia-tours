import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Closing } from "@/Components/gold/Sections";
import { formatBlogDate, getBlogBySlug, getPublishedBlogs, readingTime } from "@/lib/blogs";

const SITE_URL = "https://asiatourspk.com";
type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return {};
  const canonical = post.canonical_url || `${SITE_URL}/blog/${post.slug}`;
  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt;
  const image = post.og_image || post.cover_image;
  return { title, description, robots: post.no_index ? "noindex,nofollow" : "index,follow", alternates: { canonical }, openGraph: { title: post.og_title || title, description: post.og_description || description, url: canonical, type: "article", publishedTime: post.published_at || undefined, authors: [post.author], images: image ? [{ url: image, alt: post.cover_alt || post.title }] : undefined }, twitter: { card: "summary_large_image", title: post.og_title || title, description: post.og_description || description, images: image ? [image] : undefined } };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();
  const related = (await getPublishedBlogs()).filter(item=>item.slug!==post.slug).slice(0,3);
  const canonical = post.canonical_url || `${SITE_URL}/blog/${post.slug}`;
  const heroImage = post.cover_image || "/gold/assets/hero-neutral-2.webp";
  const schema = { "@context":"https://schema.org", "@type":"BlogPosting", headline:post.title, description:post.excerpt, image:post.og_image||post.cover_image, datePublished:post.published_at, dateModified:post.updated_at, author:{"@type":"Organization",name:post.author}, publisher:{"@type":"Organization",name:"Asia Tours Pakistan",url:SITE_URL}, mainEntityOfPage:canonical };
  return <main id="main">
    <article className="blog-article">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>
      <header className="blog-article-hero" style={{backgroundImage:`url("${heroImage}")`}} aria-label={post.cover_alt||post.title}>
        <div className="blog-article-shade"/>
        <div className="wrap blog-article-hero-inner">
          <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/blog">Journal</Link><span>/</span><span aria-current="page">{post.category}</span></div>
          <div className="blog-article-heading"><p className="eyebrow">{post.category.toUpperCase()}</p><h1>{post.title}</h1><p className="blog-deck">{post.excerpt}</p><div className="blog-byline"><span>{post.author}</span><i/><span>{formatBlogDate(post.published_at)}</span><i/><span>{readingTime(post.content)} min read</span></div></div>
          <div className="blog-hero-marker"><span>ASIA TOURS JOURNAL</span><b>Thoughtful notes<br/>for better journeys.</b></div>
        </div>
      </header>
      <div className="wrap blog-body-layout"><div className="blog-body"><div className="blog-article-label"><span>{post.category}</span><span>{readingTime(post.content)} minute read</span></div>{post.content.split(/\n\s*\n/).filter(Boolean).map((paragraph,index)=><p className={index===0?"blog-lead-paragraph":undefined} key={index}>{paragraph}</p>)}</div><aside className="blog-aside"><span>PLAN YOUR OWN JOURNEY</span><h2>A route shaped around you.</h2><p>Tell us your date, pickup point and the people travelling. We’ll help you consider the right vehicle.</p><Link className="btn goldbtn" href="/contact-us">Plan your journey <b>↗</b></Link></aside></div>
      {related.length>0&&<section className="wrap blog-related"><p className="eyebrow">CONTINUE READING</p><div className="blog-grid">{related.map(item=><article key={item.id}><Link href={`/blog/${item.slug}`}><img src={item.cover_image} alt={item.cover_alt||item.title}/><h3>{item.title}</h3><span>Read article ↗</span></Link></article>)}</div></section>}
    </article>
    <Closing />
  </main>;
}
