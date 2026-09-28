import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BloodRequest.css";

function BloodRequest() {

  // ================================
  // NAVIGATION
  // ================================

  const navigate = useNavigate();


  // ================================
  // STATES
  // ================================

  const [bloodGroup, setBloodGroup] = useState("O-");
  const [urgency, setUrgency] = useState("Critical");
  const [units, setUnits] = useState(3);
  const [hospital, setHospital] = useState("");


  // ================================
  // BLOOD GROUPS
  // ================================

  const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];


  // ================================
  // INCREASE UNITS
  // ================================

  const increaseUnits = () => {
    setUnits(units + 1);
  };


  // ================================
  // DECREASE UNITS
  // ================================

  const decreaseUnits = () => {
    if (units > 1) {
      setUnits(units - 1);
    }
  };


  // ================================
  // SUBMIT REQUEST
  // ================================

  const handleSubmit = (e) => {

    e.preventDefault();


    // ================================
    // CHECK HOSPITAL
    // ================================

    if (hospital.trim() === "") {

      alert("Please enter hospital name.");

      return;
    }


    // ================================
    // CREATE REQUEST DATA
    // ================================

    const requestData = {

      bloodGroup: bloodGroup,

      urgency: urgency,

      units: units,

      hospital: hospital.trim(),

      status: "Pending",

    };


    // ================================
    // SAVE REQUEST
    // ================================
    // Temporary frontend storage.
    // Later this will be replaced
    // with Node.js + MySQL.

    localStorage.setItem(
      "bloodRequest",
      JSON.stringify(requestData)
    );


    // ================================
    // SHOW DATA IN CONSOLE
    // ================================

    console.log(
      "Blood Request:",
      requestData
    );


    // ================================
    // SUCCESS MESSAGE
    // ================================

    alert(
      "Blood request posted successfully!"
    );


    // ================================
    // GO TO REQUESTER DASHBOARD
    // ================================

    navigate("/requester-dashboard");

  };


  // ================================
  // BACK BUTTON
  // ================================

  const handleBack = () => {

    navigate("/requester-dashboard");

  };


  return (

    <div className="blood-request-page">


      {/* ==================================
          HEADER
      ================================== */}

      <header className="request-header">

        <button
          type="button"
          className="back-btn"
          onClick={handleBack}
        >
          ←
        </button>

        <h2>Emergency Request</h2>

      </header>


      {/* ==================================
          MAIN CONTENT
      ================================== */}

      <main className="request-container">


        {/* ==================================
            TITLE
        ================================== */}

        <div className="request-title">

          <h1>Need Blood Urgently?</h1>

          <p>
            Fill out the details below to notify donors
            in your area immediately.
          </p>

        </div>


        {/* ==================================
            FORM
        ================================== */}

        <form onSubmit={handleSubmit}>


          {/* ==================================
              BLOOD GROUP
          ================================== */}

          <section className="request-card blood-group-card">

            <label className="section-label">
              BLOOD GROUP NEEDED
            </label>

            <div className="blood-group-grid">

              {bloodGroups.map((group) => (

                <button
                  key={group}
                  type="button"
                  className={`blood-group-btn ${
                    bloodGroup === group
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setBloodGroup(group)
                  }
                >
                  {group}
                </button>

              ))}

            </div>

          </section>


          {/* ==================================
              URGENCY + UNITS
          ================================== */}

          <div className="request-row">


            {/* =================================
                URGENCY LEVEL
            ================================= */}

            <section className="request-card urgency-card">

              <label className="section-label">
                URGENCY LEVEL
              </label>

              <div className="urgency-options">


                {/* CRITICAL */}

                <button
                  type="button"
                  className="urgency-option"
                  onClick={() =>
                    setUrgency("Critical")
                  }
                >

                  <span
                    className={`radio-circle ${
                      urgency === "Critical"
                        ? "checked"
                        : ""
                    }`}
                  ></span>

                  <span className="urgency-text">
                    Critical
                  </span>

                  <span className="critical-dot"></span>

                </button>


                {/* HIGH */}

                <button
                  type="button"
                  className="urgency-option"
                  onClick={() =>
                    setUrgency("High")
                  }
                >

                  <span
                    className={`radio-circle ${
                      urgency === "High"
                        ? "checked"
                        : ""
                    }`}
                  ></span>

                  <span className="urgency-text">
                    High
                  </span>

                  <span className="high-dot"></span>

                </button>


                {/* NORMAL */}

                <button
                  type="button"
                  className="urgency-option"
                  onClick={() =>
                    setUrgency("Normal")
                  }
                >

                  <span
                    className={`radio-circle ${
                      urgency === "Normal"
                        ? "checked"
                        : ""
                    }`}
                  ></span>

                  <span className="urgency-text">
                    Normal
                  </span>

                  <span className="normal-dot"></span>

                </button>

              </div>

            </section>


            {/* =================================
                UNITS NEEDED
            ================================= */}

            <section className="request-card units-card">

              <label className="section-label units-label">
                UNITS NEEDED (PINTS)
              </label>

              <div className="units-control">

                <button
                  type="button"
                  className="unit-btn"
                  onClick={decreaseUnits}
                >
                  −
                </button>

                <span className="unit-number">
                  {units}
                </span>

                <button
                  type="button"
                  className="unit-btn"
                  onClick={increaseUnits}
                >
                  +
                </button>

              </div>

            </section>

          </div>


          {/* ==================================
              HOSPITAL NAME
          ================================== */}

          <section className="request-card hospital-card">

            <label className="section-label">
              HOSPITAL NAME
            </label>

            <input
              type="text"
              placeholder="e.g. City General Hospital"
              value={hospital}
              onChange={(e) =>
                setHospital(e.target.value)
              }
            />

          </section>


          {/* ==================================
              POST REQUEST BUTTON
          ================================== */}

          <button
            type="submit"
            className="post-request-btn"
          >

            <span className="post-icon"></span>

            Post Request

          </button>


          {/* ==================================
              INFORMATION
          ================================== */}

          <p className="request-info">

            <span className="info-icon">
              ⓘ
            </span>

            Your request will be visible to donors
            within a 10-mile radius.

          </p>


        </form>

      </main>

    </div>

  );

}

export default BloodRequest;