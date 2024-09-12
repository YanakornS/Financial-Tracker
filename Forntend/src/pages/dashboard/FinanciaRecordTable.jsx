import React, { useState } from "react";
import { useFinancialRecords } from "../../Contexts/financial.context"; // Adjust the path as needed
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "@clerk/clerk-react";
import NextPage from "./../../assets/Nextpage.png";
import Previous from "./../../assets/Previous.png";

const PAGE_SIZE = 6; // กำหนดจำนวนข้อมูลต่อหน้า

const FinanciaRecordTable = () => {
  const { records, deleteRecord } = useFinancialRecords(); // ใช้ context เพื่อดึง records และ deleteRecord function
  const { user } = useUser(); // ดึงข้อมูลผู้ใช้จาก context
  const [currentPage, setCurrentPage] = useState(1); // สถานะสำหรับหน้าปัจจุบัน

  // ฟังก์ชันคำนวณข้อมูลในหน้าปัจจุบัน
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentRecords = records.slice(startIndex, startIndex + PAGE_SIZE);
  const totalPages = Math.ceil(records.length / PAGE_SIZE);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteRecord(id);
        Swal.fire(
          "Deleted!",
          "Financial record deleted successfully!",
          "success"
        );
      } catch (error) {
        console.error("Error deleting financial record:", error);
        Swal.fire(
          "Error!",
          "There was an error deleting the financial record.",
          "error"
        );
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-2 border-[#c493ff]">
        {/* head */}
        <thead className="bg-[#c493ff] text-white">
          <tr>
            <th></th>
            <th>User ID</th>
            <th>Description</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Payment Method</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record) => (
            <tr key={record.id} className="hover:bg-[#f3e8ff]">
              <th></th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      {/* ใช้รูปภาพจากผู้ใช้ที่ล็อกอินเข้ามา */}
                      <img src={user?.imageUrl} alt="User Avatar" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{record.userId}</div>
                  </div>
                </div>
              </td>
              <td>{record.description}</td>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{record.amount}</td>
              <td>{record.category}</td>
              <td>{record.paymentMethod}</td>
              <th>
                <div className="flex space-x-2">
                  <Link to={`/EditRecordFinancia/${record.id}`}>
                    <button className="btn bg-[#c493ff] text-white btn-xs border-none hover:bg-[#a970e8]">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="btn bg-[#c493ff] text-white btn-xs border-none hover:bg-[#a970e8]"
                    onClick={() => handleDelete(record.id)}
                  >
                    Delete
                  </button>
                </div>
              </th>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot className="bg-[#c493ff] text-white">
          <tr>
            <th></th>
            <th>User ID</th>
            <th>Description</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Payment Method</th>
            <th></th>
          </tr>
        </tfoot>
      </table>

      {/* ปุ่ม Pagination */}
      <div className="flex justify-center mt-4">
        <button
          className="btn bg-[#c493ff] text-white mx-2 font-bold flex items-center"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src={Previous} alt="Previous" className="h-10 w-10 mr-2" />
          Previous
        </button>
        <span className="mx-2 text-lg font-bold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn bg-[#c493ff] text-white mx-2 font-bold flex items-center"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <img src={NextPage} alt="Next" className="h-10 w-10 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default FinanciaRecordTable;
