"use client"
import React from "react";
import { NavbarBrand, Navbar } from "reactstrap";
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";

import Image from "next/image";

import cardRoutes from "../../service-routes";

import Logo1 from "../../assets/images/Logo1.svg";

const Header = () => {
  return (
    <div className="header py-2">
      <Navbar className="container">
        <NavbarBrand href={"/"}>
          <Image src={Logo1} alt="Future Lithics" />
        </NavbarBrand>
        <DesktopNav />
        <MobileNav routes={cardRoutes} />
      </Navbar>
    </div>
  );
};

export default Header;
