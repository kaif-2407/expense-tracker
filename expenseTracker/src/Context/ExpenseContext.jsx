import { createContext, useContext, useReducer } from "react";
import { getFromStorage, saveToStorage } from "../Utils/storage";
import { useAuth } from "./AuthContext";

export const ExpenseContext = createContext();

const reducer = (state, action) => {
  let updated;
  switch (action.type) {
    case "ADD":
      updated = [...state, action.payload];
      return updated;
    case "DELETE":
      updated = state.filter((e) => e.id !== action.payload);
      return updated;
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const { user } = useAuth();
  const [expenses, dispatch] = useReducer(reducer, getFromStorage(user) || []);

  if (user) saveToStorage(user, expenses);

  return (
    <ExpenseContext.Provider value={{ expenses, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
