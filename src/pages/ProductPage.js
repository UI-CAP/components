import MenuBar from "@/component/home-page/menu";
import SmartDiscoverySection from "@/component/product-page/SmartDiscoverySection";
import AdvancedFeaturesSection from "@/component/product-page/AdvancedFeaturesSection";
import FAQSection from "@/component/product-page/FAQSection";
import BannerSection from "@/component/home-page/BannerSection";
import Footer from "@/component/home-page/Footer";

const ProductPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <MenuBar />
      <BannerSection />
      <SmartDiscoverySection />
      <AdvancedFeaturesSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default ProductPage;
