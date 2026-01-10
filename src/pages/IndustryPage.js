import MenuBar from "@/component/home-page/menu";
import Footer from "@/component/home-page/Footer";

const IndustryPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <MenuBar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Industry Page</h1>
        {/* Add your industry page components here */}
      </div>
      <Footer />
    </div>
  );
};

export default IndustryPage;
