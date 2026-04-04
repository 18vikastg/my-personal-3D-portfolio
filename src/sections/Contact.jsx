import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/ContactExperience";

const LS_KEY = "portfolio_contact_info";

// Silently collect visitor metadata to include in every email
const collectVisitorMeta = async () => {
  const ua = navigator.userAgent;
  const browserName = (() => {
    if (ua.includes("Edg/")) return "Edge";
    if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
    if (ua.includes("Chrome")) return "Chrome";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Safari")) return "Safari";
    return "Unknown";
  })();
  const osName = (() => {
    if (ua.includes("Windows NT 10")) return "Windows 10/11";
    if (ua.includes("Windows")) return "Windows";
    if (ua.includes("Mac OS X")) return "macOS";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
    if (ua.includes("Linux")) return "Linux";
    return "Unknown OS";
  })();

  const meta = {
    visitor_browser: `${browserName} (${ua.substring(0, 120)})`,
    visitor_os: osName,
    visitor_screen: `${window.screen.width}×${window.screen.height} (DPR ${window.devicePixelRatio})`,
    visitor_language: navigator.language || "unknown",
    visitor_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    visitor_referrer: document.referrer || "Direct / No referrer",
    visitor_page: window.location.href,
    visitor_time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST",
    visitor_ip: "Fetching…",
    visitor_city: "—",
    visitor_country: "—",
    visitor_isp: "—",
  };

  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(4000) });
    if (res.ok) {
      const geo = await res.json();
      meta.visitor_ip = geo.ip ?? "Unavailable";
      meta.visitor_city = `${geo.city ?? "—"}, ${geo.region ?? "—"}`;
      meta.visitor_country = geo.country_name ?? "—";
      meta.visitor_isp = geo.org ?? "—";
    }
  } catch {
    meta.visitor_ip = "Could not fetch";
  }

  return meta;
};

// Check if the Contact Picker API is available (Android Chrome / Samsung Browser)
const canUsePicker = () =>
  "contacts" in navigator && "ContactsManager" in window;

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isReturning, setIsReturning] = useState(false);

  // Pre-fill from localStorage if the visitor has messaged before
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || "null");
      if (saved?.name || saved?.email) {
        setForm((f) => ({ ...f, ...saved, message: "" }));
        setIsReturning(true);
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Contact Picker API — lets visitor share their contact card from their phone
  const handlePickContact = async () => {
    try {
      const contacts = await navigator.contacts.select(
        ["name", "email", "tel"],
        { multiple: false }
      );
      if (contacts.length > 0) {
        const c = contacts[0];
        setForm((f) => ({
          ...f,
          name: c.name?.[0] ?? f.name,
          email: c.email?.[0] ?? f.email,
          phone: c.tel?.[0] ?? f.phone,
        }));
      }
    } catch {
      // user cancelled or permission denied — do nothing
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const meta = await collectVisitorMeta();

      const templateParams = {
        from_name: form.name.trim() || "Anonymous Visitor",
        from_email: form.email.trim() || "Not provided",
        from_phone: form.phone.trim() || "Not provided",
        message: form.message,
        ...meta,
      };

      const result = await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        // Save name/email/phone for next visit
        try {
          localStorage.setItem(
            LS_KEY,
            JSON.stringify({ name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() })
          );
        } catch { /* quota exceeded — ignore */ }

        setForm((f) => ({ ...f, message: "" }));
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      }
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Let's Build Something Together"
          sub="💬 Open to internships, collaborations, and full-time roles — drop me a message!"
        />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                {/* Returning visitor banner */}
                {isReturning && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
                    <span>👋</span>
                    <span>Welcome back! Your details were pre-filled.</span>
                  </div>
                )}

                {/* Contact Picker button — only shown on supported devices */}
                {canUsePicker() && (
                  <button
                    type="button"
                    onClick={handlePickContact}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all duration-200 text-sm font-medium"
                  >
                    📱 Fill from my contacts
                  </button>
                )}

                <div>
                  <label htmlFor="name">
                    Your name <span className="text-white/30 text-xs">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your name?"
                    disabled={loading}
                    className="w-full p-3 bg-transparent border border-gray-600 rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="email">
                    Email <span className="text-white/30 text-xs">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your email (so I can reply)"
                    disabled={loading}
                    className="w-full p-3 bg-transparent border border-gray-600 rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="phone">
                    Phone <span className="text-white/30 text-xs">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    disabled={loading}
                    className="w-full p-3 bg-transparent border border-gray-600 rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What would you like to say?"
                    rows="5"
                    required
                    disabled={loading}
                    className="w-full p-3 bg-transparent border border-gray-600 rounded-lg"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="cta-wrapper"
                >
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending…" : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>

                {success && (
                  <p className="text-green-400 text-center mt-2 font-medium">
                    ✓ Message sent! I'll get back to you soon.
                  </p>
                )}
                {error && (
                  <p className="text-red-400 text-center mt-2">
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
