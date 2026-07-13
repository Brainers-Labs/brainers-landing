"use client";

import { Navbar } from "@/components/chrome/Navbar";
import { UpdatedFooter } from "@/components/sections/UpdatedFooter";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyDifferent } from "@/components/sections/WhyDifferent";

export default function ProductPage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="relative noise min-h-screen bg-space pt-24 text-[#efefec]">
        {/* Core Product Intro Header */}
        <div className="relative mx-auto max-w-5xl px-6 pt-16 pb-8 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-neon">
            Synax Platform
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            One Brain for Your Company
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/50">
            Synax transforms disconnected company data into a unified, secure, and interactive knowledge framework that thinks with you.
          </p>
        </div>

        {/* Section renders */}
        <HowItWorks />
        <WhyDifferent />
      </main>
      <UpdatedFooter />
    </SmoothScroll>
  );
}
