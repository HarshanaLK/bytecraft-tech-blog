import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { CoverArt } from "@/components/cover-art";
import type { Post } from "@/lib/posts";
import { prettyDate } from "@/lib/format";
import { categoryBySlug } from "@/lib/site";

export function ArticleCard({ post, variant = "default" }: { post: Post; variant?: "default" | "compact" | "hero" }) {
  return (
    <article className={`article-card card-${variant}`}>
      <Link className="card-cover-link" href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
        <CoverArt category={post.category} slug={post.slug}/>
      </Link>
      <div className="article-card-content">
        <div className="card-eyebrow"><span className="category-dot" data-category={post.category} />{categoryBySlug(post.category)?.name}<span className="eyebrow-divider">/</span>{prettyDate(post.date)}</div>
        <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
        <p>{post.description}</p>
        <div className="article-card-bottom"><span><Clock3 size={14}/> {post.readingMinutes} min read</span><Link className="circle-arrow" href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}><ArrowUpRight size={19}/></Link></div>
      </div>
    </article>
  );
}
