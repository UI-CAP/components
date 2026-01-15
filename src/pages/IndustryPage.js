import MenuBar from "@/component/home-page/menu";
import Footer from "@/component/home-page/Footer";
import WhyChooseSection from "@/component/industry-page/WhyChooseSection";
import SolutionSection from "@/component/industry-page/SolutionSection";
import BannerSection from "@/component/home-page/BannerSection";
import Benefits from "@/component/industry-page/Benefits";
import Services from "@/component/industry-page/Services";
import IndustryRecognition from "@/component/industry-page/IndustryRecognition";
import DemoDetails from "@/component/industry-page/DemoDetails";

const IndustryPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <MenuBar />
      <BannerSection />
      <WhyChooseSection />
      <SolutionSection />
      <Benefits />
      <Services />
      <IndustryRecognition />
      <DemoDetails />
      <Footer />
    </div>
  );
};

export default IndustryPage;
