import React from "react";
import { useFinancialRecords } from "../../Contexts/financial.context"; // Adjust the path as needed
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "@clerk/clerk-react";

const FinanciaRecordTable = () => {
  const { records, deleteRecord } = useFinancialRecords(); // ใช้ context เพื่อดึง records และ deleteRecord function
  const { user } = useUser(); // ดึงข้อมูลผู้ใช้จาก context

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
        Swal.fire("Deleted!", "Financial record deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting financial record:", error);
        Swal.fire("Error!", "There was an error deleting the financial record.", "error");
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-2 border-[#c493ff]">
        {/* head */}
        <thead className="bg-[#c493ff] text-white">
          <tr>
            <th>
              <label>
              
              </label>
            </th>
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
          {records.map((record) => (
            <tr key={record.id} className="hover:bg-[#f3e8ff]">
              <th>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      {/* ใช้รูปภาพจากผู้ใช้ที่ล็อกอินเข้ามา */}
                      <img
                        src={user?.imageUrl} 
                        alt="User Avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{record.userId}</div>
                    <div className="text-sm opacity-50">{record.date}</div>
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
    </div>
  );
};

export default FinanciaRecordTable;
