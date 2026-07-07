import { Check, Zap, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardButton from "./card-button";
import { GetCurrentPlan } from "@/actions/user-details";

const plans = [
  {
    name: "Free",
    key: "free" as const,
    price: "Rs 0",
    priceAmount: 0,
    period: "forever",
    description:
      "Perfect for getting started with your first digital memories.",
    icon: null,
    highlighted: false,
    badge: null,
    features: [
      "Up to 4 capsules",
      "Up to 2 photos/videos per capsule",
      "Up to 5 MB per file",
      "Time lock scheduling",
    ],
    btn: "Get Free",
    btnVarient: "outline" as const,
  },
  {
    name: "Basic",
    key: "basic" as const,
    price: "Rs 199",
    priceAmount: 199,
    period: "forever",
    description: "For those who want to preserve more memories.",
    icon: Zap,
    highlighted: true,
    badge: "Most Popular",
    features: [
      "Up to 8 capsules",
      "Up to 4 photos/videos per capsule",
      "Up to 20 MB per file",
      "Time lock scheduling",
      "Blur preview hints",
    ],
    btn: "Get Basic",
    btnVarient: "default" as const,
  },
  {
    name: "Premium",
    key: "premium" as const,
    price: "Rs 399",
    priceAmount: 399,
    period: "forever",
    description: "Extra capsules, more storage, and more files per capsule.",
    icon: Sparkles,
    highlighted: false,
    badge: null,
    features: [
      "Up to 12 capsules",
      "Up to 6 photos/videos per capsule",
      "Up to 40 MB per file",
      "Time lock scheduling",
      "Blur preview hints",
      "Email notifications on unlock",
      "Content improvement with AI",
    ],
    btn: "Get Premium",
    btnVarient: "default" as const,
  },
];

const PricingSection = async () => {
  const resp = await GetCurrentPlan();
  const currentPlan = resp.success ? resp.data : "free";

  return (
    <div className="min-h-[calc(100vh-160px)] px-4 py-12 md:px-16 lg:px-40">
      {/* Section Header */}
      <div className="text-center mb-12">
        <p className="text-3xl font-bold">Pricing</p>
        <p className="text-sm text-text-secondary mt-3 max-w-md mx-auto">
          Choose the plan that fits your needs.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isCurrentPlan = currentPlan === plan.key;
          const isPremiumCurrentPlan = currentPlan === "premium";
          const shouldDisableCard =
            plan.key === "free" || isPremiumCurrentPlan || isCurrentPlan;
          const shouldShowBadge =
            currentPlan === plan.key ||
            (!!plan.badge &&
              !(isPremiumCurrentPlan && plan.badge === "Most Popular"));
          return (
            <div key={plan.name} className="relative h-full">
              {/* Badge */}
              {shouldShowBadge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-2">
                  <span className="bg-primary text-primary-foreground text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full whitespace-nowrap">
                    {(currentPlan === plan.key && "Current Plan") || plan.badge}
                  </span>
                </div>
              )}

              <Card
                className={`flex h-full flex-col rounded-2xl border transition-all ${
                  shouldDisableCard
                    ? "border-border-dark bg-surface-dark/90 opacity-75"
                    : plan.highlighted
                      ? "border-primary/60 bg-surface-dark shadow-lg shadow-primary/10"
                      : "border-border-dark bg-surface-dark"
                }`}
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-2">
                    {Icon && (
                      <Icon
                        className="text-primary shrink-0"
                        size={18}
                        strokeWidth={2}
                      />
                    )}
                    <CardTitle className="text-lg font-bold">
                      {plan.name}
                    </CardTitle>
                  </div>

                  <div className="flex items-end gap-1.5">
                    <span className="min-w-fit text-4xl font-extrabold leading-none tracking-tight">
                      {currentPlan === "basic" && plan.key === "premium"
                        ? `Rs ${plans[2].priceAmount - plans[1].priceAmount}`
                        : plan.price}
                    </span>
                    <span className="mb-1 whitespace-nowrap text-sm text-text-secondary">
                      /{plan.period}
                    </span>
                  </div>

                  <CardDescription className="text-sm leading-relaxed text-text-secondary">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 pt-0">
                  <div className="mb-5 h-px w-full bg-border-dark" />
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check
                          className="text-primary shrink-0 mt-0.5"
                          size={15}
                          strokeWidth={2.5}
                        />
                        <span className="text-sm text-foreground/80">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="mt-auto pt-0">
                  <CardButton
                    isCurrentPlan={isCurrentPlan}
                    shouldDisableCard={shouldDisableCard}
                    plan={{
                      key: plan.key,
                      btn: plan.btn,
                      btnVarient: plan.btnVarient,
                      priceAmount: plan.priceAmount,
                    }}
                  />
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </div>

      <div className="max-w-md mx-auto mt-8">
        <Card className="rounded-2xl border-border-dark bg-surface-dark/90">
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-semibold">Demo Credentials</p>
            </div>

            <p className="text-sm text-text-secondary">
              Use these to test premium features.
            </p>

            <pre className="mt-2 whitespace-pre-wrap bg-[rgba(255,255,255,0.02)] p-3 rounded-md text-sm font-mono text-foreground/90">
              {`Mobile Number: 9806800005
Password: Nepal@123
OTP: 123456`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PricingSection;
