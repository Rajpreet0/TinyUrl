import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const outfitSans = Outfit({
  subsets: ["latin"],
})


export const metadata: Metadata = {
  title: "TinyUrl",
  description: "Shorten Urls to an Tiny Format for Free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfitSans.className} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
