import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import SigninPage from "./pages/SigninPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignupForm />} />
      <Route path="/signin" element={<SigninPage />} />
    </Routes>
  );
}

export default App;