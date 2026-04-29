import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeHero from "@/components/home/HomeHero";
import HomeFeatures from "@/components/home/HomeFeatures";
import HomeArticles from "@/components/home/HomeArticles";
import HomeCommunity from "@/components/home/HomeCommunity";
import HomeNewsletter from "@/components/home/HomeNewsletter";
import HomeCta from "@/components/home/HomeCta";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HomeHero />
        <HomeFeatures />
        <HomeArticles />
        <HomeCommunity />
        <HomeNewsletter />
        <HomeCta />
      </main>
      <Footer />
    </>
  );
}