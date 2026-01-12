import MenuBar from "@/component/home-page/menu";
import Footer from "@/component/home-page/Footer";
import Leaders from "@/component/aboutUs-page/Leaders";
import BannerSection from "@/component/home-page/BannerSection";
import Advisors from "@/component/aboutUs-page/Advisors";

const AboutUsPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <MenuBar />
      <BannerSection/>
      <Leaders />
      <Advisors/>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
