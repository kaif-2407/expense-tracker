import React, { useState } from "react";
import { useExpenses } from "../../Context/ExpenseContext";

const ExpenseForm = () => {
  const { dispatch } = useExpenses();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !date) return;

    dispatch({
      type: "ADD",
      payload: {
        id: Date.now(),
        title,
        amount: Number(amount),
        category,
        date,
      },
    });

    // reset form
    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="font-bold mb-4 text-[#ff4ed9]">Add New Expense</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Expense description"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />

        <button
          type="submit"
          className="w-full bg-[#ff4ed9] text-white py-2 rounded-lg cursor-pointer"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
