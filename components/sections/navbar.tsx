"use client";

import { Cpu, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = ["Dashboard", "Analytics", "History", "Pro Features"];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-4 lg:px-12">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
          <Cpu className="h-5 w-5 text-primary" />
        </div>
        <span className="text-lg font-semibold text-foreground">
          Predictor<span className="text-primary">Pro</span>
        </span>
      </div>

      <div className="hidden items-center gap-8 md:flex">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {link}
          </a>
        ))}
      </div>

      <button className="hidden rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary md:block">
        Account
      </button>

      <button
        className="text-foreground md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {mobileOpen && (
        <div className="absolute left-0 top-full w-full border-b border-border bg-background/95 px-6 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link}
              </a>
            ))}
            <button className="mt-2 w-full rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground">
              Account
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
