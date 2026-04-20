import type { ReactNode } from "react";
import type { Metadata } from "next";
import "../styles/index.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "./components/ui/sonner";

export const metadata: Metadata = {
  title: "Design System Foundation",
  description: "Converted to Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
