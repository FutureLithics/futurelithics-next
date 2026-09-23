import React from "react";
import Image from "next/image";
import CTAButton from "./CTAButton";
import type { ServiceImage } from "@/app/types/service";

type ServiceHeroProps = {
  title: string;
  headline?: string;
  lede: string;
  image: ServiceImage;
};

const ServiceHero = ({ title, headline, lede, image }: ServiceHeroProps) => (
  <section aria-labelledby="service-hero-heading" className="service-hero">
    <Image
      src={image.src}
      alt=""
      fill
      sizes="100vw"
      className="service-hero-bg"
      priority
    />
    <div className="container position-relative py-5">
      <div className="service-hero-copy text-secondary text-center text-lg-start mx-auto mx-lg-0 py-4">
        <h1 id="service-hero-heading" className="text-primary-data mb-3">
          {title}
        </h1>
        {headline && <p className="service-headline mb-3">{headline}</p>}
        <p className="mb-4">{lede}</p>
        <div className="service-hero-cta mx-auto mx-lg-0">
          <CTAButton url="#contact-section" innerText="Schedule Consultation" />
        </div>
      </div>
    </div>
  </section>
);

export default ServiceHero;
