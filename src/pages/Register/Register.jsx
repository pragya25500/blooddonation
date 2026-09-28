import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();

    // Check required fields
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      location.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Check password
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Get existing donors
    const existingDonors =
      JSON.parse(localStorage.getItem("donors")) || [];

    // Check if email already exists
    const emailAlreadyExists = existingDonors.some(
      (donor) =>
        donor.email.toLowerCase() === email.toLowerCase()
    );

    if (emailAlreadyExists) {
      alert("An account with this email already exists.");
      return;
    }

    // Create new donor
    const newDonor = {
      id: Date.now(),

      name: name.trim(),

      email: email.trim(),

      phone: phone.trim(),

      bloodGroup: bloodGroup,

      location: location.trim(),

      available: true,

      role: "donor",
    };

    // Save donor
    localStorage.setItem(
      "donors",
      JSON.stringify([
        ...existingDonors,
        newDonor,
      ])
    );

    // Save current user information
    localStorage.setItem(
      "userName",
      name.trim()
    );

    localStorage.setItem(
      "userEmail",
      email.trim()
    );

    localStorage.setItem(
      "userPhone",
      phone.trim()
    );

    localStorage.setItem(
      "userBloodGroup",
      bloodGroup
    );

    localStorage.setItem(
      "userLocation",
      location.trim()
    );

    localStorage.setItem(
      "isLoggedIn",
      "false"
    );

    alert(
      "Donor account created successfully!"
    );

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
            Create your account and become a
            donor who can help save lives when
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
              Register as a blood donor
            </p>


            {/* =====================================
                REGISTER FORM
            ===================================== */}

            <form onSubmit={handleRegister}>

              {/* FULL NAME */}

              <div className="form-group">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
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

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
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

                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                />

              </div>


              {/* BLOOD GROUP */}

              <div className="form-group">

                <label htmlFor="bloodGroup">
                  Blood Group
                </label>

                <select
                  id="bloodGroup"
                  value={bloodGroup}
                  onChange={(event) =>
                    setBloodGroup(event.target.value)
                  }
                >

                  <option value="A+">
                    A+
                  </option>

                  <option value="A-">
                    A-
                  </option>

                  <option value="B+">
                    B+
                  </option>

                  <option value="B-">
                    B-
                  </option>

                  <option value="AB+">
                    AB+
                  </option>

                  <option value="AB-">
                    AB-
                  </option>

                  <option value="O+">
                    O+
                  </option>

                  <option value="O-">
                    O-
                  </option>

                </select>

              </div>


              {/* LOCATION */}

              <div className="form-group">

                <label htmlFor="location">
                  Your Location
                </label>

                <input
                  id="location"
                  type="text"
                  placeholder="Example: Kolkata"
                  value={location}
                  onChange={(event) =>
                    setLocation(event.target.value)
                  }
                />

              </div>


              {/* PASSWORD */}

              <div className="form-group">

                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
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

                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
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
                Create Donor Account
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