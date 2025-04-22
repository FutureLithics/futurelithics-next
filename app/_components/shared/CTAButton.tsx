import React from "react";

interface CTAButtonPRops {
    url: string,
    innerText: string 
}

const CTAButton: React.FC<CTAButtonPRops> = (props) => {
  const { url, innerText } = props;

  return (
    <a href={url} className="btn cta-button">
      <strong className="text-warning">{innerText}</strong>
    </a>
  );
};

export default CTAButton;