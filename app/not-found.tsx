import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";
export default function NotFound() { return <section className="not-found container"><span className="not-found-symbol"><Terminal size={34}/></span><p>ERROR 404 / PAGE NOT FOUND</p><h1>Looks like a<br/><em>broken link.</em></h1><span>That page doesn&apos;t exist, or it may have moved.</span><Link className="button button-dark" href="/"><ArrowLeft size={16}/> Back to homepage</Link></section>; }
