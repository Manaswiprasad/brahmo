import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BRAHMO - Drug Safety Engine",
  description: "Deterministic clinical safety constraints for LLMs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-900 text-gray-100">{children}</body>
    </html>
  );
}
