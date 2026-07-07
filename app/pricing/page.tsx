"use client";

import { Navbar } from "@/components/chrome/Navbar";
import { UpdatedFooter } from "@/components/sections/UpdatedFooter";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { PricingPreview } from "@/components/sections/PricingPreview";

export default function PricingPage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="relative noise min-h-screen bg-space pt-24 text-[#efefec]">
        <div className="relative mx-auto max-w-5xl px-6 pt-16 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-neon">
            Billing Plans
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Flexible Plans for Any Scale
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/50">
            From early exploratory pilots to bank-grade global enterprise networks, choose the right speed and security tier for your company.
          </p>
        </div>
        <PricingPreview />
      </main>
      <UpdatedFooter />
    </SmoothScroll>
  );
}
