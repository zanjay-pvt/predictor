import { Navbar } from "@/components/sections/navbar";
import { PredictionForm } from "@/components/forms/prediction-form";
import { FeatureCards } from "@/components/sections/feature-cards";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Gradient Background Layers */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-chart-2/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex flex-1 flex-col items-center px-4 py-10 sm:px-6 lg:py-16">
          {/* Hero */}
          <div className="mb-10 text-center lg:mb-14">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Mobile Price Estimator
            </h1>
            <p className="mt-3 text-pretty text-base text-muted-foreground sm:text-lg">
              Harness AI to predict market value with professional-grade
              precision.
            </p>
          </div>

          {/* Prediction Form */}
          <PredictionForm />

          {/* Feature Cards */}
          <div className="mt-12 w-full lg:mt-16">
            <FeatureCards />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
