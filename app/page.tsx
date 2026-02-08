import FeaturesSection from "@/components/homepage/features-section";
import HowItWorks from "@/components/homepage/how-it-works";
import SignupPrompt from "@/components/homepage/signup-prompt";
import TopMainSection from "@/components/homepage/top-main";

const HomePage = () => {
  return (
    <div>
      <TopMainSection />
      <FeaturesSection />
      <HowItWorks />
      <SignupPrompt />
    </div>
  );
};
export default HomePage;
