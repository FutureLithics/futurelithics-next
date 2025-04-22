import React from "react";

const Footer: React.FC = () => {

  const date = (): number => {
    return new Date().getFullYear();
  }

  return (
    <div className="footer p-4 text-end ">
      <p className="mb-0">Future Lithics {date()}</p>
    </div>
  );
};

export default Footer;