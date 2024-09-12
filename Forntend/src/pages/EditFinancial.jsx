import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import FinancialService from "../services/Financia.service";

function EditFinancial() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [financial, setFinancials] = useState({
    userId: "",
    description: "",
    date: "",
    amount: "",
    category: "",
    paymentMethod: "",
  });

  // Fetch financial record by ID
  useEffect(() => {
    if (id) {
      FinancialService.getFinanciaById(id).then((response) => {
        if (response.status === 200) {
          const data = response.data;
          // Ensure all fields have a value to avoid uncontrolled input issues
          setFinancials({
            userId: data.userId || "",
            description: data.description || "",
            date: data.date || "",
            amount: data.amount || "",
            category: data.category || "",
            paymentMethod: data.paymentMethod || "",
          });
        }
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinancials({ ...financial, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการ refresh หน้า
    try {
      const response = await FinancialService.editFinancia(id, financial);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Financial record updated",
          text: "Updated successfully",
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to update financial record",
        text: error?.response?.data?.message || error.message,
        timer: 1500,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 mb-8 p-8 bg-gradient-to-r from-purple-500  via-purple-600 to-purple-700 rounded-lg shadow-lg">
      <div className="font-bold text-4xl text-white text-center mb-8">
        <span className="text-[#c493ff]">Edit</span> Financial Record
      </div>
      <form onSubmit={handleSubmit}>
        <label className="flex flex-col mb-4">
          <span className="text-white font-semibold mb-1">UserId</span>
          <input
            type="text"
            className="p-2 bg-purple-100 border border-[#c493ff] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c493ff]"
            placeholder="UserId"
            name="userId"
            onChange={handleChange}
            value={financial.userId}
          />
        </label>
        <label className="flex flex-col mb-4">
          <span className="text-white font-semibold mb-1">Description</span>
          <input
            type="text"
            className="p-2 bg-purple-100 border border-[#c493ff] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c493ff]"
            placeholder="Description"
            name="description"
            onChange={handleChange}
            value={financial.description}
          />
        </label>
        <label className="flex flex-col mb-4">
          <span className="text-white font-semibold mb-1">Date</span>
          <input
            type="date"
            className="p-2 bg-purple-100 border border-[#c493ff] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c493ff]"
            name="date"
            onChange={handleChange}
            value={financial.date}
          />
        </label>
        <label className="flex flex-col mb-4">
          <span className="text-white font-semibold mb-1">Amount</span>
          <input
            type="number"
            className="p-2 bg-purple-100 border border-[#c493ff] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c493ff]"
            placeholder="Amount"
            name="amount"
            onChange={handleChange}
            value={financial.amount}
          />
        </label>
        <label className="block mb-4">
          <span className="text-white font-semibold mb-1">Category</span>
          <select
            id="category"
            name="category"
            onChange={handleChange}
            value={financial.category}
            className="w-full p-2 bg-purple-100 border border-[#c493ff] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c493ff]"
          >
            <option value="" disabled>
              Choose a Category
            </option>
            <option value="Food">Food</option>
            <option value="Drink">Drink</option>
            <option value="Supplies">Supplies</option>
          </select>
        </label>
        <label className="block mb-4">
          <span className="text-white font-semibold mb-1">Payment Method</span>
          <select
            id="paymentMethod"
            name="paymentMethod"
            onChange={handleChange}
            value={financial.paymentMethod}
            className="w-full p-2 bg-purple-100 border border-[#c493ff] rounded-md focus:outline-none focus:ring-2 focus:ring-[#c493ff]"
          >
            <option value="" disabled>
              Choose a Method
            </option>
            <option value="Cash">Cash</option>
            <option value="CreditCard">Credit Card</option>
            <option value="Prompay">Prompay</option>
          </select>
        </label>
        <button
          type="submit"
          className="w-full py-3 px-5 bg-[#c493ff] text-white font-semibold rounded-lg shadow-md hover:bg-[#b279e8] focus:outline-none focus:ring-2 focus:ring-[#c493ff] focus:ring-offset-2 mt-5"
        >
          Edit Financial
        </button>
      </form>
    </div>
  );
}
export default EditFinancial;
