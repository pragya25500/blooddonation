import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [bloodRequest, setBloodRequest] = useState(null);

  const loadRequest = () => {
    const savedRequest = localStorage.getItem("bloodRequest");

    if (!savedRequest) {
      setBloodRequest(null);
      return;
    }

    try {
      setBloodRequest(JSON.parse(savedRequest));
    } catch (error) {
      console.error("Error reading blood request:", error);
      setBloodRequest(null);
    }
  };

  useEffect(() => {
    loadRequest();

    window.addEventListener("storage", loadRequest);

    return () => {
      window.removeEventListener("storage", loadRequest);
    };
  }, []);

  const activeRequests = bloodRequest ? 48 : 47;

  return (
    <div className="admin-dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside className="admin-sidebar">

        <div className="admin-logo">
          <span className="logo-icon">✚</span>
          <span>
            Life<span>Link</span>
          </span>
        </div>

        <nav className="admin-navigation">

          <NavLink
            to="/admin-dashboard"
            end
            className={({ isActive }) =>
              `admin-nav-item ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">▦</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/admin-dashboard/requests"
            className="admin-nav-item"
          >
            <span className="nav-icon">☰</span>
            Active Requests
          </NavLink>

          <NavLink
            to="/admin-dashboard/donors"
            className="admin-nav-item"
          >
            <span className="nav-icon">♧</span>
            Donors
          </NavLink>

          <NavLink
            to="/admin-dashboard/alerts"
            className="admin-nav-item"
          >
            <span className="nav-icon">△</span>
            Alerts
          </NavLink>

          <NavLink
            to="/admin-dashboard/reports"
            className="admin-nav-item"
          >
            <span className="nav-icon">▥</span>
            Reports
          </NavLink>

        </nav>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="admin-main">

        {/* HEADER */}

        <header className="admin-header">

          <div />

          <button className="notification-button">
            ♧
            <span className="notification-badge">5</span>
          </button>

        </header>


        {/* CONTENT */}

        <div className="admin-content">

          {/* ================= TITLE ================= */}

          <section className="admin-title">

            <div>
              <h1>Overview</h1>

              <p>
                Real-time network status.
              </p>
            </div>

          </section>


          {/* ================= STATISTICS ================= */}

          <section className="admin-stats">

            {/* ACTIVE REQUESTS */}

            <div className="admin-stat-card">

              <div className="stat-text">

                <span>
                  Active Requests
                </span>

                <strong>
                  {activeRequests}
                </strong>

              </div>

              <div className="stat-box request-stat">
                ♥
              </div>

            </div>


            {/* AVAILABLE DONORS */}

            <div className="admin-stat-card">

              <div className="stat-text">

                <span>
                  Available Donors
                </span>

                <strong>
                  1,240
                </strong>

              </div>

              <div className="stat-box donor-stat">
                ♡
              </div>

            </div>


            {/* CRITICAL ALERTS */}

            <div className="admin-stat-card critical-card">

              <div className="stat-text">

                <span>
                  Critical Alerts
                </span>

                <strong>
                  5
                </strong>

              </div>

              <div className="stat-box alert-stat">
                △
              </div>

            </div>


            {/* DONATIONS */}

            <div className="admin-stat-card">

              <div className="stat-text">

                <span>
                  Donations Today
                </span>

                <strong>
                  12
                </strong>

              </div>

              <div className="stat-box donation-stat">
                ✚
              </div>

            </div>

          </section>


          {/* ================= MAP ================= */}

          <section className="map-card">

            <div className="map-header">

              <h2>
                <span>▧</span>
                Live Density Map
              </h2>

            </div>

            <div className="map-container">

              <div className="fake-map">

                {/* MAP ROADS */}

                <div className="road road-one" />
                <div className="road road-two" />
                <div className="road road-three" />
                <div className="road road-four" />

                {/* MAP WATER */}

                <div className="water water-one" />
                <div className="water water-two" />

                {/* MAP LABELS */}

                <span className="map-label label-one">
                  City General
                </span>

                <span className="map-label label-two">
                  St. Mary's
                </span>

                <span className="map-label label-three">
                  Mercy Hospital
                </span>

                <span className="map-label label-four">
                  Children's Hospital
                </span>


                {/* CRITICAL LOCATIONS */}

                <div className="map-marker critical-marker marker-one" />
                <div className="map-marker critical-marker marker-two" />
                <div className="map-marker critical-marker marker-three" />
                <div className="map-marker critical-marker marker-four" />
                <div className="map-marker critical-marker marker-five" />


                {/* AVAILABLE DONORS */}

                <div className="map-marker donor-marker donor-one" />
                <div className="map-marker donor-marker donor-two" />
                <div className="map-marker donor-marker donor-three" />
                <div className="map-marker donor-marker donor-four" />
                <div className="map-marker donor-marker donor-five" />
                <div className="map-marker donor-marker donor-six" />
                <div className="map-marker donor-marker donor-seven" />

              </div>


              {/* MAP SIDE PANEL */}

              <div className="map-panel">

                <h3>
                  Active Alerts
                </h3>

                <span className="alert-count">
                  5 Critical Requests
                </span>

                <div className="map-alert critical">
                  <strong>
                    O- Critical
                  </strong>

                  <span>
                    Mercy General
                  </span>
                </div>

                <div className="map-alert high">
                  <strong>
                    H3 Type
                  </strong>

                  <span>
                    City Hospital
                  </span>
                </div>


                <div className="fleet-box">

                  <h3>
                    Fleet
                  </h3>

                  <div>
                    <strong>
                      48
                    </strong>

                    <span>
                      Vehicles
                    </span>
                  </div>

                  <div>
                    <strong>
                      12
                    </strong>

                    <span>
                      Drones Active
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* ================= RECENT REQUESTS ================= */}

          <section className="recent-card">

            <div className="recent-title">
              <h2>
                Recent Requests
              </h2>
            </div>


            <div className="request-table">

              <div className="request-table-header">

                <span>TIME</span>
                <span>BLOOD GROUP</span>
                <span>URGENCY</span>
                <span>HOSPITAL</span>
                <span>STATUS</span>

              </div>


              {/* NEW REQUEST */}

              {bloodRequest && (

                <div className="request-table-row">

                  <span>
                    Just now
                  </span>

                  <strong className="blood-group">
                    {bloodRequest.bloodGroup}
                  </strong>

                  <span>
                    <b
                      className={
                        bloodRequest.urgency === "Critical"
                          ? "urgency critical"
                          : "urgency high"
                      }
                    >
                      {bloodRequest.urgency}
                    </b>
                  </span>

                  <span>
                    {bloodRequest.hospital}
                  </span>

                  <span className="status searching">
                    {bloodRequest.status || "Searching..."}
                  </span>

                </div>

              )}


              {/* SAMPLE REQUEST */}

              <div className="request-table-row">

                <span>
                  10:15 AM
                </span>

                <strong className="blood-group">
                  A+
                </strong>

                <span>
                  <b className="urgency high">
                    High
                  </b>
                </span>

                <span>
                  St. Jude's ✓
                </span>

                <span className="status matched">
                  Donor Matched
                </span>

              </div>


              {/* SAMPLE REQUEST */}

              <div className="request-table-row">

                <span>
                  09:30 AM
                </span>

                <strong className="blood-group">
                  B-
                </strong>

                <span>
                  <b className="urgency normal">
                    Normal
                  </b>
                </span>

                <span>
                  City Hospital
                </span>

                <span className="status pending-status">
                  Pending
                </span>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;