"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import cardRoutes from "@/app/service-routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false;

// CSS for text wrapping and menu styling
const menuItemStyle: React.CSSProperties = {
  maxWidth: '220px',
  whiteSpace: 'normal',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  fontSize: '12px',
  padding: '0.5rem 0.5rem'
};

// Icon style to maintain consistent sizing
const iconStyle: React.CSSProperties = {
  width: '20px',
  height: '20px',
  fontSize: '20px',
  display: 'inline-block',
};

const routeFilter = (route: any) => {
  if (route.routes) {
    const routes = route.routes;
    const filteredRoutes = routes.filter((r: any) => {
      return r.type === "active";
    });

    if (filteredRoutes.length > 0) {
      return filteredRoutes;
    } else {
      return [];
    }
  } else {
    return [];
  }
};

const RecursiveDropdown = (props: any) => {
  const { route } = props;
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const filteredRoutes = routeFilter(route);
  const hasChildren = filteredRoutes.length > 0;

  const submenuStyle: React.CSSProperties = {
    display: 'block', 
    right: '100%', 
    top: 0,
    minWidth: '200px',
    maxWidth: '200px',
    zIndex: 1001,
    overflowWrap: 'break-word',
    whiteSpace: 'normal'
  };

  return (
    <div 
      className="desktop-sub-nav position-relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      style={{ width: '100%', maxWidth: '200px' }}
      ref={menuRef}
    >
      <div 
        className="desktop-toggle-sub btn-secondary d-flex justify-content-between align-items-center p-2 text-wrap"
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '100%', cursor: 'pointer' }}
      >
        <FontAwesomeIcon 
          icon={faArrowLeft} 
          className="icon align-middle me-2 flex-shrink-0" 
          size="lg"
        />
        <span className="text-end flex-grow-1 text-break" style={menuItemStyle}>
          <Link href={route.path}>
            {route.title}
          </Link>
        </span>
      </div>
      
      {isOpen && hasChildren && (
        <div 
          className="dropdown-menu py-2 position-absolute"
          style={submenuStyle}
        >
          <div className="menu-inner">
            {filteredRoutes.map((route: any) => {
              const nestedRoutes = routeFilter(route);
              
              if (nestedRoutes.length > 0) {
                return <RecursiveDropdown route={route} key={route.name} />;
              } else {
                return (
                  <Link
                    key={route.name}
                    href={route.path}
                    target={route.type === "external" ? "_blank" : ""}
                    className="sub-item-link d-block w-100"
                  >
                    <div className="dropdown-item text-wrap" style={menuItemStyle}>
                      {route.title}
                    </div>
                  </Link>
                );
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const DesktopNav = () => {
  const routes = cardRoutes;
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const dropdownStyle: React.CSSProperties = {
    display: 'block', 
    right: 0, 
    top: '100%',
    minWidth: '200px',
    maxWidth: '200px',
    zIndex: 1000,
    overflowWrap: 'break-word',
    whiteSpace: 'normal'
  };

  return (
    <div className="d-none d-md-block">
      <div 
        className="desktop-nav position-relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        ref={navRef}
      >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`desktop-toggle btn-secondary ${isOpen ? "focused" : ""}`}
        >
          <FontAwesomeIcon 
            icon={faBars} 
            style={iconStyle} 
            fixedWidth
          />
        </button>
        
        {isOpen && (
          <div 
            className="dropdown-menu py-4 position-absolute"
            style={dropdownStyle}
          >
            <div className="menu-inner">
              {routes.map((route) => {
                if (routeFilter(route).length > 0) {
                  return <RecursiveDropdown route={route} key={route.name} />;
                } else {
                  return (
                    <Link
                      href={route.path}
                      key={route.name}
                      className="item-link d-block w-100"
                    >
                      <div className="dropdown-item p-2 text-wrap" style={menuItemStyle}>
                        {route.title}
                      </div>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopNav;
