import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    localStorage.setItem(
      "userName",
      name
    );

    localStorage.setItem(
      "userEmail",
      email
    );

    alert("Account created successfully!");

    navigate("/login");
  };

  return (
    <div className="register-page">

      <div className="register-container">

        {/* =========================================
            LEFT SIDE
        ========================================= */}

        <div className="register-left">

          <div className="register-brand">
            LifeLink
          </div>

          <h1>
            Join the
            <br />
            LifeLink community.
          </h1>

          <p>
            Create your account and connect
            with people who need blood when
            it matters most.
          </p>

          <div className="register-info">

            <div className="register-info-item">

              <strong>
                Donate
              </strong>

              <span>
                Help save lives
              </span>

            </div>

            <div className="register-info-item">

              <strong>
                Request
              </strong>

              <span>
                Find blood quickly
              </span>

            </div>

            <div className="register-info-item">

              <strong>
                Connect
              </strong>

              <span>
                Build a caring community
              </span>

            </div>

          </div>

        </div>


        {/* =========================================
            RIGHT SIDE
        ========================================= */}

        <div className="register-right">

          <div className="register-form-container">

            <h2>
              Create Account
            </h2>

            <p className="register-subtitle">
              Register to get started with LifeLink
            </p>


            {/* =====================================
                REGISTER FORM
            ===================================== */}

            <form onSubmit={handleRegister}>

              {/* FULL NAME */}

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                />

              </div>


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


              {/* PHONE */}

              <div className="form-group">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
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
                  placeholder="Create a password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                />

              </div>


              {/* CONFIRM PASSWORD */}

              <div className="form-group">

                <label>
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                />

              </div>


              {/* REGISTER BUTTON */}

              <button
                type="submit"
                className="register-btn"
              >
                Create Account
              </button>

            </form>


            {/* LOGIN LINK */}

            <div className="login-link">

              <span>
                Already have an account?
              </span>

              <Link to="/login">
                Sign In
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;