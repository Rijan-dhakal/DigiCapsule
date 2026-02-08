import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./layouts/header";
import Footer from "./layouts/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DigiCapsule",
  description: "Create and save your thoughts for future unlock",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <Header />
        </div>

        <div className=" mx-auto px-4 md:max-w-11/12 lg:max-w-4/5">{children}</div>
        <div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
