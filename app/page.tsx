import { CustomCursor } from "@/components/chrome/CustomCursor";
import { Navbar } from "@/components/chrome/Navbar";
import { Preloader } from "@/components/chrome/Preloader";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { Integrations } from "@/components/sections/Integrations";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyDifferent } from "@/components/sections/WhyDifferent";
import { Security } from "@/components/sections/Security";
import { FAQ } from "@/components/sections/FAQ";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { UpdatedFooter } from "@/components/sections/UpdatedFooter";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="relative noise">
        {/* Global Tailwind-style background mesh grid */}
        <div className="absolute inset-0 tailwind-grid opacity-30" style={{ maskImage: "none", WebkitMaskImage: "none" }} />
        <Hero />
        <Problem />
        <Solution />
        <LiveDemo />
        <Integrations />
        <HowItWorks />
        <WhyDifferent />
        <Security />
        <FAQ />
        <ClosingCTA />
      </main>
      <UpdatedFooter />
    </SmoothScroll>
  );
}
