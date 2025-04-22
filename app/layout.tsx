import type { Metadata } from "next";
import "./globals.scss";

import Header from "./_components/layout/Header";
import Footer from "./_components/layout/Footer";

export const metadata: Metadata = {
  title: "Future Lithics LLC",
  description:
    "Future Lithics is a web & software consultancy founded by Chad R. Denaux.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
