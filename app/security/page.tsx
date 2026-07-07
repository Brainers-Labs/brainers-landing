"use client";

import { Navbar } from "@/components/chrome/Navbar";
import { UpdatedFooter } from "@/components/sections/UpdatedFooter";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { SecurityCompliance } from "@/components/sections/SecurityCompliance";
import { Security } from "@/components/sections/Security";

export default function SecurityPage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="relative noise min-h-screen bg-space pt-24 text-[#efefec]">
        <Security />
        <SecurityCompliance />
      </main>
      <UpdatedFooter />
    </SmoothScroll>
  );
}
