import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RequesterDashboard.css";

function RequesterDashboard() {

  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");

  // =========================================
  // BLOOD REQUEST STATE
  // =========================================

  const [bloodRequest, setBloodRequest] = useState(null);


  // =========================================
  // LOAD BLOOD REQUEST
  // =========================================

  useEffect(() => {

    const loadBloodRequest = () => {

      const savedRequest =
        localStorage.getItem("bloodRequest");

      if (savedRequest) {

        try {

          const request = JSON.parse(savedRequest);

          setBloodRequest(request);

        } catch (error) {

          console.error(
            "Error reading blood request:",
            error
          );

          setBloodRequest(null);

        }

      } else {

        setBloodRequest(null);

      }

    };


    // Load request when dashboard opens
    loadBloodRequest();


    // Check when localStorage changes
    window.addEventListener(
      "storage",
      loadBloodRequest
    );


    return () => {

      window.removeEventListener(
        "storage",
        loadBloodRequest
      );

    };

  }, []);


  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    navigate("/login");

  };


  // =========================================
  // CREATE BLOOD REQUEST
  // =========================================

  const handleCreateRequest = () => {

    navigate("/blood-request");

  };


  // =========================================
  // REQUEST COUNT
  // =========================================

  const activeRequests = bloodRequest ? 1 : 0;

  const pendingRequests =
    bloodRequest &&
    bloodRequest.status === "Pending"
      ? 1
      : 0;


  return (

    <div className="requester-dashboard">


      {/* ================= NAVBAR ================= */}

      <header className="requester-navbar">

        <div className="requester-logo">

          <Link to="/">
            Life<span>Link</span>
          </Link>

        </div>


        <nav className="requester-nav">

          <Link
            to="/requester-dashboard"
            className="active"
          >
            Dashboard
          </Link>

          <a href="#requests">
            My Requests
          </a>

          <a href="#donors">
            Find Donors
          </a>

          <a href="#notifications">
            Notifications
          </a>

        </nav>


        <div className="requester-user">

          <div className="user-avatar">

            {userEmail
              ? userEmail.charAt(0).toUpperCase()
              : "U"}

          </div>


          <div className="user-details">

            <strong>
              {userEmail || "User"}
            </strong>

            <span>
              Requester
            </span>

          </div>


          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* ================= MAIN CONTENT ================= */}

      <main className="requester-main">


        {/* ================= WELCOME ================= */}

        <section className="dashboard-welcome">

          <div>

            <p className="welcome-small">
              REQUESTER DASHBOARD
            </p>

            <h1>
              Welcome back!
            </h1>

            <p className="welcome-description">
              Manage your blood requests, find available donors,
              and track your request status.
            </p>

          </div>


          <button
            className="create-request-btn"
            onClick={handleCreateRequest}
          >

            <span>
              +
            </span>

            Create Blood Request

          </button>

        </section>


        {/* ================= STATISTICS ================= */}

        <section className="dashboard-stats">


          {/* ACTIVE REQUESTS */}

          <div className="stat-card">

            <div className="stat-icon">
              🩸
            </div>

            <div className="stat-content">

              <span>
                Active Requests
              </span>

              <strong>
                {String(activeRequests).padStart(2, "0")}
              </strong>

              <small>
                Currently active
              </small>

            </div>

          </div>


          {/* COMPLETED */}

          <div className="stat-card">

            <div className="stat-icon">
              ✓
            </div>

            <div className="stat-content">

              <span>
                Completed
              </span>

              <strong>
                05
              </strong>

              <small>
                Requests fulfilled
              </small>

            </div>

          </div>


          {/* DONOR RESPONSES */}

          <div className="stat-card">

            <div className="stat-icon">
              👥
            </div>

            <div className="stat-content">

              <span>
                Donor Responses
              </span>

              <strong>
                08
              </strong>

              <small>
                Responses received
              </small>

            </div>

          </div>


          {/* PENDING */}

          <div className="stat-card">

            <div className="stat-icon">
              ⏱
            </div>

            <div className="stat-content">

              <span>
                Pending
              </span>

              <strong>
                {String(pendingRequests).padStart(2, "0")}
              </strong>

              <small>
                Awaiting response
              </small>

            </div>

          </div>

        </section>


        {/* ================= CONTENT GRID ================= */}

        <section className="dashboard-grid">


          {/* ================= RECENT REQUESTS ================= */}

          <div
            className="dashboard-card requests-card"
            id="requests"
          >

            <div className="card-header">

              <div>

                <h2>
                  Recent Blood Requests
                </h2>

                <p>
                  Your latest blood requests
                </p>

              </div>


              <button className="view-all-btn">
                View All
              </button>

            </div>


            <div className="request-list">


              {/* ==================================
                  NEWLY CREATED REQUEST
              ================================== */}

              {bloodRequest && (

                <div className="request-item">

                  <div className="blood-type">
                    {bloodRequest.bloodGroup}
                  </div>


                  <div className="request-info">

                    <h3>
                      {bloodRequest.bloodGroup}
                      {" "}Blood Required
                    </h3>

                    <p>
                      {bloodRequest.hospital}
                    </p>

                    <span>
                      {bloodRequest.units} Pints •
                      {" "}
                      {bloodRequest.urgency}
                    </span>

                  </div>


                  <div
                    className={`request-status ${
                      bloodRequest.urgency === "Critical"
                        ? "urgent"
                        : "pending"
                    }`}
                  >
                    {bloodRequest.status}
                  </div>

                </div>

              )}


              {/* ==================================
                  OLD SAMPLE REQUEST
              ================================== */}

              <div className="request-item">

                <div className="blood-type">
                  A+
                </div>

                <div className="request-info">

                  <h3>
                    A+ Blood Required
                  </h3>

                  <p>
                    City Hospital • Kolkata
                  </p>

                  <span>
                    Requested 2 hours ago
                  </span>

                </div>

                <div className="request-status urgent">
                  Urgent
                </div>

              </div>


              {/* ==================================
                  OLD SAMPLE REQUEST
              ================================== */}

              <div className="request-item">

                <div className="blood-type">
                  O-
                </div>

                <div className="request-info">

                  <h3>
                    O- Blood Required
                  </h3>

                  <p>
                    Apollo Hospital • Kolkata
                  </p>

                  <span>
                    Requested yesterday
                  </span>

                </div>

                <div className="request-status pending">
                  Pending
                </div>

              </div>


              {/* ==================================
                  OLD SAMPLE REQUEST
              ================================== */}

              <div className="request-item">

                <div className="blood-type">
                  B+
                </div>

                <div className="request-info">

                  <h3>
                    B+ Blood Required
                  </h3>

                  <p>
                    AMRI Hospital • Kolkata
                  </p>

                  <span>
                    Requested 3 days ago
                  </span>

                </div>

                <div className="request-status completed">
                  Completed
                </div>

              </div>


            </div>

          </div>


          {/* ================= QUICK ACTIONS ================= */}

          <div className="dashboard-card quick-actions">

            <div className="card-header">

              <div>

                <h2>
                  Quick Actions
                </h2>

                <p>
                  Frequently used actions
                </p>

              </div>

            </div>


            <div className="action-list">


              {/* REQUEST BLOOD */}

              <button
                className="action-item"
                onClick={handleCreateRequest}
              >

                <div className="action-icon">
                  🩸
                </div>

                <div>

                  <strong>
                    Request Blood
                  </strong>

                  <span>
                    Create a new blood request
                  </span>

                </div>

                <b>
                  →
                </b>

              </button>


              {/* FIND DONORS */}

              <button className="action-item">

                <div className="action-icon">
                  👥
                </div>

                <div>

                  <strong>
                    Find Donors
                  </strong>

                  <span>
                    Search nearby donors
                  </span>

                </div>

                <b>
                  →
                </b>

              </button>


              {/* REQUEST HISTORY */}

              <button className="action-item">

                <div className="action-icon">
                  📋
                </div>

                <div>

                  <strong>
                    Request History
                  </strong>

                  <span>
                    View previous requests
                  </span>

                </div>

                <b>
                  →
                </b>

              </button>

            </div>

          </div>

        </section>


        {/* ================= BOTTOM SECTION ================= */}

        <section className="dashboard-bottom">


          {/* ================= DONOR RESPONSES ================= */}

          <div
            className="dashboard-card donor-responses"
            id="donors"
          >

            <div className="card-header">

              <div>

                <h2>
                  Recent Donor Responses
                </h2>

                <p>
                  Donors who responded to your requests
                </p>

              </div>

              <button className="view-all-btn">
                View All
              </button>

            </div>


            <div className="donor-table">

              <div className="table-header">

                <span>
                  DONOR
                </span>

                <span>
                  BLOOD TYPE
                </span>

                <span>
                  LOCATION
                </span>

                <span>
                  STATUS
                </span>

              </div>


              <div className="table-row">

                <div className="donor-name">

                  <div className="donor-avatar">
                    R
                  </div>

                  <strong>
                    Rahul Sharma
                  </strong>

                </div>

                <span>
                  A+
                </span>

                <span>
                  Salt Lake
                </span>

                <span className="available">
                  Available
                </span>

              </div>


              <div className="table-row">

                <div className="donor-name">

                  <div className="donor-avatar">
                    P
                  </div>

                  <strong>
                    Priya Das
                  </strong>

                </div>

                <span>
                  O-
                </span>

                <span>
                  New Town
                </span>

                <span className="available">
                  Available
                </span>

              </div>


              <div className="table-row">

                <div className="donor-name">

                  <div className="donor-avatar">
                    A
                  </div>

                  <strong>
                    Amit Roy
                  </strong>

                </div>

                <span>
                  B+
                </span>

                <span>
                  Park Street
                </span>

                <span className="responded">
                  Responded
                </span>

              </div>

            </div>

          </div>


          {/* ================= NOTIFICATIONS ================= */}

          <div
            className="dashboard-card notifications-card"
            id="notifications"
          >

            <div className="card-header">

              <div>

                <h2>
                  Notifications
                </h2>

                <p>
                  Recent updates
                </p>

              </div>

            </div>


            <div className="notification-list">

              <div className="notification-item">

                <div className="notification-dot"></div>

                <div>

                  <strong>
                    Donor responded
                  </strong>

                  <p>
                    Rahul Sharma responded to your A+ blood request.
                  </p>

                  <small>
                    20 minutes ago
                  </small>

                </div>

              </div>


              <div className="notification-item">

                <div className="notification-dot"></div>

                <div>

                  <strong>
                    Request updated
                  </strong>

                  <p>
                    Your O- blood request is still pending.
                  </p>

                  <small>
                    Yesterday
                  </small>

                </div>

              </div>


              <div className="notification-item">

                <div className="notification-dot"></div>

                <div>

                  <strong>
                    Request completed
                  </strong>

                  <p>
                    Your B+ blood request was fulfilled.
                  </p>

                  <small>
                    3 days ago
                  </small>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>

  );

}

export default RequesterDashboard;