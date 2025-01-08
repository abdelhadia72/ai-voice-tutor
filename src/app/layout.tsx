import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ContentWrapper from "@/components/ContentWrapper";
import { OnboardingWrapper } from "@/components/OnboardingWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Voice Tutor",
  description: "Learn languages with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <ContentWrapper>
          <OnboardingWrapper>{children}</OnboardingWrapper>
        </ContentWrapper>
      </body>
    </html>
  );
}
