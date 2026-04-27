import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import AppShowcase from "@/components/AppShowcase";
import Testimonials from "@/components/Testimonials";
import Articles from "@/components/Articles";
import Partners from "@/components/Partners";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import CtaDownload from "@/components/CtaDownload";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <AppShowcase />
        <Testimonials />
        <Articles />
        <Partners />
        <Newsletter />
        <Contact />
        <CtaDownload />
      </main>
      <Footer />
    </>
  );
}
