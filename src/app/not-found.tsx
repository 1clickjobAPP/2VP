import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-700">
        The page you’re looking for doesn’t exist. Try the{" "}
        <Link href="/areas" className="text-brand underline">
          areas we cover
        </Link>{" "}
        or head back to the{" "}
        <Link href="/" className="text-brand underline">
          home page
        </Link>
        .
      </p>
    </section>
  );
}
