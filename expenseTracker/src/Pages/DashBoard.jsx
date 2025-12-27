import NavBar from "../Components/Layout/NavBar";
import StatsCard from "../Components/Dashboard/StatsCard";
import ExpenseForm from "../Components/Dashboard/ExpenseForm";
import ExpenseList from "../Components/Dashboard/ExpenseList";
import ExpenseChart from "../Components/Dashboard/ExpenseChart";
import { useExpenses } from "../Context/ExpenseContext";
import { useMemo } from "react";

export default function Dashboard() {
  const { expenses } = useExpenses();

  const stats = useMemo(() => {
    let total = 0;
    const map = {};
    expenses.forEach((e) => {
      total += e.amount;
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    const highest =
      Object.keys(map).length === 0
        ? "—"
        : Object.entries(map).reduce((a, b) => (a[1] > b[1] ? a : b))[0];

    return {
      total,
      count: expenses.length,
      highest,
    };
  }, [expenses]);

  return (
    <>
      <NavBar />
      <div className="pt-24 p-6 space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <StatsCard title="Total Expense" value={`₹${stats.total}`} />
          <StatsCard title="Highest Category" value={stats.highest} />
          <StatsCard title="Total Entries" value={stats.count} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ExpenseChart />
          </div>
          <ExpenseForm />
        </div>

        <ExpenseList />
      </div>
    </>
  );
}
