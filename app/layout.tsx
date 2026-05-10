import type { Metadata } from "next";
import "./globals.css";

// Updated metadata for professional branding [cite: 31]
export const metadata: Metadata = {
  title: "AI Spend Auditor | Credex",
  description: "Audit your AI tool spend and find savings instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      {/* Standard font stack ensures the build never fails locally or on CI [cite: 153, 154] */}
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}