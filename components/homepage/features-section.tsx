import FeatureCard from "./feature-card";

const FeaturesSection = () => {
  return (
    <section id="features" className="mt-10">
      <div className="text-center">
        <p className="text-3xl font-bold">Core Features</p>
        <p className="text-sm text-gray-400 mt-3">
          Everything you need to save your memories and build anticipation for
          the big reveal.
        </p>
      </div>

      <div className=" mt-4 flex flex-col items-center gap-5 lg:flex-row lg:justify-center">
        <FeatureCard
          image="/lock.png"
          alt="Lock Image"
          title="Time Locked Security"
          description="Set a specific unlock date. Content remains strictly encrypted and inaccessible until the countdown ends."
        />
        <FeatureCard
          image="/sharing.png"
          alt="Sharing Image"
          title="Selective Sharing"
          description="Control visibility. Keep it private for your future self or share a link with friends and family."
        />
        <FeatureCard
          image="/blur.png"
          alt="Blur Image"
          title="Tease with Hints"
          description="Provide blurry previews or cryptic clues to build anticipation before the reveal date arrives."
        />
      </div>
    </section>
  );
};
export default FeaturesSection;
