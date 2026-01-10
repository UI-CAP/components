import BannerSection from "@/component/home-page/BannerSection";
import Footer from "@/component/home-page/Footer";
import MenuBar from "@/component/home-page/menu";
import StatsSection from "@/component/home-page/StatsSection";
import AITransformation from "@/component/home-page/AITransformation";
import VishleshanWaySection from "@/component/home-page/VishleshanWaySection";
import UseCasesSection from "@/component/home-page/UseCasesSection";
import TestimonialsSection from "@/component/home-page/TestimonialsSection";
import SuccessStoriesSection from "@/component/home-page/SuccessStoriesSection";
import InsightsSection from "@/component/home-page/InsightsSection";
import AgenticCtaSection from "@/component/home-page/AgenticCtaSection";
import SmartDiscoverySection from "@/component/product-page/SmartDiscoverySection";

const HomePage = () => {
  return (
    <div className="bg-white min-h-screen">
      <MenuBar />
      <BannerSection />
      <VishleshanWaySection />
      <AITransformation />
      <StatsSection />
      <UseCasesSection />
      <TestimonialsSection />
      <SuccessStoriesSection />
      <InsightsSection />
      <AgenticCtaSection />
      <Footer />
      <SmartDiscoverySection />
    </div>
  );
};

export default HomePage;
