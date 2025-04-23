import HeroSection from "./_components/home/HeroSection";
import ContactSection from "./_components/home/ContactSection";
import ServiceSection from "./_components/home/ServiceSection";

export default function Home() {
  return (
    <main className="App pt-4 w-100">
      <HeroSection />
      <ServiceSection />
      <ContactSection />
    </main>
  );
}