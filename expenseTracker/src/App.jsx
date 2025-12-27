import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashBoard from "./Pages/DashBoard";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/Layout/ProtectedRoute";
import { useAuth } from "./Context/AuthContext";
import Signup from "./Pages/Signup";

const Protected = ({ children }) => {
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  const { user } = useAuth();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={user ? <DashBoard /> : <Navigate to="login" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
