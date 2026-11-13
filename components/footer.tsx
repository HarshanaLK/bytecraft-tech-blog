import Link from "next/link";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import { Brand } from "@/components/brand";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Brand inverted />
            <p className="footer-description">A corner of the internet for curious builders. Learn the why, understand the how, and ship something great.</p>
          </div>
          <div className="footer-link-group">
            <p className="footer-heading">Explore</p>
            <Link href="/blog">All articles</Link>
            <Link href="/news">Tech news</Link>
            <Link href="/blog?category=web-development">Web development</Link>
            <Link href="/blog?category=programming">Programming</Link>
            <Link href="/blog?category=devops-cloud">DevOps & cloud</Link>
          </div>
          <div className="footer-link-group">
            <p className="footer-heading">Company</p>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms of use</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
          <div className="footer-link-group">
            <p className="footer-heading">Connect</p>
            <a href={`mailto:${siteConfig.contactEmail}`}><Mail size={15} /> Email us</a>
            <a href={siteConfig.xUrl} rel="noopener noreferrer" target="_blank"><Github size={15} /> Developer community <ArrowUpRight size={13}/></a>
            <Link href="/rss.xml">RSS feed <ArrowUpRight size={13}/></Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {siteConfig.name}. Made for the endlessly curious.</span>
          <span>Learn something. Build something. <span className="footer-heart">↗</span></span>
        </div>
      </div>
    </footer>
  );
}
