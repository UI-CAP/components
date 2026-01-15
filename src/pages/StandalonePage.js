import PartnerEnquiryForm from "@/component/standalone-page/PartnerEnquiryForm";
import MenuBar from "@/component/home-page/menu";
import Footer from "@/component/home-page/Footer";
import BannerSection from "@/component/home-page/BannerSection";

import CEOsMessage from "@/component/standalone-page/CEOsMessage";
import DemoDetails from "@/component/standalone-page/DemoDetails";
import BookADemo from "@/component/standalone-page/BookADemo";
import JobOpportunity from "@/component/standalone-page/JobOpportunity";

const StandalonePage = () => {
  return (
    <div className="bg-white min-h-screen">
      <MenuBar />
      <BannerSection />
      <PartnerEnquiryForm />
      <CEOsMessage />
      <DemoDetails />
      <BookADemo />
      <JobOpportunity />
      <Footer />
    </div>
  );
};

export default StandalonePage;
