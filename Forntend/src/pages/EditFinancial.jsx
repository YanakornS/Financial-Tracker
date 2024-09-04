import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditFinancial = () => {
  const { userId } = useParams(); // ดึง id จาก URL
  const navigate = useNavigate();
  const [financialData, setFinancialData] = useState({
    userId: '',
    description: '',
    date: '',
    amount: '',
    category: '',
    paymentMethod: ''
  });

  // ฟังก์ชันในการดึงข้อมูลจาก API
useEffect(() => {
  if (userId) {
    const fetchFinancialData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vi/financial/${userId}`);
        setFinancialData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching financial data:', error);
      }
    };
    fetchFinancialData();
  }
}, [userId]);

  // ฟังก์ชันในการจัดการการเปลี่ยนแปลงของฟอร์ม
  const handleChange = (e) => {
    setFinancialData({
      ...financialData,
      [e.target.name]: e.target.value
    });
  };

  // ฟังก์ชันในการจัดการการส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/v1/financial/${userId}`, financialData);
      alert('Financial record updated successfully');
      navigate('/financial-list'); // เปลี่ยนเส้นทางไปยังหน้ารายการหลังจากอัปเดต
    } catch (error) {
      console.error('Error updating financial record:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-96 bg-base-100 shadow-xl m-2 p-4 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">User ID:</label>
            <input
              type="text"
              name="userId"
              value={financialData[0]}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            {console.log(financialData)}
          </div>
          <div>
            <label className="block">Description:</label>
            <input
              type="text"
              name="description"
              value={financialData[0]}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block">Date:</label>
            <input
              type="date"
              name="date"
              value={financialData.date}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block">Amount:</label>
            <input
              type="number"
              name="amount"
              value={financialData.amount}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block">Category:</label>
            <input
              type="text"
              name="category"
              value={financialData.category}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block">Payment Method:</label>
            <input
              type="text"
              name="paymentMethod"
              value={financialData.paymentMethod}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">
              Update Financial Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFinancial;
