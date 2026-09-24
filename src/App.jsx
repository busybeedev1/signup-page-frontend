import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import SigninPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignupForm />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;