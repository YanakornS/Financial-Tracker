import React from "react";
import AddFinancial from "../pages/AddFinancial";
import EditRecordForm from "../pages/dashboard/EditRecordForm"; // เปลี่ยนเป็น EditRecordForm
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/dashboard";
import { FinancialRecordProvider } from "../Contexts/financial.context";
import Home from "../pages/Home";

import { createBrowserRouter } from "react-router-dom";

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
            <Dashboard />
          </FinancialRecordProvider>
        ),
      },
      {
        path: "AddFinancial",
        element: (
          <FinancialRecordProvider>
            <AddFinancial />
          </FinancialRecordProvider>
        ),
      },
      {
        path: "EditRecordFinancia/:id", // เส้นทางที่ถูกต้องพร้อมรับพารามิเตอร์ :id
        element: (
          <FinancialRecordProvider>
            <EditRecordForm /> 
          </FinancialRecordProvider>
        ),
      },
    ],
  },
]);

export default router2;
