import { useRef, useState } from "react";
import { FiArrowUpRight, FiCheck, FiCopy, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import { useReveal } from "../lib/motion";
import { profile, socials } from "../data/site";

const env = import.meta.env;
const emailjsReady = Boolean(
  env.VITE_APP_EMAILJS_SERVICE_ID && env.VITE_APP_EMAILJS_TEMPLATE_ID && env.VITE_APP_EMAILJS_PUBLIC_KEY
);

const field =
  "w-full rounded-md border border-line-strong bg-transparent px-4 py-3.5 text-fg placeholder:text-dim transition-colors focus:border-lime focus:outline-none";

/**
 * Sends through EmailJS when it's configured; otherwise opens the visitor's
 * mail client with the message pre-filled. Nothing beyond what the visitor
 * types is collected.
 */
const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!emailjsReady) {
      const subject = encodeURIComponent(`Hello from ${form.name || "your website"}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }
    setStatus("sending");
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        env.VITE_APP_EMAILJS_SERVICE_ID,
        env.VITE_APP_EMAILJS_TEMPLATE_ID,
        { from_name: form.name.trim(), from_email: form.email.trim(), message: form.message.trim() },
        { publicKey: env.VITE_APP_EMAILJS_PUBLIC_KEY }
      );
      setForm({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4" aria-describedby="form-status">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Name</span>
          <input name="name" value={form.name} onChange={update} required autoComplete="name" className={field} placeholder="Ada Lovelace" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={update}
            required
            autoComplete="email"
            className={field}
            placeholder="ada@company.com"
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm text-muted">Message</span>
        <textarea
          name="message"
          value={form.message}
          onChange={update}
          required
          rows={5}
          className={`${field} resize-y`}
          placeholder="What are you building?"
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send message"} <FiArrowUpRight aria-hidden="true" />
        </button>
        <p id="form-status" role="status" className="text-sm">
          {status === "sent" && <span className="text-lime">Got it — I’ll reply soon.</span>}
          {status === "error" && (
            <span className="text-[#ff8a7a]">
              That didn’t send. Email me directly at {profile.email}.
            </span>
          )}
        </p>
      </div>
    </form>
  );
};

const Contact = () => {
  const scope = useRef(null);
  const [copied, setCopied] = useState(false);
  useReveal(scope);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" ref={scope} aria-labelledby="contact-title" className="section border-t border-line">
      <div className="shell">
        <p data-reveal className="eyebrow">
          Contact
        </p>
        <h2 id="contact-title" data-reveal className="display mt-4 max-w-[16ch] text-[clamp(2.4rem,6vw,5rem)]">
          Building something <span className="serif-accent text-lime">interesting?</span>
        </h2>
        <p data-reveal className="mt-6 max-w-[36rem] text-lg leading-relaxed text-muted">
          I’m open to software engineering roles — in Bengaluru or abroad — and always up for talking about products,
          workflow systems or a weird idea you can’t stop thinking about.
        </p>

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-8 lg:col-span-5">
            <div data-reveal>
              <p className="text-sm text-muted">Email is fastest</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="link-underline break-all text-2xl font-medium tracking-tight"
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copy}
                  className="grid size-11 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-fg hover:text-fg"
                  aria-label={copied ? "Email address copied" : "Copy email address"}
                >
                  {copied ? <FiCheck className="text-lime" aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
                </button>
              </div>
            </div>

            <div data-reveal className="flex flex-wrap gap-3">
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <FiLinkedin aria-hidden="true" /> LinkedIn
              </a>
              <a href={socials.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <FiGithub aria-hidden="true" /> GitHub
              </a>
              <a href={profile.resume} target="_blank" rel="noopener" className="btn btn-ghost">
                Résumé (PDF) <FiArrowUpRight aria-hidden="true" />
              </a>
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (personal)"
                className="grid size-11 place-items-center self-center rounded-full text-muted transition-colors hover:bg-fg/10 hover:text-fg"
              >
                <FiInstagram aria-hidden="true" />
              </a>
            </div>
          </div>

          <div data-reveal className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
