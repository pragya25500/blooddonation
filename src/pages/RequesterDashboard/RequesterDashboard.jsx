import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./RequesterDashboard.css";

function RequesterDashboard() {

  const navigate = useNavigate();


  /* =========================================================
     USER
  ========================================================= */

  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || "Requester"
  );

  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || "user@gmail.com"
  );


  /* =========================================================
     BLOOD REQUEST
  ========================================================= */

  const [bloodRequest, setBloodRequest] = useState(() => {

    const saved =
      localStorage.getItem("bloodRequest");

    if (!saved) {
      return null;
    }

    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }

  });


  /* =========================================================
     LOAD DASHBOARD DATA
  ========================================================= */

  const loadDashboard = () => {

    setUserName(
      localStorage.getItem("userName") ||
      "Requester"
    );

    setUserEmail(
      localStorage.getItem("userEmail") ||
      "user@gmail.com"
    );


    const saved =
      localStorage.getItem("bloodRequest");

    if (!saved) {
      setBloodRequest(null);
      return;
    }


    try {

      setBloodRequest(
        JSON.parse(saved)
      );

    } catch {

      setBloodRequest(null);

    }

  };


  /* =========================================================
     DASHBOARD UPDATE LISTENER
  ========================================================= */

  useEffect(() => {

    window.addEventListener(
      "storage",
      loadDashboard
    );

    window.addEventListener(
      "bloodRequestUpdated",
      loadDashboard
    );


    /*
      Reload when dashboard becomes active again.
    */

    const handleFocus = () => {
      loadDashboard();
    };

    window.addEventListener(
      "focus",
      handleFocus
    );


    return () => {

      window.removeEventListener(
        "storage",
        loadDashboard
      );

      window.removeEventListener(
        "bloodRequestUpdated",
        loadDashboard
      );

      window.removeEventListener(
        "focus",
        handleFocus
      );

    };

  }, []);


  /* =========================================================
     CREATE REQUEST
  ========================================================= */

  const handleCreateRequest = () => {

    navigate("/blood-request");

  };


  /* =========================================================
     OPEN MATCHING
  ========================================================= */

  const handleFindDonors = () => {

    if (!bloodRequest) {

      navigate("/blood-request");

      return;
    }


    navigate(
      "/donor-status",
      {
        state: {
          ...bloodRequest,
          stage: "matching",
        },
      }
    );

  };


  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {

    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    navigate("/login");

  };


  /* =========================================================
     REQUEST VALUES
  ========================================================= */

  const requestBloodGroup =
    bloodRequest?.bloodGroup || "O+";

  const requestHospital =
    bloodRequest?.hospital ||
    "City General Hospital";

  const requestLocation =
    bloodRequest?.location ||
    "Kolkata";

  const requestUrgency =
    bloodRequest?.urgency ||
    "Urgent";


  /* =========================================================
     MATCHING STATUS
  ========================================================= */

  const isMatched =
    bloodRequest?.status === "MATCHED" ||
    bloodRequest?.matched === true;

  const donorsFound =
    bloodRequest?.donorsFound ||
    0;

  const donorResponses =
    bloodRequest?.donorResponses ||
    0;

  const pendingDonors =
    bloodRequest?.pendingDonors ||
    0;


  /* =========================================================
     DONORS
  ========================================================= */

  const donors = bloodRequest?.donors || [];


  /* =========================================================
     ACCEPTED DONOR
  ========================================================= */

  const acceptedDonor =
    donors.find(
      (donor) =>
        donor.status === "ACCEPTED"
    ) || null;


  /* =========================================================
     NOTIFICATIONS
  ========================================================= */

  const notifications = [

    {
      title:
        isMatched
          ? "Donors matched"
          : "Finding donors",

      message:
        isMatched
          ? `${donorsFound} compatible donors were found near ${requestLocation}.`
          : `${requestBloodGroup} blood request is currently being matched.`,

      time:
        isMatched
          ? "Just now"
          : "Recently",

      type:
        isMatched
          ? "success"
          : "info",
    },


    ...(acceptedDonor
      ? [
          {
            title:
              "Donor accepted",

            message:
              `${acceptedDonor.name} accepted your blood request.`,

            time:
              "Just now",

            type:
              "success",
          },
        ]
      : []),


    {
      title:
        "Request location",

      message:
        `${requestHospital} • ${requestLocation}`,

      time:
        "Today",

      type:
        "warning",
    },

  ];


  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <div className="requester-dashboard">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="requester-header">

        <Link
          to="/"
          className="dashboard-brand"
        >
          LifeLink
        </Link>


        <nav className="dashboard-navigation">

          <Link
            to="/requester-dashboard"
            className="active"
          >
            Dashboard
          </Link>


          <button
            type="button"
            onClick={handleFindDonors}
          >
            My Requests
          </button>


          <button
            type="button"
            onClick={handleFindDonors}
          >
            Find Donors
          </button>


          <button
            type="button"
            onClick={handleFindDonors}
          >
            Notifications
          </button>

        </nav>


        <div className="dashboard-account">

          <div className="account-avatar">
            {userName
              .charAt(0)
              .toUpperCase()}
          </div>


          <div className="account-details">

            <strong>
              {userEmail}
            </strong>

          </div>


          <button
            className="logout-button"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="dashboard-content">


        {/* ===================================================
            WELCOME
        =================================================== */}

        <section className="welcome-section">

          <div>

            <span className="dashboard-label">
              REQUESTER DASHBOARD
            </span>


            <h1>
              Welcome back,{" "}
              {userName.split(" ")[0]}!
            </h1>


            <p>
              Manage your blood requests,
              find available donors, and
              track your matching status.
            </p>

          </div>


          <button
            className="create-request-button"
            onClick={handleCreateRequest}
          >
            <span>+</span>
            Create Blood Request
          </button>

        </section>


        {/* ===================================================
            MATCHED SUCCESS BANNER
        =================================================== */}

        {isMatched && (
          <section className="matched-banner">

            <div className="matched-banner-icon">
              ✓
            </div>


            <div className="matched-banner-content">

              <span>
                DONOR MATCHING COMPLETE
              </span>

              <h2>
                Nearby donors found for {requestBloodGroup}
              </h2>

              <p>
                {donorsFound} compatible donors
                are available near {requestLocation}.
              </p>

            </div>


            <button
              type="button"
              onClick={handleFindDonors}
            >
              View Matches →
            </button>

          </section>
        )}


        {/* ===================================================
            STATISTICS
        =================================================== */}

        <section className="stats-grid">


          <div className="stat-card">

            <div className="stat-icon">
              ♥
            </div>

            <div>

              <span>
                Active Requests
              </span>

              <strong>
                {bloodRequest ? "01" : "00"}
              </strong>

              <small>
                Currently active
              </small>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              ✓
            </div>

            <div>

              <span>
                Donors Found
              </span>

              <strong>
                {isMatched
                  ? String(donorsFound).padStart(2, "0")
                  : "00"}
              </strong>

              <small>
                Nearby matches
              </small>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              ♟
            </div>

            <div>

              <span>
                Donor Responses
              </span>

              <strong>
                {isMatched
                  ? String(donorResponses).padStart(2, "0")
                  : "00"}
              </strong>

              <small>
                Responses received
              </small>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              ◷
            </div>

            <div>

              <span>
                Pending
              </span>

              <strong>
                {isMatched
                  ? String(pendingDonors).padStart(2, "0")
                  : "00"}
              </strong>

              <small>
                Awaiting response
              </small>

            </div>

          </div>

        </section>


        {/* ===================================================
            TOP GRID
        =================================================== */}

        <section className="dashboard-grid">


          {/* =================================================
              RECENT REQUESTS
          ================================================= */}

          <div className="dashboard-card requests-card">

            <div className="card-header">

              <div>

                <h2>
                  Recent Blood Requests
                </h2>

                <p>
                  Your latest blood requests
                </p>

              </div>


              <button
                type="button"
                onClick={handleFindDonors}
              >
                View All
              </button>

            </div>


            {bloodRequest ? (

              <div className="request-list">

                <article
                  className="request-row"
                  onClick={handleFindDonors}
                >

                  <div className="blood-type-circle">
                    {requestBloodGroup}
                  </div>


                  <div className="request-details">

                    <h3>
                      {requestBloodGroup}
                      {" "}
                      Blood Required
                    </h3>

                    <p>
                      {requestHospital}
                      {" • "}
                      {requestLocation}
                    </p>

                    <small>
                      Requested today
                    </small>

                  </div>


                  <span
                    className={
                      isMatched
                        ? "request-status matched"
                        : "request-status"
                    }
                  >
                    {isMatched
                      ? "Matched"
                      : requestUrgency}
                  </span>

                </article>


                <article className="request-row">

                  <div className="blood-type-circle">
                    O-
                  </div>

                  <div className="request-details">

                    <h3>
                      O- Blood Required
                    </h3>

                    <p>
                      Apollo Hospital • Kolkata
                    </p>

                    <small>
                      Requested yesterday
                    </small>

                  </div>

                  <span className="request-status pending">
                    Pending
                  </span>

                </article>


                <article className="request-row">

                  <div className="blood-type-circle">
                    B+
                  </div>

                  <div className="request-details">

                    <h3>
                      B+ Blood Required
                    </h3>

                    <p>
                      AMRI Hospital • Kolkata
                    </p>

                    <small>
                      Requested 3 days ago
                    </small>

                  </div>

                  <span className="request-status completed">
                    Completed
                  </span>

                </article>

              </div>

            ) : (

              <div className="no-request">

                <div>
                  ♥
                </div>

                <h3>
                  No active blood request
                </h3>

                <p>
                  Create a request to start
                  finding nearby donors.
                </p>

                <button
                  onClick={handleCreateRequest}
                >
                  Create Request
                </button>

              </div>

            )}

          </div>


          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <div className="dashboard-card quick-actions-card">

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


            <div className="quick-actions">

              <button
                className="quick-action"
                onClick={handleCreateRequest}
              >

                <div className="quick-icon">
                  ♥
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


              <button
                className="quick-action"
                onClick={handleFindDonors}
              >

                <div className="quick-icon">
                  ◎
                </div>

                <div>

                  <strong>
                    Find Donors
                  </strong>

                  <span>
                    View nearby compatible donors
                  </span>

                </div>

                <b>
                  →
                </b>

              </button>


              <button
                className="quick-action"
                onClick={handleFindDonors}
              >

                <div className="quick-icon">
                  ◉
                </div>

                <div>

                  <strong>
                    Track Matching
                  </strong>

                  <span>
                    See donor matching on the map
                  </span>

                </div>

                <b>
                  →
                </b>

              </button>


              <button
                className="quick-action"
              >

                <div className="quick-icon">
                  ▣
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


        {/* ===================================================
            BOTTOM GRID
        =================================================== */}

        <section className="dashboard-grid bottom-grid">


          {/* =================================================
              DONOR RESPONSES
          ================================================= */}

          <div className="dashboard-card donor-responses-card">

            <div className="card-header">

              <div>

                <h2>
                  Nearby Donor Matches
                </h2>

                <p>
                  Donors responding to your request
                </p>

              </div>


              <button
                type="button"
                onClick={handleFindDonors}
              >
                View All
              </button>

            </div>


            {isMatched ? (

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


                {donors.map((donor) => (

                  <div
                    className="donor-table-row"
                    key={donor.id}
                    onClick={handleFindDonors}
                  >

                    <div className="donor-name">

                      <div className="small-avatar">
                        {donor.initials}
                      </div>

                      <strong>
                        {donor.name}
                      </strong>

                    </div>


                    <span>
                      {requestBloodGroup}
                    </span>


                    <span>
                      {donor.location}
                    </span>


                    <span>

                      <b
                        className={
                          donor.status === "ACCEPTED"
                            ? "available-status"
                            : "responded-status"
                        }
                      >
                        {donor.status === "ACCEPTED"
                          ? "Accepted"
                          : "Notified"}
                      </b>

                    </span>

                  </div>

                ))}

              </div>

            ) : (

              <div className="no-request">

                <div>
                  ◎
                </div>

                <h3>
                  Finding nearby donors
                </h3>

                <p>
                  Donor matching is currently
                  in progress.
                </p>

                <button
                  onClick={handleFindDonors}
                >
                  View Matching
                </button>

              </div>

            )}

          </div>


          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          <div className="dashboard-card notifications-card">

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


            <div className="notifications-list">

              {notifications.map(
                (notification, index) => (

                  <article
                    className="notification-item"
                    key={index}
                  >

                    <div
                      className={
                        `notification-dot ${
                          notification.type
                        }`
                      }
                    >
                      ●
                    </div>


                    <div>

                      <strong>
                        {notification.title}
                      </strong>

                      <p>
                        {notification.message}
                      </p>

                      <small>
                        {notification.time}
                      </small>

                    </div>

                  </article>

                )
              )}

            </div>

          </div>

        </section>


      </main>

    </div>

  );
}

export default RequesterDashboard;