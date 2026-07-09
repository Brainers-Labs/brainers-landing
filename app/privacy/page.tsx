"use client";

import { Navbar } from "@/components/chrome/Navbar";
import { UpdatedFooter } from "@/components/sections/UpdatedFooter";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-white/50">
              Last updated: July 7, 2026
            </p>
          </div>

          {/* Content */}
          <div className="mt-10 space-y-8 text-sm leading-relaxed text-white/70">
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">1. Introduction</h2>
              <p>
                Brainers Labs (“we,” “us,” or “our”) is committed to protecting the privacy of our clients and users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use BrainersOS, our website, and associated applications.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">2. Data We Process</h2>
              <p>
                As an enterprise AI operating system, BrainersOS processes internal company data (including documents, emails, chat history, and policies) solely on behalf of our enterprise customers. We act as a Data Processor under applicable regulations (such as GDPR and HIPAA), and our processing is strictly governed by our Customer Data Processing Agreement (DPA).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">3. Data Security & Isolation</h2>
              <p>
                We implement bank-grade encryption in transit (TLS 1.3) and at rest (AES-256). All customer data is stored in isolated multi-tenant structures. Your company&apos;s knowledge graph and brain are strictly yours and are never shared or used to train public models.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">4. Your Rights</h2>
              <p>
                Depending on your jurisdiction, you may have rights to access, rectify, or erase personal data processed in our systems. Since we process data on behalf of our corporate clients, individual requests should be directed to your organization&apos;s IT administrator first.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">5. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@brainerslabs.com" className="text-neon hover:underline">
                  privacy@brainerslabs.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <UpdatedFooter />
    </SmoothScroll>
  );
}
