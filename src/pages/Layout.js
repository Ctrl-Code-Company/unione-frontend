import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { LanguageProvider } from "../LanguageProvider";

const Layout = () => {
  return (
    <div>
      <LanguageProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </LanguageProvider>
    </div>
  );
};

export default Layout;
