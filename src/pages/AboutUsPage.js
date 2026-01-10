import MenuBar from "@/component/home-page/menu";
import Footer from "@/component/home-page/Footer";

const AboutUsPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <MenuBar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">About Us Page</h1>
        {/* Add your about us page components here */}
      </div>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
