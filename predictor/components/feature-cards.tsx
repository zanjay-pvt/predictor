import { TrendingUp, Brain, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Market Analysis",
    description:
      "Real-time data synchronization with top global retailers for accurate pricing.",
    color: "text-chart-2",
    bg: "bg-chart-2/15",
  },
  {
    icon: Brain,
    title: "ML Algorithm",
    description:
      "Advanced neural networks processing over 50 technical parameters.",
    color: "text-primary",
    bg: "bg-primary/15",
  },
  {
    icon: ShieldCheck,
    title: "98% Accuracy",
    description:
      "Verified predictions with a minimal margin of error compared to MSRP.",
    color: "text-chart-3",
    bg: "bg-chart-3/15",
  },
];

export function FeatureCards() {
  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="rounded-2xl border border-border bg-card p-6 backdrop-blur-xl transition-colors hover:border-primary/30"
        >
          <div
            className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${feature.bg}`}
          >
            <feature.icon className={`h-5 w-5 ${feature.color}`} />
          </div>
          <h3 className="mb-2 text-base font-semibold text-foreground">
            {feature.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
