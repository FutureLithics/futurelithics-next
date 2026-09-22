import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { ServiceCardData } from "@/app/types/service";

type CardSwitchProps = {
  card: ServiceCardData;
  children: React.ReactNode;
  classes: string;
};

const CardSwitch = ({ card, children, classes }: CardSwitchProps) => {
  switch (card.type) {
    case "active":
      return (
        <Link href={card.path} className={classes}>
          {children}
        </Link>
      );
    case "inactive":
      return <div className={classes}>{children}</div>;
    case "external":
      return (
        <Link href={{ pathname: card.path }} className={classes} target="_blank">
          {children}
        </Link>
      );
    default:
      return (
        <Link href={card.path} className={classes}>
          {children}
        </Link>
      );
  }
};

type ServiceCardProps = {
  card: ServiceCardData;
};

const ServiceCard = ({ card }: ServiceCardProps) => {
  return (
    <CardSwitch
      card={card}
      classes="service-card-link col-lg-4 col-md-12 px-4 my-2 d-flex justify-content-center"
    >
      <div className="p-2 service-card">
        <div className="m-1 pb-2 service-card-inner">
          <div className="image-container">
            <Image
              src={card.image.src}
              alt={card.image.alt}
              className={card.image.preprocess ? "preprocess-image" : ""}
              width={300}
              height={200}
            />
          </div>
          <h5 className="text-primary text-center py-3 mb-0">{card.title}</h5>
          <div className="mx-2 p-4 text-center description">
            <p>{card.description}</p>
          </div>
        </div>
      </div>
    </CardSwitch>
  );
};

export default ServiceCard;
