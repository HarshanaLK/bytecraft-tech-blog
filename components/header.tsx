"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "@/components/brand";

const links = [
  { href: "/blog", label: "All articles" },
  { href: "/news", label: "Tech news" },
  { href: "/blog?category=web-development", label: "Web dev" },
  { href: "/blog?category=programming", label: "Programming" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav aria-label="Main navigation" className="nav-desktop">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
        <Link href="/blog" className="header-cta">Explore blog <ArrowUpRight size={16} aria-hidden="true" /></Link>
        <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} aria-controls="mobile-nav">
          {open ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
          <Link href="/contact" onClick={() => setOpen(false)}>Contact <ArrowUpRight size={16}/></Link>
        </nav>
      )}
    </header>
  );
}
