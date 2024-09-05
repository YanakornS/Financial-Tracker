import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";

import React from "react";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className=" h-auto">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
