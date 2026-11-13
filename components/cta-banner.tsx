import Link from "next/link";
import { ArrowUpRight, Asterisk } from "lucide-react";

export function CtaBanner() {
  return <section className="container cta-wrap"><div className="cta-banner"><div className="cta-star" aria-hidden="true"><Asterisk size={90} strokeWidth={1.1}/></div><div><p className="section-kicker kicker-on-dark">KEEP THE MOMENTUM</p><h2>Stay curious.<br/><em>Keep building.</em></h2><p>Your next breakthrough probably starts with one good question.</p></div><Link href="/blog" className="button button-accent">Browse all articles <ArrowUpRight size={17}/></Link></div></section>;
}
