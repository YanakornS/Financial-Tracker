import React from "react";
import { useUser } from "@clerk/clerk-react";
import AddRecordForm from "./AddRecordForm";
import FinanciaRecordTable from "./FinanciaRecordTable";
import FinancialList from "../../component/FinanciaList";

const Dashboard = () => {
  const { user } = useUser(); // เรียกใช้งาน useUser hook เพื่อดึงข้อมูลผู้ใช้

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="text-center text-3xl md:text-4xl md:leading-snug font-bold my-2">
        {/* ใช้ข้อมูลจาก user */}
        Welcome {user?.firstName || "Guest"}! Here are your Finance:
      </div>
      <AddRecordForm />
      <div>Total Monthly: 00000</div>
      <FinanciaRecordTable />
    </div>
  );
};

export default Dashboard;
