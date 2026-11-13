import { BrainCircuit, Braces, Cloud, Code2, Cpu, Database, GitBranch, Layers3, Rocket, Terminal, type LucideIcon } from "lucide-react";
import type { CategorySlug } from "@/lib/site";

const icons: Record<string, LucideIcon> = {
  "nextjs-blog-guide": Layers3,
  "typescript-for-javascript-developers": Braces,
  "laravel-mysql-setup": Database,
  "docker-for-developers": Cloud,
  "using-ai-coding-assistants": BrainCircuit,
  "rest-api-testing-with-postman": Terminal,
  "github-actions-ci-guide": GitBranch,
  "react-server-client-components": Code2,
  "deploy-nextjs-vercel": Rocket,
  "tailwind-css-v4-guide": Cpu,
  "git-branching-pull-requests": GitBranch,
  "web-performance-checklist": Rocket,
};

export function CoverArt({ category, slug, className = "" }: { category: CategorySlug; slug: string; className?: string }) {
  const Icon = icons[slug] || Code2;
  return (
    <div className={`cover-art cover-${category} ${className}`} aria-hidden="true">
      <div className="cover-grid" />
      <span className="cover-corner cover-corner-one" />
      <span className="cover-corner cover-corner-two" />
      <div className="cover-icon-ring"><Icon className="cover-icon" strokeWidth={1.45}/></div>
      <span className="cover-footnote">BYTECRAFT / FIELD NOTES</span>
      <span className="cover-spark">✳</span>
    </div>
  );
}
