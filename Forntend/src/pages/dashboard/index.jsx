import React from "react";
import { useUser } from "@clerk/clerk-react";
import AddRecordForm from "./AddRecordForm";
import FinanciaRecordTable from "./FinanciaRecordTable";
import { useFinancialRecords } from "./../../Contexts/financial.context";
import { useMemo } from "react";
import totalMonthlyImage from "./../../assets/all.png"; // Import รูปภาพเข้ามา

const Dashboard = () => {
  const { user } = useUser(); // เรียกใช้งาน useUser hook เพื่อดึงข้อมูลผู้ใช้
  const { records } = useFinancialRecords();

  const totalMonthly = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      const amount = parseFloat(record.amount);
      totalAmount += amount;
    });
    return totalAmount;
  }, [records]);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="flex flex-col items-center justify-center">
        {/* แสดงรูปภาพผู้ใช้ในกรอบน่ารักๆ */}
        {user?.imageUrl && (
          <div className="w-32 h-32 rounded-full border-4 border-[#c493ff] p-1 shadow-lg mb-4">
            <img
              src={user?.imageUrl}
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        )}
        <div className="text-center text-3xl md:text-4xl md:leading-snug font-bold my-2 text-[#c493ff]">
          Welcome To{" "}
          <span className="text-[#533391]">{user?.firstName || "Guest"}</span>!
          Here are your Finance
        </div>
      </div>
      <AddRecordForm />
      <div className="text-lg mt-4 p-3 border-2 border-[#c493ff] rounded-lg shadow-lg inline-block max-w-fit">
        <div className="flex items-center">
          {/* เพิ่มรูปภาพ PNG */}
          <img
            src={totalMonthlyImage}
            alt="Total Monthly"
            className="w-10 h-10 mr-2"
          />
          <div className="text-xl font-bold">
            Total Monthly: {totalMonthly}฿
          </div>
        </div>
      </div>

      <FinanciaRecordTable />
    </div>
  );
};

export default Dashboard;
