"use client";

import { FormEvent, useMemo, useState } from "react";

const TO = "jbf@jbf.com";

const TOPICS = [
  "Volunteer",
  "Donation",
  "Suggest an edit",
  "Add a resource",
  "Patient or family help",
  "General question",
];

type Values = {
  name: string;
  email: string;
  phone: string;
  town: string;
  topic: string;
  message: string;
};

const initialValues: Values = {
  name: "",
  email: "",
  phone: "",
  town: "",
  topic: TOPICS[0],
  message: "",
};

function mailto(values: Values) {
  const subject = `Patient Animal Resource: ${values.topic}`;
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.phone ? `Phone: ${values.phone}` : null,
    values.town ? `Town/State: ${values.town}` : null,
    `Topic: ${values.topic}`,
    "",
    values.message,
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${TO}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [values, setValues] = useState<Values>(initialValues);
  const [submitted, setSubmitted] = useState(false);

  const mailtoHref = useMemo(() => mailto(values), [values]);

  const update = (field: keyof Values, value: string) => {
    setSubmitted(false);
    setValues((current) => ({ ...current, [field]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    window.location.href = mailtoHref;
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-edge bg-surface p-6 shadow-[var(--shadow)]"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted">
            Name
          </span>
          <input
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-xl border border-edge bg-surface px-3 py-2.5 text-sm text-ink"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted">
            Email
          </span>
          <input
            required
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-xl border border-edge bg-surface px-3 py-2.5 text-sm text-ink"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted">
            Phone
          </span>
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded-xl border border-edge bg-surface px-3 py-2.5 text-sm text-ink"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted">
            Town / State
          </span>
          <input
            value={values.town}
            onChange={(e) => update("town", e.target.value)}
            placeholder="Portland, ME"
            className="w-full rounded-xl border border-edge bg-surface px-3 py-2.5 text-sm text-ink"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted">
          Topic
        </span>
        <select
          value={values.topic}
          onChange={(e) => update("topic", e.target.value)}
          className="w-full rounded-xl border border-edge bg-surface px-3 py-2.5 text-sm font-semibold text-ink"
        >
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-4 block">
        <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-muted">
          Message
        </span>
        <textarea
          required
          rows={6}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us what resource, correction, volunteer help, donation, or question you want to send."
          className="w-full rounded-xl border border-edge bg-surface px-3 py-2.5 text-sm text-ink"
        />
      </label>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-on-accent hover:bg-accent-hover"
        >
          Email JBF
        </button>
        <a
          href={`mailto:${TO}`}
          className="text-sm font-bold text-accent-text underline-offset-2 hover:underline"
        >
          {TO}
        </a>
      </div>

      {submitted && (
        <p className="mt-4 rounded-2xl bg-sage-soft px-4 py-3 text-sm font-semibold text-sage-text">
          Your email app should open with the message addressed to {TO}.
        </p>
      )}
    </form>
  );
}
