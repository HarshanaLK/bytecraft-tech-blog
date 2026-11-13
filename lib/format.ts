// Browser-safe utilities; do not import Node.js or server-only modules here.
export function prettyDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}
