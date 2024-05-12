import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from './components/Header'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Star Wars Films - Neowyze`,
  description: "Landing page of Star Wars. Neowyze challenge frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
