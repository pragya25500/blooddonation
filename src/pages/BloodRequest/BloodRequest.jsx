import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./BloodRequest.css";

function BloodRequest() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "O+",
    units: 3,
    hospital: "",
    location: "",
    contact: "",
    urgency: "Critical",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const selectBloodGroup = (group) => {
    setFormData((previous) => ({
      ...previous,
      bloodGroup: group,
    }));

    setError("");
  };

  const selectUrgency = (urgency) => {
    setFormData((previous) => ({
      ...previous,
      urgency,
    }));

    setError("");
  };

  const increaseUnits = () => {
    setFormData((previous) => ({
      ...previous,
      units: Math.min(Number(previous.units) + 1, 10),
    }));
  };

  const decreaseUnits = () => {
    setFormData((previous) => ({
      ...previous,
      units: Math.max(Number(previous.units) - 1, 1),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.patientName.trim() ||
      !formData.hospital.trim() ||
      !formData.location.trim() ||
      !formData.contact.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const request = {
      patientName: formData.patientName.trim(),
      bloodGroup: formData.bloodGroup,
      units: Number(formData.units),
      hospital: formData.hospital.trim(),
      location: formData.location.trim(),
      contact: formData.contact.trim(),
      urgency: formData.urgency,

      // Dashboard status
      status: "MATCHING",
      matched: false,
      createdAt: new Date().toISOString(),
    };

    /*
      Save request so the Requester Dashboard
      can display it after matching.
    */
    localStorage.setItem(
      "bloodRequest",
      JSON.stringify(request)
    );

    /*
      Remove old donor matching data
      whenever a new request is created.
    */
    localStorage.removeItem("matchedDonors");

    /*
      Notify dashboard if it is currently mounted.
    */
    window.dispatchEvent(
      new Event("bloodRequestUpdated")
    );

    /*
      Send request directly to DonorStatus.
    */
    navigate("/donor-status", {
      state: {
        ...request,
        stage: "searching",
      },
    });
  };

  return (
    <div className="blood-request-page">

      {/* ================= HEADER ================= */}

      <header className="blood-request-header">

        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          ←
        </button>

        <div className="blood-request-header-title">
          Emergency Request
        </div>

        <div className="header-spacer"></div>

      </header>

      {/* ================= MAIN ================= */}

      <main className="blood-request-container">

        <div className="request-heading">

          <span className="request-label">
            LIFELINK EMERGENCY SERVICE
          </span>

          <h1>
            Need Blood Urgently?
          </h1>

          <p>
            Fill out the details below to notify compatible
            donors in your area immediately.
          </p>

        </div>

        {error && (
          <div className="blood-request-error">
            <span>!</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* ================= BLOOD GROUP ================= */}

          <section className="request-card">

            <label className="section-label">
              BLOOD GROUP NEEDED
            </label>

            <div className="blood-group-grid">

              {[
                "A+",
                "A-",
                "B+",
                "B-",
                "AB+",
                "AB-",
                "O+",
                "O-",
              ].map((group) => (

                <button
                  type="button"
                  key={group}
                  className={
                    formData.bloodGroup === group
                      ? "blood-group-button selected"
                      : "blood-group-button"
                  }
                  onClick={() => selectBloodGroup(group)}
                >
                  {group}
                </button>

              ))}

            </div>

          </section>

          {/* ================= URGENCY + UNITS ================= */}

          <div className="request-two-column">

            <section className="request-card">

              <label className="section-label">
                URGENCY LEVEL
              </label>

              <div className="urgency-options">

                {[
                  {
                    name: "Critical",
                    className: "critical",
                  },
                  {
                    name: "High",
                    className: "high",
                  },
                  {
                    name: "Normal",
                    className: "normal",
                  },
                ].map((item) => (

                  <button
                    key={item.name}
                    type="button"
                    className={
                      formData.urgency === item.name
                        ? "urgency-option selected"
                        : "urgency-option"
                    }
                    onClick={() =>
                      selectUrgency(item.name)
                    }
                  >

                    <span className="radio-circle">
                      {formData.urgency === item.name
                        ? "●"
                        : ""}
                    </span>

                    <span className="urgency-name">
                      {item.name}
                    </span>

                    <span
                      className={`urgency-dot ${item.className}`}
                    ></span>

                  </button>

                ))}

              </div>

            </section>

            <section className="request-card units-card">

              <label className="section-label">
                UNITS NEEDED
              </label>

              <div className="units-control">

                <button
                  type="button"
                  onClick={decreaseUnits}
                  disabled={formData.units <= 1}
                >
                  −
                </button>

                <strong>
                  {formData.units}
                </strong>

                <button
                  type="button"
                  onClick={increaseUnits}
                  disabled={formData.units >= 10}
                >
                  +
                </button>

              </div>

              <span className="units-help">
                Maximum 10 units
              </span>

            </section>

          </div>

          {/* ================= PATIENT DETAILS ================= */}

          <section className="request-card hospital-card">

            <div className="form-group">

              <label className="section-label">
                PATIENT NAME
              </label>

              <input
                type="text"
                name="patientName"
                placeholder="Enter patient name"
                value={formData.patientName}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label className="section-label">
                HOSPITAL NAME
              </label>

              <input
                type="text"
                name="hospital"
                placeholder="e.g. City General Hospital"
                value={formData.hospital}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label className="section-label">
                LOCATION
              </label>

              <input
                type="text"
                name="location"
                placeholder="e.g. Salt Lake, Kolkata"
                value={formData.location}
                onChange={handleChange}
              />

              <span className="input-help">
                Enter the hospital area or city.
              </span>

            </div>

            <div className="form-group">

              <label className="section-label">
                CONTACT NUMBER
              </label>

              <input
                type="tel"
                name="contact"
                placeholder="Enter contact number"
                value={formData.contact}
                onChange={handleChange}
              />

            </div>

          </section>

          {/* ================= SUBMIT ================= */}

          <button
            type="submit"
            className="post-request-button"
          >
            <span>📢</span>
            Post Blood Request
          </button>

          <p className="request-note">
            ⓘ Your request will be matched with compatible
            donors nearby.
          </p>

        </form>

      </main>

    </div>
  );
}

export default BloodRequest;