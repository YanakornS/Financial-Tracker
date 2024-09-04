import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const AddFinancial = () => {
  const [userId, setUserId] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/vi/financial/', {
        userId,
        description,
        date,
        amount,
        category,
        paymentMethod,
      });

      if (response.status === 201) {
        Swal.fire('Success!', 'Financial record added successfully!', 'success');
        // Reset the form fields
        setUserId('');
        setDescription('');
        setDate('');
        setAmount('');
        setCategory('');
        setPaymentMethod('');
      }
    } catch (error) {
      Swal.fire('Error!', 'There was an error adding the financial record.', 'error');
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
  <div className="w-96 bg-base-100 shadow-xl m-2 p-4 rounded-lg border-2 border-[#c493ff]">
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[#c493ff]">User ID:</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="input input-bordered w-full border-[#c493ff] focus:ring-2 focus:ring-[#c493ff]"
          required
        />
      </div>
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
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input input-bordered w-full border-[#c493ff] focus:ring-2 focus:ring-[#c493ff]"
          required
        />
      </div>
      <div>
        <label className="block text-[#c493ff]">Payment Method:</label>
        <input
          type="text"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="input input-bordered w-full border-[#c493ff] focus:ring-2 focus:ring-[#c493ff]"
          required
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="btn bg-[#c493ff] text-white border-none hover:bg-[#a970e8]">
          Add Financial Record
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default AddFinancial;
