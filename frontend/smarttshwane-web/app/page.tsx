import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import TopServices from "@/components/home/TopServices";
import RecentUpdates from "@/components/home/RecentUpdates";
import HowItWorks from "@/components/home/HowItWorks";
import HomeCTA from "@/components/home/HomeCTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        
        <Hero />
        <TopServices />
        <RecentUpdates />
        <HowItWorks />
        <HomeCTA />

      </main>

      <Footer />
    </>
  );
}