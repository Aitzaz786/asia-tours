import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/Components/gold/BlogSections";
import { Closing } from "@/Components/gold/Sections";
import { getPageSeo, buildMetadata } from "@/lib/seo";
import { getPublishedBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("blog");
  return buildMetadata(seo, "/blog", {
    title: "Travel Journal & Car Rental Guides | Asia Tours Pakistan",
    description: "Explore practical travel advice, vehicle guides and journey inspiration from Asia Tours Pakistan.",
  });
}

export default async function BlogPage() {
  const posts = await getPublishedBlogs();
  return <main id="main">
    <section className="blog-hero">
      <div className="wrap blog-hero-grid"><div><p className="eyebrow">THE ASIA TOURS JOURNAL</p><h1>Stories for the road.<br/><em>Ideas for the journey.</em></h1><p className="lead">Practical travel advice, thoughtful vehicle guides and inspiration for seeing Pakistan at your own pace.</p></div><div className="blog-hero-note"><span>JOURNAL / 01</span><p>Make every mile part of the experience.</p><Link href="/services">Explore our services ↗</Link></div></div>
    </section>
    <section className="section wrap blog-index">
      {posts.length > 0 ? <div className="blog-grid blog-index-grid">{posts.map(post=><BlogCard post={post} key={post.id}/>)}</div> : <div className="blog-empty-state">
        <div className="blog-empty-copy"><p className="eyebrow">PUBLISHING SOON</p><h3>New stories are on the way.</h3><p>Travel ideas, vehicle guides and useful notes for journeys across Pakistan will appear here soon.</p><div className="blog-empty-actions"><Link className="btn goldbtn" href="/services">Explore our services <span>↗</span></Link><Link className="textlink dark" href="/contact-us">Plan a journey <span>↗</span></Link></div></div>
      </div>}
    </section>
    <Closing />
  </main>;
}
