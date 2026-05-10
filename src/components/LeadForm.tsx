"use client";

import { useMemo, useState } from "react";
import type { Area } from "@/data/areas";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm({ area }: { area: Area }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const renderedAt = useMemo(() => Date.now(), []);
  const defaultPostcode = area.postcodes.split(",")[0].trim();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      postcode: String(fd.get("postcode") ?? "").trim(),
      projectType: String(fd.get("projectType") ?? ""),
      budget: String(fd.get("budget") ?? ""),
      message: String(fd.get("message") ?? "").trim(),
      company: String(fd.get("company") ?? ""), // honeypot
      areaSlug: area.slug,
      source:
        typeof window !== "undefined" ? window.location.href : `/areas/${area.slug}`,
      renderedAt,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(
          data.error === "validation_failed"
            ? "Please check the form fields and try again."
            : "Something went wrong. Please try again or call us on 020 8050 8968.",
        );
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again or call 020 8050 8968.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6">
        <p className="text-lg font-semibold text-green-900">
          Thanks — we’ve got your details for {area.name}.
        </p>
        <p className="mt-1 text-green-800">
          A project manager will be in touch within one working day. In the meantime,
          you can sharpen your numbers with the calculator or call us on{" "}
          <a href="tel:+442080508968" className="font-semibold underline">
            020 8050 8968
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      noValidate
    >
      <p className="text-lg font-semibold text-slate-900">
        Request a survey in {area.name}
      </p>
      <p className="mt-1 text-sm text-slate-600">
        We’ll come back within one working day with availability and a fixed-price
        proposal route.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Your name" required>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className="input"
            placeholder="Jane Smith"
          />
        </Field>
        <Field label="Email" required>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="input"
            placeholder="jane@example.com"
          />
        </Field>
        <Field label="Phone" required>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="input"
            placeholder="07…"
          />
        </Field>
        <Field label="Postcode">
          <input
            name="postcode"
            type="text"
            autoComplete="postal-code"
            className="input"
            defaultValue={defaultPostcode}
          />
        </Field>
        <Field label="Project type" required>
          <select name="projectType" required className="input" defaultValue="">
            <option value="" disabled>
              Choose…
            </option>
            <option value="extension">House extension</option>
            <option value="loft">Loft conversion</option>
            <option value="refurbishment">Full refurbishment</option>
            <option value="kitchen-bathroom">Kitchen / bathroom</option>
            <option value="other">Something else</option>
          </select>
        </Field>
        <Field label="Approx. budget" required>
          <select name="budget" required className="input" defaultValue="">
            <option value="" disabled>
              Choose…
            </option>
            <option value="under-50k">Under £50k</option>
            <option value="50-100k">£50k – £100k</option>
            <option value="100-250k">£100k – £250k</option>
            <option value="250-500k">£250k – £500k</option>
            <option value="500k-plus">£500k+</option>
            <option value="unsure">Not sure yet</option>
          </select>
        </Field>
      </div>

      <Field label="Tell us about the project (optional)">
        <textarea
          name="message"
          rows={4}
          className="input"
          placeholder="A few sentences on scope, timing, anything we should know."
        />
      </Field>

      {/* Honeypot — visually hidden, real users won't fill it. */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {errorMsg && (
        <p className="mt-3 text-sm text-red-700" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 inline-flex items-center justify-center rounded-md bg-brand px-5 py-3 text-white font-semibold shadow-sm hover:bg-brand/90 transition disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : `Request my ${area.name} survey`}
      </button>
      <p className="mt-3 text-xs text-slate-500">
        By submitting you agree to be contacted about your project. We don’t share your
        details.
      </p>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgb(203 213 225);
          padding: 0.625rem 0.75rem;
          font-size: 0.95rem;
          color: rgb(15 23 42);
          background: white;
        }
        .input:focus {
          outline: 2px solid rgb(10 61 98);
          outline-offset: 1px;
          border-color: rgb(10 61 98);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
