import React from "react";
import AddFinancial from "../pages/AddFinancial";
import EditFinancial from "../pages/EditFinancial";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/dashboard";
import FinancialService from "../services/Financia.service";
import { FinancialRecordProvider } from "../Contexts/financial.context";
import Home from "../pages/Home";

import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router2 = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "Dashboard",
        element: (
          <FinancialRecordProvider>
            <Dashboard />,
          </FinancialRecordProvider>
        ),
      },
      {
        path: "AddFinancial",
        element: <AddFinancial />,
      },
      {
        path: "EditFinancial/:id", // เพิ่ม :id เพื่อให้สามารถรับพารามิเตอร์จาก URL
        element: <EditFinancial />,
      },
    ],
  },
]);

export default router2;
