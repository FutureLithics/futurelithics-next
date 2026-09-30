import type { Metadata } from "next";
import HeroSection from "./_components/home/HeroSection";
import ContactSection from "./_components/home/ContactSection";
import PillarSection from "./_components/home/PillarSection";
import SelectedWorkSection from "./_components/home/SelectedWorkSection";
import ServiceSection from "./_components/home/ServiceSection";

const title =
  "Software Engineering & Application Modernization | Future Lithics";
const description =
  "Future Lithics is a US software engineering consultancy specializing in application modernization, custom software, integrations, automation, and data-intensive applications.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Future Lithics",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="App w-100">
      <HeroSection />
      <PillarSection />
      <ServiceSection />
      <SelectedWorkSection />
      <ContactSection />
    </main>
  );
}