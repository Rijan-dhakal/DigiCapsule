import { Upload, Lock, Sparkles } from "lucide-react";

const steps = [
  {
    title: "Create Capsule",
    description:
      "Upload photos, videos, or write a heartfelt message to your future self. Add files or memories to capture the atmosphere.",
    icon: Upload,
  },
  {
    title: "Set the Lock",
    description:
      "Choose a specific date in the future for the capsule to unlock. It can be a birthday, anniversary, or just a random day 10 years from now.",
    icon: Lock,
  },
  {
    title: "The Reveal",
    description:
      "Recipients receive a notification when the time is right. The capsule unlocks, flooding them with memories from the past.",
    icon: Sparkles,
  },
];

const HowItWorks = () => {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-14 pb-8 my-8">
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-white">How It Works</h2>
        <div className="mt-3 h-px w-full bg-white/10" />
      </div>

      <div className="relative">
        <div className="absolute left-4.5 -top-8 h-full w-px bg-white/10 md:left-7" />

        <div className="space-y-16">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={index} className="relative flex gap-6">
                <div className="relative z-10 flex h-9 w-9 p-2 items-center justify-center rounded-full bg-slate-900 ring-2 ring-blue-500/60 md:h-14 md:w-14">
                  <Icon className="h-6 w-6 text-blue-400" />
                </div>

                <div className="pt-1">
                  <h3 className="text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
