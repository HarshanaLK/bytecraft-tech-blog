"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Link2, Share2 } from "lucide-react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(100, (window.scrollY / height) * 100) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <div className="reading-progress" style={{ width: `${progress}%` }} aria-hidden="true"/>;
}

export function ShareActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch { window.prompt("Copy this article URL:", window.location.href); }
  }
  async function nativeShare() {
    if (navigator.share) {
      try { await navigator.share({ title, url: window.location.href }); }
      catch { /* cancelled by user */ }
    } else { await copyLink(); }
  }
  return <div className="share-actions"><span>Share this article</span><button type="button" onClick={copyLink} aria-label={copied ? "Link copied" : "Copy article link"}>{copied ? <Check size={17}/> : <Link2 size={17}/>}<span>{copied ? "Copied!" : "Copy link"}</span></button><button type="button" onClick={nativeShare} aria-label="Share this article"><Share2 size={17}/><span>Share</span></button></div>;
}

export function CodeCopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return <button type="button" className="copy-code-button" onClick={async () => {try { await navigator.clipboard.writeText(value); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { /* Clipboard may be unavailable in some contexts. */ }}}>{copied ? <Check size={14}/> : <Copy size={14}/>} {copied ? "Copied" : "Copy"}</button>;
}
