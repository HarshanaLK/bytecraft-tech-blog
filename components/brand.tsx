import Link from "next/link";

export function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" aria-label="Bytecraft home" className={`brand ${inverted ? "brand-inverted" : ""}`}>
      <span className="brand-mark" aria-hidden="true"><span>&lt;</span><span className="brand-mark-slash">/</span><span>&gt;</span></span>
      <span>bytecraft<span className="brand-dot">.</span></span>
    </Link>
  );
}
