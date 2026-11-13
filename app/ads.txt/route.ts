// This is intentionally empty until your REAL AdSense publisher ID is set.
// Google requires a valid publisher ID, not sample placeholder IDs.
export const dynamic = "force-static";

export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
  if (!/^ca-pub-\d+$/.test(client) || process.env.NEXT_PUBLIC_ENABLE_ADSENSE !== "true") {
    return new Response("", { headers: { "Content-Type": "text/plain" } });
  }
  const publisher = client.slice(3);
  return new Response(`google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
