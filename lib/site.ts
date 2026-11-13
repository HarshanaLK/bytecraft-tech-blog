export const siteConfig = {
  name: "bytecraft",
  tagline: "Build smarter. Stay curious.",
  description:
    "Original tech news, practical programming tutorials and clear explanations for modern developers. Discover AI, cybersecurity, cloud and web development.",
  // CHANGE THIS BEFORE DEPLOYMENT. It appears on About, Contact, and policy pages.
  contactEmail: "hello@example.com",
  // Change author/organization details to your real information before publishing.
  authorName: "Bytecraft Editorial",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example.com",
  xUrl: "https://github.com",
};

export const categories = [
  { slug: "web-development", name: "Web Development", short: "Frontend & frameworks", tone: "blue" },
  { slug: "programming", name: "Programming", short: "Code & fundamentals", tone: "purple" },
  { slug: "devops-cloud", name: "DevOps & Cloud", short: "Deploy with confidence", tone: "green" },
  { slug: "ai-tools", name: "AI & Tools", short: "Tools that move you forward", tone: "orange" },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export function categoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
