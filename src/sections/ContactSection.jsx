import { useState } from "react";

function ContactSection({ onBackHome }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailAddress = "support@wakepoint.app";
    const subject = encodeURIComponent(formData.subject || "WakePoint contact form");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );

    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#FAF9F7] via-white to-[#F6F4EE]" />
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[#84D716]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-[#ADCE7D]/15 blur-3xl" />

      {/* Flex container for centering - changed to min-h-screen */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#84D716]">
              Contact Us
            </p>
            <h1 className="max-w-xl text-4xl font-semibold tracking-[-0.04em] text-[#2A3435] sm:text-5xl lg:text-6xl">
              Send us a message and we&apos;ll open your email app.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#2A3435]/70">
              Use the form to draft an email to the WakePoint team. If you prefer,
              you can also reach us directly at support@wakepoint.app.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:support@wakepoint.app"
                className="rounded-full bg-[#84D716] px-6 py-3 text-sm font-semibold text-[#132010] transition-transform hover:-translate-y-0.5"
              >
                Email Us Now
              </a>
              <button
                type="button"
                onClick={onBackHome}
                className="rounded-full border border-[#2A3435]/15 bg-white px-6 py-3 text-sm font-semibold text-[#2A3435] transition-transform hover:-translate-y-0.5"
              >
                Back to Home
              </button>
            </div>
          </div>

          <div className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.12)] backdrop-blur-md sm:p-8">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-[#2A3435]">
                  Name
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="rounded-2xl border border-[#2A3435]/10 bg-[#FAF9F7] px-4 py-3 outline-none transition focus:border-[#84D716]"
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-[#2A3435]">
                  Email
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="rounded-2xl border border-[#2A3435]/10 bg-[#FAF9F7] px-4 py-3 outline-none transition focus:border-[#84D716]"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-medium text-[#2A3435]">
                Subject
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="rounded-2xl border border-[#2A3435]/10 bg-[#FAF9F7] px-4 py-3 outline-none transition focus:border-[#84D716]"
                  placeholder="How can we help?"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-[#2A3435]">
                Message
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="rounded-3xl border border-[#2A3435]/10 bg-[#FAF9F7] px-4 py-3 outline-none transition focus:border-[#84D716]"
                  placeholder="Tell us what you need help with..."
                />
              </label>

              <button
                type="submit"
                className="mt-2 rounded-full bg-[#2A3435] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#84D716] hover:text-[#132010]"
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;