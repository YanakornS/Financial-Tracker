import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useFinancialRecords } from "../../Contexts/financial.context"; // ใช้ path ที่ถูกต้อง
import { useUser } from "@clerk/clerk-react";
import { useParams, useNavigate } from "react-router-dom";

const categories = ["Food", "Transport", "Utilities", "Entertainment"];
const paymentMethods = ["Cash", "Credit Card", "Debit Card", "Bank Transfer"];

const EditRecordForm = () => {
  const { getRecordById, updateRecord } = useFinancialRecords(); // ใช้ context
  const { user } = useUser(); // ดึงข้อมูลผู้ใช้ที่ล็อกอินอยู่
  const { id } = useParams(); // รับ id จาก URL parameter
  const navigate = useNavigate();

  // กำหนดค่า state สำหรับฟอร์ม
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    const fetchRecord = async () => {
      const record = await getRecordById(id);
      console.log(record); // ตรวจสอบโครงสร้างของข้อมูล
      if (record) {
        setDescription(record.description || record[0]?.description);
        // แปลงวันที่ให้อยู่ในรูปแบบ YYYY-MM-DD
        const formattedDate = new Date(record.date || record[0]?.date)
          .toISOString()
          .split("T")[0];
        setDate(formattedDate);
        setAmount(record.amount || record[0]?.amount);
        setCategory(record.category || record[0]?.category);
        setPaymentMethod(record.paymentMethod || record[0]?.paymentMethod);
      } else {
        Swal.fire("Error!", "Record not found.", "error");
        navigate("/");
      }
    };

    fetchRecord();
  }, [id, getRecordById, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire("Error!", "User not logged in.", "error");
      return;
    }

    const updatedRecord = {
      userId: user.id, // ใช้ userId จาก context
      description,
      date,
      amount,
      category,
      paymentMethod,
    };

    try {
      await updateRecord(id, updatedRecord); // ใช้ฟังก์ชัน updateRecord จาก context
      Swal.fire(
        "Success!",
        "Financial record updated successfully!",
        "success"
      );
      navigate("/"); // เปลี่ยนเส้นทางกลับไปยังหน้ารายการหลังจากอัพเดตสำเร็จ
    } catch (error) {
      console.error("Error updating financial record:", error);
      Swal.fire(
        "Error!",
        "There was an error updating the financial record.",
        "error"
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-96 bg-base-100 shadow-xl m-2 p-4 rounded-lg border-2 border-[#c493ff]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#c493ff]">Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input input-bordered w-full border-[#c493ff] focus:ring-2 focus:ring-[#c493ff]"
              required
            />
          </div>
          <div>
            <label className="block text-[#c493ff]">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input input-bordered w-full border-[#c493ff] focus:ring-2 focus:ring-[#c493ff]"
              required
            />
          </div>
          <div>
            <label className="block text-[#c493ff]">Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input input-bordered w-full border-[#c493ff] focus:ring-2 focus:ring-[#c493ff]"
              required
            />
          </div>
          <div>
            <label className="block text-[#c493ff]">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full border-[#c493ff] focus:ring-2 focus:ring-[#c493ff]"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[#c493ff]">Payment Method:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="select select-bordered w-full border-[#c493ff] focus:ring-2 focus:ring-[#c493ff]"
              required
            >
              <option value="" disabled>
                Select a payment method
              </option>
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn bg-[#c493ff] text-white border-none hover:bg-[#a970e8]"
            >
              Update Financial Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecordForm;
