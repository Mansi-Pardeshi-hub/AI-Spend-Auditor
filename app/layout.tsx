import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // Primary SEO [cite: 35]
  title: "AI Spend Auditor | Credex",
  description: "Audit your AI tool spend and find instant savings for your startup.",
  
  // Open Graph for viral sharing [cite: 40, 92, 93]
  openGraph: {
    title: "AI Spend Auditor | Credex",
    description: "Stop overpaying for AI tools. Get a free audit instantly.",
    siteName: "Credex AI Auditor",
    locale: "en_US",
    type: "website",
  },

  // Twitter Card requirement [cite: 92]
  twitter: {
    card: "summary_large_image",
    title: "AI Spend Auditor | Credex",
    description: "I found savings on my AI tool spend. Check yours now!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      {/* font-sans ensures the build never fails locally or on CI.
          min-h-full ensures consistent UI for long reports[cite: 73].
      */}
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}