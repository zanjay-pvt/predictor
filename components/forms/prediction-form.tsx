"use client";

import { useState, useEffect } from "react"; // Added useEffect
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
  // 1. Prevent Hydration Error: Track if component is mounted in the browser
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
  setMounted(true);
}, []);
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

  // Set mounted to true once the component loads on the user's screen
  useEffect(() => {
    setMounted(true);
  }, []);

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function predictPrice() {
    // Basic validation to ensure fields aren't empty
    if (!form.ram || !form.camera_mp || !form.battery_capacity) {
      alert("Please fill in the RAM, Camera, and Battery fields.");
      return;
    }

    setIsCalculating(true);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: parseFloat(form.rating) || 4.2,
          ram: parseFloat(form.ram),
          display: parseFloat(form.display),
          camera_mp: parseFloat(form.camera_mp),
          battery_capacity: parseFloat(form.battery_capacity),
          processor_type: form.processor_type,
          card: form.card === "supported" ? 1 : 0,
          sim: form.sim === "dual" ? 1 : 0,
        }),
      });

      if (!response.ok) throw new Error("Backend connection failed");

      const data = await response.json();
      setPrice(data.estimated_price);
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Python API is offline. Run: python -m uvicorn api:app --reload");
    } finally {
      setIsCalculating(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-2xl border border-border bg-card p-6 backdrop-blur-xl sm:p-8 lg:p-10">
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
              className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
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
              className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
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
              className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
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
              className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
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
              value={form.battery_capacity}
              onChange={(e) => handleChange("battery_capacity", e.target.value)}
              className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Processor */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Cpu className="h-4 w-4 text-primary" />
              Processor
            </label>
            <select
              value={form.processor_type}
              onChange={(e) => handleChange("processor_type", e.target.value)}
              className="appearance-none rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="snapdragon">Snapdragon</option>
              <option value="mediatek">MediaTek / Dimensity</option>
              <option value="exynos">Samsung Exynos</option>
              <option value="apple">Apple Bionic</option>
              <option value="unisoc">Unisoc</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Card */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <HardDrive className="h-4 w-4 text-primary" />
              Memory Card
            </label>
            <select
              value={form.card}
              onChange={(e) => handleChange("card", e.target.value)}
              className="appearance-none rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
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
              className="appearance-none rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="single">Single SIM</option>
              <option value="dual">Dual SIM</option>
            </select>
          </div>
        </div>

        {/* Result Row */}
        <div className="mt-8 flex flex-col items-stretch gap-5 sm:flex-row sm:items-end">
          <div className="flex-1 rounded-2xl border border-border bg-secondary/60 px-6 py-5 backdrop-blur-md">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
              AI Predicted Value
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground sm:text-4xl">
            {!mounted ? (
                "₹0.00" 
             ) : price !== null ? (
                `₹${price.toLocaleString('en-IN')}` 
               ) : (
            "₹0.00"
             )}
          </span>
              <span className="text-sm text-muted-foreground">INR</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground italic">
              AI model trained on 2024-2025 market datasets.
            </p>
          </div>

          <button
            onClick={predictPrice}
            disabled={isCalculating}
            className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 sm:px-10"
          >
            <LayoutGrid className="h-5 w-5" />
            {isCalculating ? "Consulting AI..." : "Predict Price"}
          </button>
        </div>
      </div>
    </div>
  );
}