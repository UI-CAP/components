import MenuBar from "@/component/home-page/menu";
import SmartDiscoverySection from "@/component/product-page/SmartDiscoverySection";
import AdvancedFeaturesSection from "@/component/product-page/AdvancedFeaturesSection";
import FAQSection from "@/component/product-page/FAQSection";

const ProductPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <MenuBar />
      <SmartDiscoverySection />
      <AdvancedFeaturesSection />
      <FAQSection />
    </div>
  );
};

export default ProductPage;
