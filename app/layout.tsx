import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aterna Map",
  description: "Interactive World Map of Aterna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}