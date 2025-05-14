"use client"
import React, { useState } from "react";
import { NavbarBrand, Navbar } from "reactstrap";
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";

import Image from "next/image";

import cardRoutes from "../../service-routes";

import ModalContainer from "../modal/ModalContainer";

import Logo1 from "../../assets/images/Logo1.svg";

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  return (
    <div className="header py-2">
      <Navbar className="container">
        <NavbarBrand href={"/"}>
          <Image src={Logo1} alt="Future Lithics" />
        </NavbarBrand>
        {/* props.auth.isAuthenticated ? <AuthHeader /> : <NonAuthHeader toggler={toggleModal} /> */}
        <DesktopNav />
        <MobileNav routes={cardRoutes} />
      </Navbar>
      <ModalContainer
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        type={modalType}
      />
    </div>
  );
};

export default Header;
