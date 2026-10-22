import Link from "next/link";
import { formatBlogDate, getPublishedBlogs, readingTime, type BlogPost } from "@/lib/blogs";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return <article className={`blog-card ${featured ? "is-featured" : ""}`}>
    <Link className="blog-card-image" href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
      <img src={post.cover_image || "/gold/assets/hero-neutral-2.webp"} alt={post.cover_alt || post.title} width="1200" height="720" loading="lazy" />
      <span>{post.category}</span>
    </Link>
    <div className="blog-card-copy">
      <p className="blog-meta">{formatBlogDate(post.published_at)} <i/> {readingTime(post.content)} min read</p>
      <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
      <p>{post.excerpt}</p>
      <Link className="blog-read" href={`/blog/${post.slug}`}>Read the journal <span>↗</span></Link>
    </div>
  </article>;
}

export async function HomeBlogPreview() {
  const posts = await getPublishedBlogs();
  const post = posts[0];
  if (!post) return null;
  return <section className="blog-preview section">
    <div className="wrap blog-preview-layout">
      <div className="blog-preview-intro"><p className="eyebrow">FROM THE ASIA TOURS JOURNAL</p><h2>Ideas for the road.<br/><span>Details for the journey.</span></h2><p>Travel notes, practical advice and considered ways to make every journey feel better.</p><div className="blog-preview-footer"><span>TRAVEL NOTES · VEHICLE GUIDES · DESTINATION IDEAS</span><Link className="textlink dark" href="/blog">Explore all articles <span>↗</span></Link></div></div>
      <div className="home-blog-card-wrap"><BlogCard post={post} /></div>
    </div>
  </section>;
}
