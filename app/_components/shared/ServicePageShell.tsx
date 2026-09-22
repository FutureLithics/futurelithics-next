import React from "react";
import ContactSection from "@/app/_components/home/ContactSection";
import ServiceCard from "./ServiceCard";
import ServiceHero from "./ServiceHero";
import type { ServiceImage, ServiceRoute } from "@/app/types/service";

type ServicePageShellProps = {
  title: string;
  description: string;
  image: ServiceImage;
  routes?: ServiceRoute[];
};

const ServicePageShell = ({
  title,
  description,
  image,
  routes,
}: ServicePageShellProps) => {
  return (
    <main className="w-100">
      <ServiceHero title={title} lede={description} image={image} />

      <div className="custom-layer-bg py-4 w-100">
        <div className="container p-y w-100 row justify-content-start mx-auto">
          {routes?.map((route) => (
            <ServiceCard card={route} key={route.name} />
          ))}
        </div>
      </div>

      <ContactSection />
    </main>
  );
};

export default ServicePageShell;
