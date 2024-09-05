import React from "react";
import { useFinancialRecords } from "../../Contexts/financial.context"; // Adjust the path as needed

const FinanciaRecordTable = () => {
  const { records, deleteRecord } = useFinancialRecords(); // Use context to get records and deleteRecord function

  const handleDelete = async (id) => {
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
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-2 border-[#c493ff]">
        {/* head */}
        <thead className="bg-[#c493ff] text-white">
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
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
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
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
                  <button className="btn bg-[#c493ff] text-white btn-xs border-none hover:bg-[#a970e8]">
                    Edit
                  </button>
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
