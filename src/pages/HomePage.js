import BannerSection from "../component/BannerSection";
import Footer from "../component/Footer";
import MenuBar from "../component/menu";
import StatsSection from "../component/StatsSection";
import AITransformation from "../component/AITransformation";
import VishleshanWaySection from "../component/VishleshanWaySection";
import UseCasesSection from "../component/UseCasesSection";
import TestimonialsSection from "../component/TestimonialsSection";
import SuccessStoriesSection from "../component/SuccessStoriesSection";
import InsightsSection from "../component/InsightsSection";
import AgenticCtaSection from "../component/AgenticCtaSection";

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
            <AgenticCtaSection/>
            <Footer />
        </div>
    );
};

export default HomePage;
