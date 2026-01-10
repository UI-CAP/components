import MenuBar from "@/component/home-page/menu";
import Footer from "@/component/home-page/Footer";
import WhyChooseSection from "@/component/industry-page/WhyChooseSection";
import SolutionSection from "@/component/industry-page/SolutionSection";
import BannerSection from "@/component/home-page/BannerSection";

const IndustryPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <MenuBar />
      <BannerSection/>
      <WhyChooseSection />
      <SolutionSection />
      <Footer />
    </div>
  );
};

export default IndustryPage;
