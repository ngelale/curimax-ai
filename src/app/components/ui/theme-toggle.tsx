"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { Switch } from "./switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="size-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2">
      <Sun className="size-4 text-muted-foreground" />
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light");
        }}
        aria-label="Toggle theme"
      />
      <Moon className="size-4 text-muted-foreground" />
    </div>
  );
}
