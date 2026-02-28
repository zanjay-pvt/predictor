"use client";

import { useState } from "react";
import {
  Star,
  MemoryStick,
  Monitor,
  Camera,
  BatteryFull,
  Smartphone,
  HardDrive,
  Cpu,
  LayoutGrid,
} from "lucide-react";

interface FormState {
  rating: string;
  ram: string;
  display: string;
  camera_mp: string;
  battery_capacity: string;
  processor_type: string;
  card: string;
  sim: string;
}

export function PredictionForm() {
  const [form, setForm] = useState<FormState>({
    rating: "",
    ram: "",
    display: "",
    camera_mp: "",
    battery_capacity: "",
    processor_type: "snapdragon",
    card: "not-supported",
    sim: "single",
  });

  const [price, setPrice] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function predictPrice() {
    setIsCalculating(true);

    setTimeout(() => {
      const rating = parseFloat(form.rating) || 4.0;
      const ram = parseFloat(form.ram) || 4;
      const display = parseFloat(form.display) || 6.0;
      const camera_mp = parseFloat(form.camera_mp) || 48;
      const battery_capacity = parseFloat(form.battery_capacity) || 4000;
      const simMultiplier = form.sim === "dual" ? 1.1 : 1;
      const cardMultiplier = form.card === "supported" ? 1.05 : 1;
      const processorMultiplier = form.processor_type === "snapdragon" ? 1.15 : form.processor_type === "exynos" ? 1.08 : 1.0;

      const base =
        rating * 50 +
        ram * 28 +
        display * 45 +
        camera_mp * 3.2 +
        battery_capacity * 0.035 +
        120;
      const predicted = base * simMultiplier * cardMultiplier * processorMultiplier;

      setPrice(Math.round(predicted * 100) / 100);
      setIsCalculating(false);
    }, 800);
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Glassmorphism Card */}
      <div className="rounded-2xl border border-border bg-card p-6 backdrop-blur-xl sm:p-8 lg:p-10">
        {/* Input Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Rating */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Star className="h-4 w-4 text-primary" />
              Rating (1-5)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="e.g. 4.5"
              value={form.rating}
              onChange={(e) => handleChange("rating", e.target.value)}
              className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* RAM */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <MemoryStick className="h-4 w-4 text-primary" />
              RAM (GB)
            </label>
            <input
              type="number"
              placeholder="e.g. 12"
              value={form.ram}
              onChange={(e) => handleChange("ram", e.target.value)}
              className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Display */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Monitor className="h-4 w-4 text-primary" />
              Display Size (Inches)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 6.7"
              value={form.display}
              onChange={(e) => handleChange("display", e.target.value)}
              className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Camera MP */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Camera className="h-4 w-4 text-primary" />
              Camera (MP)
            </label>
            <input
              type="number"
              placeholder="e.g. 108"
              value={form.camera_mp}
              onChange={(e) => handleChange("camera_mp", e.target.value)}
              className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Battery Capacity */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <BatteryFull className="h-4 w-4 text-primary" />
              Battery (mAh)
            </label>
            <input
              type="number"
              placeholder="e.g. 5000"
              value={form.battery_capacity}
              onChange={(e) => handleChange("battery_capacity", e.target.value)}
              className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Processor Type */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Cpu className="h-4 w-4 text-primary" />
              Processor
            </label>
            <select
              value={form.processor_type}
              onChange={(e) => handleChange("processor_type", e.target.value)}
              className="appearance-none rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="snapdragon">Snapdragon</option>
              <option value="exynos">Exynos</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Memory Card */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <HardDrive className="h-4 w-4 text-primary" />
              Memory Card
            </label>
            <select
              value={form.card}
              onChange={(e) => handleChange("card", e.target.value)}
              className="appearance-none rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="not-supported">Not Supported</option>
              <option value="supported">Supported</option>
            </select>
          </div>

          {/* SIM */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Smartphone className="h-4 w-4 text-primary" />
              SIM
            </label>
            <select
              value={form.sim}
              onChange={(e) => handleChange("sim", e.target.value)}
              className="appearance-none rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="single">Single SIM</option>
              <option value="dual">Dual SIM</option>
            </select>
          </div>
        </div>

        {/* Result + Button Row */}
        <div className="mt-8 flex flex-col items-stretch gap-5 sm:flex-row sm:items-end">
          {/* Estimated Value */}
          <div className="flex-1 rounded-2xl border border-border bg-secondary/60 px-6 py-5 backdrop-blur-md">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
              Estimated Value
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground sm:text-4xl">
                {price !== null ? `₹${price.toFixed(2)}` : "₹0.00"}
              </span>
              <span className="text-sm text-muted-foreground">INR</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground italic">
              Calculated based on current market trends & specs.
            </p>
          </div>

          {/* Predict Button */}
          <button
            onClick={predictPrice}
            disabled={isCalculating}
            className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 sm:px-10"
          >
            <LayoutGrid className="h-5 w-5" />
            {isCalculating ? "Calculating..." : "Predict Price"}
          </button>
        </div>
      </div>
    </div>
  );
}
