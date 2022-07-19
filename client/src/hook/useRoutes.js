// importing dependencies
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// ===------------------------------------------

// importing pages=====================
import MainPage from "pages/MainPage";
import Login from "pages/Login";
import Registration from "pages/Registration";

export const UseRoutes = (isLogined) => {
  if (isLogined) {
    return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  if (!isLogined) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }
};
