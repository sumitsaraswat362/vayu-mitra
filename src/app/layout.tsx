import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vayu-Mitra | Urban Winter Smog and Air Quality Resilience Assistant",
  description:
    "An AI powered urban air quality and winter smog resilience platform generating personalized daily routines, indoor ventilation schedules, and low exposure transit routes.",
  keywords: [
    "Air Quality Index",
    "Winter Smog",
    "PM2.5 Protection",
    "Asthma Air Safety",
    "Inversion Warning",
    "Vayu-Mitra",
    "Delhi NCR AQI",
  ],
  authors: [{ name: "Sumit Saraswat" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-teal-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
