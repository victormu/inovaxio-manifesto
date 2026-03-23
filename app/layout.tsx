import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inovaxio — Storyboard",
  description: "Roteiro interativo do vídeo institucional da Inovaxio · 13 cenas · ~95 segundos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full" suppressHydrationWarning>
      <body className="min-h-full" style={{ backgroundColor: "#231F20", color: "#E6E7E8" }}>
        {children}
      </body>
    </html>
  );
}
