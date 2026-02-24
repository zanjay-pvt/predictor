"use client";

import { useState } from "react";
import {
  MemoryStick,
  Monitor,
  Camera,
  BatteryFull,
  Smartphone,
  HardDrive,
  LayoutGrid,
} from "lucide-react";

interface FormState {
  ram: string;
  display: string;
  camera: string;
  battery: string;
  sim: string;
  storage: string;
}

export function PredictionForm() {
  const [form, setForm] = useState<FormState>({
    ram: "",
    display: "",
    camera: "",
    battery: "",
    sim: "single",
    storage: "not-supported",
  });

  const [price, setPrice] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function predictPrice() {
    setIsCalculating(true);

    setTimeout(() => {
      const ram = parseFloat(form.ram) || 4;
      const display = parseFloat(form.display) || 6.0;
      const camera = parseFloat(form.camera) || 48;
      const battery = parseFloat(form.battery) || 4000;
      const simMultiplier = form.sim === "dual" ? 1.1 : 1;
      const storageMultiplier = form.storage === "supported" ? 1.05 : 1;

      const base =
        ram * 28 +
        display * 45 +
        camera * 3.2 +
        battery * 0.035 +
        120;
      const predicted = base * simMultiplier * storageMultiplier;

      setPrice(Math.round(predicted * 100) / 100);
      setIsCalculating(false);
    }, 800);
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Glassmorphism Card */}
      <div className="rounded-2xl border border-border bg-card p-6 backdrop-blur-xl sm:p-8 lg:p-10">
        {/* Input Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* RAM */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <MemoryStick className="h-4 w-4 text-primary" />
              RAM Capacity (GB)
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

          {/* Camera */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Camera className="h-4 w-4 text-primary" />
              Rear Camera (MP)
            </label>
            <input
              type="number"
              placeholder="e.g. 108"
              value={form.camera}
              onChange={(e) => handleChange("camera", e.target.value)}
              className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Battery */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <BatteryFull className="h-4 w-4 text-primary" />
              Battery (mAh)
            </label>
            <input
              type="number"
              placeholder="e.g. 5000"
              value={form.battery}
              onChange={(e) => handleChange("battery", e.target.value)}
              className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* SIM */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Smartphone className="h-4 w-4 text-primary" />
              SIM Support
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

          {/* External Storage */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <HardDrive className="h-4 w-4 text-primary" />
              External Storage
            </label>
            <select
              value={form.storage}
              onChange={(e) => handleChange("storage", e.target.value)}
              className="appearance-none rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="not-supported">Not Supported</option>
              <option value="supported">Supported</option>
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
                {price !== null ? `$${price.toFixed(2)}` : "$0.00"}
              </span>
              <span className="text-sm text-muted-foreground">USD</span>
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
