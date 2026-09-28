import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import RequesterDashboard from "./pages/RequesterDashboard/RequesterDashboard";
import BloodRequest from "./pages/BloodRequest/BloodRequest";
import DonorStatus from "./pages/DonorStatus/DonorStatus";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* AUTH */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* DASHBOARD */}
        <Route
          path="/requester-dashboard"
          element={<RequesterDashboard />}
        />

        {/* BLOOD REQUEST */}
        <Route
          path="/blood-request"
          element={<BloodRequest />}
        />

        {/* DONOR MATCHING */}
        <Route
          path="/donor-status"
          element={<DonorStatus />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;