"use client";

import { Navbar } from "@/components/chrome/Navbar";
import { UpdatedFooter } from "@/components/sections/UpdatedFooter";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";

export default function TermsPage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="relative noise min-h-screen bg-space pt-32 pb-24 text-[#efefec]">
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8">
          {/* Header */}
          <div className="border-b border-white/10 pb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-neon">
              Legal Compliance
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-sm text-white/50">
              Last updated: July 7, 2026
            </p>
          </div>

          {/* Content */}
          <div className="mt-10 space-y-8 text-sm leading-relaxed text-white/70">
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">1. Agreement to Terms</h2>
              <p>
                By accessing or using BrainersOS, you agree to be bound by these Terms of Service and all terms incorporated by reference. If you do not agree to all of these terms, do not access or use our services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">2. Use of Services</h2>
              <p>
                BrainersOS provides an enterprise AI operating system designed to index, structure, and query corporate knowledge bases. You are responsible for ensuring that all users authorized by you comply with these terms, and you retain all rights and ownership over your company's data.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">3. Acceptable Use Policy</h2>
              <p>
                You agree not to use BrainersOS to perform illegal activities, upload malware, infringe on intellectual property, or violate data protection regulations. We reserve the right to suspend or terminate accounts that breach this policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">4. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Brainers Labs shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">5. Governing Law</h2>
              <p>
                These Terms of Service and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of the State of Delaware, without giving effect to any choice of law rules.
              </p>
            </section>
          </div>
        </div>
      </main>
      <UpdatedFooter />
    </SmoothScroll>
  );
}
