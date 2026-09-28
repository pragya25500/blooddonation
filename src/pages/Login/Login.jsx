import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if (
      email.trim() === "" ||
      password.trim() === ""
    ) {
      alert("Please enter email and password.");
      return;
    }

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    localStorage.setItem(
      "userEmail",
      email
    );

    alert("Login successful!");

    navigate("/requester-dashboard");
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* =========================================
            LEFT SIDE
        ========================================= */}

        <div className="login-left">

          <div className="login-brand">
            LifeLink
          </div>

          <h1>
            Your blood can
            <br />
            save a life.
          </h1>

          <p>
            Connect with people who need blood.
            Your one donation can make a difference.
          </p>

          <div className="login-info">

            <div className="info-item">
              <strong>24/7</strong>
              <span>Blood Requests</span>
            </div>

            <div className="info-item">
              <strong>1000+</strong>
              <span>Donors Connected</span>
            </div>

            <div className="info-item">
              <strong>100%</strong>
              <span>Community Driven</span>
            </div>

          </div>

        </div>


        {/* =========================================
            RIGHT SIDE
        ========================================= */}

        <div className="login-right">

          <div className="login-form-container">

            <h2>
              Welcome Back
            </h2>

            <p className="login-subtitle">
              Sign in to continue to your LifeLink account
            </p>


            {/* =====================================
                LOGIN FORM
            ===================================== */}

            <form onSubmit={handleLogin}>

              {/* EMAIL */}

              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                />

              </div>


              {/* PASSWORD */}

              <div className="form-group">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                />

              </div>


              {/* LOGIN OPTIONS */}

              <div className="login-options">

                <label className="remember">

                  <input
                    type="checkbox"
                  />

                  Remember me

                </label>

                <a href="#forgot-password">
                  Forgot Password?
                </a>

              </div>


              {/* SIGN IN BUTTON */}

              <button
                type="submit"
                className="login-btn"
              >
                Sign In
              </button>

            </form>


            {/* REGISTER LINK */}

            <div className="register-link">

              <span>
                Don't have an account?
              </span>

              <Link to="/register">
                Create Account
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;