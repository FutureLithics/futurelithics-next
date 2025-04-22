import React from "react";
import Link from "next/link";
import Image from "next/image";

import Logo1 from "../../assets/images/Logo1.svg";

const Header: React.FC = () => {
  return (
    <div className="header pt-1">
      <nav className="container navbar">
        <Link href="/" className="navbar-brand">
          <Image src={Logo1} alt="Future Lithics" id="logo" />
        </Link>
      </nav>
    </div>
  );
};

export default Header;
