import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./LandingPage.css";

function LandingPage() {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");


  // ==================================================
  // CHECK LOGIN STATUS
  // ==================================================

  useEffect(() => {

    const loginStatus =
      localStorage.getItem("isLoggedIn");

    const storedName =
      localStorage.getItem("userName");

    setIsLoggedIn(loginStatus === "true");

    if (storedName) {
      setUserName(storedName);
    }

  }, []);


  // ==================================================
  // GO TO DASHBOARD
  // ==================================================

  const handleDashboard = () => {

    navigate("/requester-dashboard");

  };


  // ==================================================
  // LOGOUT
  // ==================================================

  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");

    setIsLoggedIn(false);
    setUserName("");

    alert("You have been logged out.");

  };


  // ==================================================
  // NEED BLOOD
  // ==================================================

  const handleNeedBlood = () => {

    if (isLoggedIn) {

      navigate("/requester-dashboard");

    } else {

      navigate("/login");

    }

  };


  // ==================================================
  // DONATE BLOOD
  // ==================================================

  const handleDonate = () => {

    navigate("/register");

  };


  return (
    <div className="app">


      {/* ==================================================
          NAVBAR
      ================================================== */}

      <header className="navbar">

        <div className="navbar-inner">


          {/* ================= LOGO ================= */}

          <div
            className="logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            LifeLink
          </div>


          {/* ================= NAVIGATION ================= */}

          <nav className="nav-menu">

            <a
              href="#home"
              className="nav-link active"
            >
              Home
            </a>

            <a
              href="#requests"
              className="nav-link"
            >
              Requests
            </a>

            <a
              href="#donate"
              className="nav-link"
            >
              Donate
            </a>

            <a
              href="#how-it-works"
              className="nav-link"
            >
              How It Works
            </a>

          </nav>


          {/* ==================================================
              RIGHT SIDE
          ================================================== */}

          <div className="nav-right">


            {/* ================= NOTIFICATIONS ================= */}

            <button
              className="notification-btn"
              type="button"
            >
              Notifications
            </button>


            {/* ==================================================
                LOGGED IN
            ================================================== */}

            {isLoggedIn ? (

              <>

                {/* OPTIONAL USER NAME */}

                {userName && (
                  <span className="welcome-user">
                    Hi, {userName}
                  </span>
                )}


                {/* DASHBOARD */}

                <button
                  className="signin-btn"
                  type="button"
                  onClick={handleDashboard}
                >
                  Dashboard
                </button>


                {/* LOGOUT */}

                <button
                  className="signin-btn"
                  type="button"
                  onClick={handleLogout}
                >
                  Log Out
                </button>

              </>


            ) : (


              /* ==================================================
                 LOGGED OUT
              ================================================== */

              <>

                {/* REGISTER */}

                <Link
                  to="/register"
                  className="nav-register-btn"
                >
                  Register
                </Link>


                {/* SIGN IN */}

                <Link
                  to="/login"
                  className="signin-btn"
                >
                  Sign In
                </Link>

              </>

            )}

          </div>

        </div>

      </header>


      {/* ==================================================
          HERO
      ================================================== */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-overlay"></div>

        <div className="hero-content">


          <div className="urgent-badge">

            <span></span>

            URGENT BLOOD NEED

          </div>


          <h1>

            Your blood can

            <strong>
              save a life.
            </strong>

          </h1>


          <p>
            Every donation can make a difference.
            Connect with people who need blood
            and help save lives in your community.
          </p>


          <div className="hero-buttons">


            <button
              className="primary-btn"
              type="button"
              onClick={handleDonate}
            >
              Donate Blood
            </button>


            <button
              className="secondary-btn"
              type="button"
              onClick={handleNeedBlood}
            >
              Need Blood
            </button>

          </div>

        </div>

      </section>


      {/* ==================================================
          STATS
      ================================================== */}

      <section className="stats-section">

        <div className="stats-container">


          <div className="stat">

            <h2>
              12,550+
            </h2>

            <p>
              Donors Registered
            </p>

          </div>


          <div className="stat">

            <h2 className="red">
              8,300
            </h2>

            <p>
              Lives Impacted
            </p>

          </div>


          <div className="stat">

            <h2>
              45 mins
            </h2>

            <p>
              Average response time
            </p>

          </div>


          <div className="stat">

            <h2>
              1,240
            </h2>

            <p>
              Blood Requests
            </p>

          </div>

        </div>

      </section>


      {/* ==================================================
          CONNECTION SECTION
      ================================================== */}

      <section className="connection-section">

        <div className="section-heading">

          <span>
            MAKE A DIFFERENCE
          </span>

          <h2>
            Connecting people when it matters most.
          </h2>

          <p>
            LifeLink connects blood donors with patients
            and hospitals when blood is urgently needed.
          </p>

        </div>


        <div className="connection-cards">


          {/* ================= DONOR CARD ================= */}

          <div
            className="connection-card"
            id="donate"
          >

            <div className="card-icon red-icon">
              +
            </div>

            <span className="card-label red-text">
              FOR DONORS
            </span>

            <h3>
              Donate Blood
            </h3>

            <p>
              Register as a donor and help someone in
              your community. Your donation could save
              up to three lives.
            </p>

            <button
              className="red-card-btn"
              type="button"
              onClick={handleDonate}
            >
              Become a Donor
            </button>

          </div>


          {/* ================= RECIPIENT CARD ================= */}

          <div
            className="connection-card"
            id="requests"
          >

            <div className="card-icon green-icon">
              ♥
            </div>

            <span className="card-label green-text">
              FOR RECIPIENTS
            </span>

            <h3>
              Need Blood
            </h3>

            <p>
              Submit a blood request and connect with
              nearby registered donors who can help.
            </p>

            <button
              className="green-card-btn"
              type="button"
              onClick={handleNeedBlood}
            >
              Request Blood
            </button>

          </div>

        </div>

      </section>


      {/* ==================================================
          HOW IT WORKS
      ================================================== */}

      <section
        className="how-section"
        id="how-it-works"
      >

        <div className="section-heading">

          <span>
            HOW IT WORKS
          </span>

          <h2>
            Simple steps,

            <strong>
              real impact.
            </strong>

          </h2>

          <p>
            Whether you're donating or requesting blood,
            LifeLink makes the process simple.
          </p>

        </div>


        <div className="steps-container">


          {/* ================= DONOR STEPS ================= */}

          <div>

            <h3 className="steps-title">
              For Donors
            </h3>


            <div className="step">

              <div className="step-number">
                01
              </div>

              <div>

                <h4>
                  Register
                </h4>

                <p>
                  Create your donor profile with your
                  blood group and location.
                </p>

              </div>

            </div>


            <div className="step">

              <div className="step-number">
                02
              </div>

              <div>

                <h4>
                  Find a Request
                </h4>

                <p>
                  Browse nearby blood requests that
                  match your blood group.
                </p>

              </div>

            </div>


            <div className="step">

              <div className="step-number">
                03
              </div>

              <div>

                <h4>
                  Donate
                </h4>

                <p>
                  Connect with the recipient or hospital
                  and complete your donation.
                </p>

              </div>

            </div>

          </div>


          {/* ================= RECIPIENT STEPS ================= */}

          <div>

            <h3 className="steps-title">
              For Recipients
            </h3>


            <div className="recipient-step">

              <div className="recipient-icon">
                01
              </div>

              <div>

                <h4>
                  Request Blood
                </h4>

                <p>
                  Submit your blood group and
                  requirement details.
                </p>

              </div>

            </div>


            <div className="recipient-step">

              <div className="recipient-icon">
                02
              </div>

              <div>

                <h4>
                  Get Matched
                </h4>

                <p>
                  Find compatible donors near your
                  location.
                </p>

              </div>

            </div>


            <div className="recipient-step">

              <div className="recipient-icon">
                03
              </div>

              <div>

                <h4>
                  Receive Help
                </h4>

                <p>
                  Coordinate with the donor or hospital
                  to receive the required blood.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          PARTNERS
      ================================================== */}

      <section className="partners-section">

        <div className="section-heading">

          <span>
            OUR NETWORK
          </span>

          <h2>
            Trusted healthcare

            <strong>
              partners.
            </strong>

          </h2>

          <p>
            Working together with healthcare organizations
            to make blood donation more accessible.
          </p>

        </div>


        <div className="partners">

          <div>
            City Hospital
          </div>

          <div>
            MedCare Center
          </div>

          <div>
            LifeLine Hospital
          </div>

          <div>
            HealthFirst
          </div>

        </div>

      </section>


      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="footer">

        <div className="footer-container">


          {/* ================= BRAND ================= */}

          <div className="footer-brand">

            <h2>
              LifeLink
            </h2>

            <p>
              Connecting blood donors with people
              who need them, one donation at a time.
            </p>

            <span>
              Emergency Helpline
            </span>

            <strong>
              1800-123-4567
            </strong>

          </div>


          {/* ================= QUICK LINKS ================= */}

          <div>

            <h3>
              Quick Links
            </h3>

            <a href="#home">
              Home
            </a>

            <a href="#requests">
              Requests
            </a>

            <a href="#donate">
              Donate
            </a>

            <a href="#how-it-works">
              How It Works
            </a>

          </div>


          {/* ================= SUPPORT ================= */}

          <div>

            <h3>
              Support
            </h3>

            <a href="#">
              Contact Us
            </a>

            <a href="#">
              FAQ
            </a>

            <a href="#">
              Privacy Policy
            </a>

            <a href="#">
              Terms
            </a>

          </div>


          {/* ================= GET STARTED ================= */}

          <div>

            <h3>
              Get Started
            </h3>

            <p>
              Ready to help save a life?
              Join our donor community today.
            </p>

            <button
              className="footer-btn"
              type="button"
              onClick={handleDonate}
            >
              Become a Donor
            </button>

          </div>

        </div>


        {/* ================= FOOTER BOTTOM ================= */}

        <div className="footer-bottom">

          <p>
            © 2026 LifeLink. All rights reserved.
          </p>

          <div>

            <a href="#">
              Privacy
            </a>

            <a href="#">
              Terms
            </a>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default LandingPage;