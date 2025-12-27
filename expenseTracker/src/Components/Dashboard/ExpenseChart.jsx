import React, { useMemo, useState } from "react";
import { useExpenses } from "../../Context/ExpenseContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#9c89fa", "#ff8a5b", "#4caf50", "#fd4463"];

const ExpenseChart = () => {
  const { expenses } = useExpenses();
  const [chartType, setChartType] = useState("pie");

  // -------- PIE DATA (Category wise) --------
  const pieData = useMemo(() => {
    const map = {};

    expenses.forEach((exp) => {
      map[exp.category] = (map[exp.category] || 0) + exp.amount;
    });

    return Object.keys(map).map((key) => ({
      name: key,
      value: map[key],
    }));
  }, [expenses]);

  // -------- BAR DATA (Monthly total) --------
  const barData = useMemo(() => {
    const map = {};

    expenses.forEach((exp) => {
      const month = new Date(exp.date).toLocaleString("default", {
        month: "short",
      });

      map[month] = (map[month] || 0) + exp.amount;
    });

    return Object.keys(map).map((key) => ({
      month: key,
      total: map[key],
    }));
  }, [expenses]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="font-semibold mb-4 text-[#9c89fa]">Expenses Chart</h2>

      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setChartType("pie")}
          className={`px-3 py-1 rounded-md text-sm ${
            chartType === "pie" ? "bg-[#9c89fa] text-white" : "bg-gray-200"
          }`}
        >
          Pie Chart
        </button>

        <button
          onClick={() => setChartType("bar")}
          className={`px-3 py-1 rounded-md text-sm ${
            chartType === "bar" ? "bg-[#9c89fa] text-white" : "bg-gray-200"
          }`}
        >
          Bar Chart
        </button>
      </div>

      <div className="h-64">
        {chartType === "pie" && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}

        {chartType === "bar" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#9c89fa" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;
