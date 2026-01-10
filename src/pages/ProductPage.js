import MenuBar from "@/component/home-page/menu";
import SmartDiscoverySection from "@/component/product-page/SmartDiscoverySection";
import AdvancedFeaturesSection from "@/component/product-page/AdvancedFeaturesSection";
import FAQSection from "@/component/product-page/FAQSection";
import BannerSection from "@/component/home-page/BannerSection";

const ProductPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <MenuBar />
      <BannerSection />
      <SmartDiscoverySection />
      <AdvancedFeaturesSection />
      <FAQSection />
    </div>
  );
};

export default ProductPage;
