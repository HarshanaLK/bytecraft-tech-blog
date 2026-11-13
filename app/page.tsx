import Link from "next/link";
import { Suspense } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, BookOpenText, BrainCircuit, Code2, Command, GitBranch, Layers, MoveUpRight, Sparkles } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { BlogExplorer } from "@/components/blog-explorer";
import { NewsExplorer } from "@/components/news-explorer";
import { CtaBanner } from "@/components/cta-banner";
import { getAllPosts } from "@/lib/posts";
import { getAllNews } from "@/lib/news";
import { categories } from "@/lib/site";

const categoryIcons = [<Layers key="l" size={25}/>, <Code2 key="c" size={25}/>, <GitBranch key="g" size={25}/>, <BrainCircuit key="b" size={25}/>];

export default function HomePage() {
  const posts = getAllPosts();
  const newsItems = getAllNews();
  const featured = posts.filter((post) => post.featured).slice(0, 3);
  const topFeatured = featured[0] || posts[0];
  return <>
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow"><span className="pulse-dot"/> IDEAS FOR PEOPLE WHO BUILD <span className="eyebrow-line"/></div>
          <h1>Make sense<br/>of <span className="hero-highlight">tech<span className="hero-highlight-asterisk">✳</span></span><br/>Build what&apos;s<br/><em>next.</em></h1>
          <p>No jargon marathons. Just thoughtful tutorials, useful ideas, and practical guides for the curious developer.</p>
          <div className="hero-actions"><Link href="/blog" className="button button-dark">Explore articles <ArrowUpRight size={18}/></Link><Link href="/about" className="text-link">Our story <ArrowRight size={17}/></Link></div>
          <div className="hero-social-proof"><div className="proof-avatars" aria-hidden="true"><span><Command size={18}/></span><span><Code2 size={18}/></span><span><Sparkles size={17}/></span></div><span>Made for developers at every level</span></div>
        </div>
        <div className="hero-visual" aria-label="Illustration of a code editor and developer notes">
          <div className="visual-decor visual-decor-top" aria-hidden="true"><span>01 / THINK</span><span>02 / CODE</span><span>03 / SHIP</span></div>
          <div className="terminal-card">
            <div className="terminal-bar"><div className="terminal-dots"><i/><i/><i/></div><span>hello-world.tsx</span><span className="terminal-plus">+</span></div>
            <div className="terminal-body"><p><span className="line-num">01</span><span className="syntax-purple">const</span> <span className="syntax-blue">developer</span> = <span className="syntax-yellow">&#123;</span></p><p><span className="line-num">02</span>  curiosity: <span className="syntax-green">true</span>,</p><p><span className="line-num">03</span>  ideas: <span className="syntax-green">Infinity</span>,</p><p><span className="line-num">04</span>  mindset: <span className="syntax-orange">&quot;keep learning&quot;</span>,</p><p><span className="line-num">05</span><span className="syntax-yellow">&#125;</span>;</p><p className="terminal-spacer"><span className="line-num">06</span></p><p><span className="line-num">07</span><span className="syntax-purple">export default</span> <span className="syntax-blue">developer</span>;</p></div>
            <div className="terminal-status"><span><span className="status-indicator"/> All systems curious</span><span>UTF-8 &nbsp; TSX</span></div>
          </div>
          <div className="float-note"><span className="note-icon"><BookOpenText size={20}/></span><div><strong>Learn by doing</strong><span>One article at a time</span></div><MoveUpRight size={15}/></div>
          <div className="orbit-sticker" aria-hidden="true"><span>STAY<br/>CURIOUS</span><Sparkles size={19}/></div>
          <div className="visual-grid-pattern" aria-hidden="true"/>
          <div className="visual-caption">THE BUILDERS JOURNAL <span>—</span> EST. 2026</div>
        </div>
      </div>
      <div className="container hero-bottom"><span>YOUR WEEKLY DOSE OF DEV CLARITY</span><span>SCROLL TO EXPLORE <ArrowDownRight size={16}/></span></div>
    </section>

    <section className="featured-section section-pad">
      <div className="container">
        <div className="section-topline"><span className="section-kicker"><span className="small-symbol">✳</span> THE EDITOR&apos;S PICKS</span><Link className="inline-link" href="/blog">View all articles <ArrowUpRight size={16}/></Link></div>
        <div className="section-heading-row"><h2>Worth a <em>read.</em></h2><p>A few good places to start. Selected guides that make complicated things feel simple.</p></div>
        {topFeatured && <div className="featured-grid"><ArticleCard post={topFeatured} variant="hero"/><div className="featured-side">{featured.slice(1, 3).map(post => <ArticleCard key={post.slug} post={post} variant="compact" />)}</div></div>}
      </div>
    </section>

    <section className="topics-section section-pad">
      <div className="container">
        <div className="section-topline"><span className="section-kicker"><span className="small-symbol">✳</span> FIND YOUR LANE</span><span className="muted-index">/ 04 TOPICS</span></div>
        <div className="section-heading-row"><h2>Go down a <em>rabbit hole.</em></h2><p>From your first line of code to your next big launch, find something worth exploring.</p></div>
        <div className="topic-grid">{categories.map((cat, index) => <Link href={`/blog?category=${cat.slug}`} className={`topic-card topic-${cat.tone}`} key={cat.slug}><div className="topic-top"><span className="topic-index">0{index + 1}</span><span className="topic-icon">{categoryIcons[index]}</span></div><div><h3>{cat.name}</h3><p>{cat.short}</p></div><span className="topic-arrow"><ArrowUpRight size={19}/></span></Link>)}</div>
      </div>
    </section>

    <section className="news-home-section section-pad">
      <div className="container">
        <div className="section-topline"><span className="section-kicker"><span className="small-symbol">✳</span> TECH NEWS · BY US</span><Link className="inline-link" href="/news">More tech news <ArrowUpRight size={16}/></Link></div>
        <div className="section-heading-row"><h2>In the <em>loop.</em></h2><p>Original updates on AI, software, security and the cloud — written and published by our editor.</p></div>
        <NewsExplorer items={newsItems} preview />
        <p className="news-home-disclaimer">We publish our own tech stories and <Link href="/blog">technical tutorials</Link> separately. No automatic news feeds.</p>
      </div>
    </section>

    <section className="latest-section section-pad">
      <div className="container">
        <div className="section-topline"><span className="section-kicker"><span className="small-symbol">✳</span> THE READING LIST</span><span className="muted-index">/ FRESH IDEAS</span></div>
        <div className="section-heading-row"><h2>Latest &amp; <em>greatest.</em></h2><p>Clear explanations, useful code, and practical approaches — all in one place.</p></div>
        <Suspense fallback={<p>Loading articles...</p>}><BlogExplorer posts={posts}/></Suspense>
      </div>
    </section>
    <CtaBanner/>
  </>;
}
