import React from "react";
import ContactSection from "@/app/_components/home/ContactSection";
import CTAButton from "@/app/_components/shared/CTAButton";
import ServiceCard from "@/app/_components/shared/ServiceCard";
import ServiceHero from "@/app/_components/shared/ServiceHero";
import { homepageServices } from "@/app/service-routes";
import type { ServicePageContent } from "@/app/content/services/types";
import type { HomepageService } from "@/app/types/service";
import EvidenceCard from "./EvidenceCard";
import LandingSection from "./LandingSection";
import LandingSpotlight from "./LandingSpotlight";

type ServiceLandingPageProps = {
  service: HomepageService;
  content: ServicePageContent;
};

const ServiceLandingPage = ({ service, content }: ServiceLandingPageProps) => {
  const relatedServices = content.related
    .map((name) => homepageServices.find((entry) => entry.name === name))
    .filter((entry): entry is HomepageService => Boolean(entry));

  return (
    <main className="service-landing w-100">
      <ServiceHero
        title={service.title}
        headline={content.hero.headline}
        lede={content.hero.lede}
        image={service.image}
      />

      <div className="custom-layer-bg py-4">
        <LandingSection id="problem" heading={content.problem.heading}>
          {content.problem.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </LandingSection>

        <LandingSection id="capabilities" heading={content.capabilities.heading}>
          <p>{content.capabilities.intro}</p>
          <div className="row g-4">
            {content.capabilities.items.map((item) => (
              <div className="col-md-6" key={item.title}>
                <div className="landing-item p-4">
                  <h3>{item.title}</h3>
                  <p className="mb-0">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </LandingSection>

        <LandingSpotlight spotlight={content.spotlight} />

        <LandingSection id="fit" heading={content.fit.heading}>
          <ul className="fit-list mb-0">
            {content.fit.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </LandingSection>

        <LandingSection id="evidence" heading="Relevant work">
          <div className="row g-4">
            {content.evidence.map((item) => (
              <EvidenceCard item={item} key={item.title} />
            ))}
          </div>
        </LandingSection>

        <section id="related" aria-labelledby="related-heading" className="landing-section">
          <h2 id="related-heading" className="text-primary-data text-center mb-3">
            Related services
          </h2>
          <div className="container w-100 row justify-content-center mx-auto">
            {relatedServices.map((related) => (
              <ServiceCard card={related} key={related.name} />
            ))}
          </div>
        </section>

        <section
          id="consultation"
          aria-labelledby="consultation-heading"
          className="container landing-section"
        >
          <div className="landing-panel p-4 p-md-5 text-center">
            <h2 id="consultation-heading" className="text-primary-data mb-3">
              {content.cta.heading}
            </h2>
            <p className="mx-auto consultation-body">{content.cta.body}</p>
            <div className="service-hero-cta mx-auto">
              <CTAButton url="#contact-section" innerText="Schedule Consultation" />
            </div>
          </div>
        </section>
      </div>

      <ContactSection />
    </main>
  );
};

export default ServiceLandingPage;
