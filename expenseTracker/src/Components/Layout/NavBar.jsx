import { useAuth } from "../../Context/AuthContext";

export default function NavBar() {
  const { logout } = useAuth();

  return (
    <div className="fixed top-0 w-full bg-black text-white px-6 py-4 flex justify-between z-50">
      <h1 className="font-bold">ExpenseTracker</h1>
      <button className="cursor-pointer" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
