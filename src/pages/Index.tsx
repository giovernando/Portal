import { Layout } from "@/components/Layout";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { DataSekolah } from "@/components/home/DataSekolah";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { NewsSection } from "@/components/home/NewsSection";
import { GaleriSection } from "@/components/home/GaleriSection";
import { CtaSection } from "@/components/home/CtaSection";

const Index = () => {
  return (
    <Layout>
      <HeroCarousel />
      <DataSekolah />
      <WelcomeSection />
      <FeaturesSection />
      <NewsSection />
      <GaleriSection />
      <CtaSection />
    </Layout>
  );
};

export default Index;
