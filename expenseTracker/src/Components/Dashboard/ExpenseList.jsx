import React from "react";
import { useExpenses } from "../../Context/ExpenseContext";

const ExpenseList = () => {
  const { expenses, dispatch } = useExpenses();

  const handleDelete = (id) => {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
      <h2 className="font-semibold mb-4 text-[#fd4463]">Expense History</h2>

      <div className="max-h-72 overflow-y-auto scrollbar-hide">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-white text-gray-500 border-b">
            <tr>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Description</th>
              <th className="text-left py-2">Category</th>
              <th className="text-left py-2">Amount</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {expenses.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No expenses added yet
                </td>
              </tr>
            )}

            {expenses.map((exp) => (
              <tr key={exp.id} className="border-b hover:bg-gray-50">
                <td className="py-2 text-[#8908b1]">
                  {new Date(exp.date).toLocaleDateString()}
                </td>
                <td>{exp.title}</td>
                <td>{exp.category}</td>
                <td className="font-semibold text-[#ff4ed9]">₹{exp.amount}</td>
                <td
                  onClick={() => handleDelete(exp.id)}
                  className="cursor-pointer text-red-500"
                >
                  🗑️
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
