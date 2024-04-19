import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "supamigration",
  description: "Supamigration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "dark p-2 xl:p-3 min-h-dvh flex flex-col"
        )}
      >
        <Header />
        <main className="grow flex flex-col lg:flex-row gap-6">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
