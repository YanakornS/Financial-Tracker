import React from "react";
import { useUser } from "@clerk/clerk-react";
import AddRecordForm from "./AddRecordForm";
import FinanciaRecordTable from "./FinanciaRecordTable";

const Dashboard = () => {
  const { user } = useUser(); // เรียกใช้งาน useUser hook เพื่อดึงข้อมูลผู้ใช้

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="text-center text-3xl md:text-4xl md:leading-snug font-bold my-2 text-[#c493ff]">
        {/* ใช้ข้อมูลจาก user และแยกสไตล์ชื่อ user */}
        Welcome{" "}
        <span className="text-[#533391]">
          {user?.firstName || "Guest"}
        </span>
        ! Here are your Finance:
      </div>
      <AddRecordForm />
      <div className="text-lg text-[#533391] mt-4">
        Total Monthly: 00000
      </div>
      <FinanciaRecordTable />
    </div>
  );
};

export default Dashboard;
