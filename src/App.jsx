import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import RequesterDashboard from "./pages/RequesterDashboard/RequesterDashboard";
import BloodRequest from "./pages/BloodRequest/BloodRequest";

// Admin
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={<LandingPage />}
        />


        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ================= REGISTER ================= */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ================= REQUESTER DASHBOARD ================= */}

        <Route
          path="/requester-dashboard"
          element={<RequesterDashboard />}
        />


        {/* ================= BLOOD REQUEST ================= */}

        <Route
          path="/blood-request"
          element={<BloodRequest />}
        />


        {/* ================= ADMIN DASHBOARD ================= */}

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;