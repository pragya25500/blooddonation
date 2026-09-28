import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./DonorStatus.css";

function DonorStatus() {
  const routerLocation = useLocation();
  const navigate = useNavigate();

  /*
    =========================================================
    REQUEST DATA
    =========================================================
  */

  const requestData = routerLocation.state || null;


  /*
    =========================================================
    ALL HOOKS
    =========================================================
  */

  const [stage, setStage] = useState(
    requestData?.stage || "searching"
  );

  const [donors, setDonors] = useState(() => [
    {
      id: 1,
      name: "Rahul Sharma",
      initials: "RS",
      distance: "0.8 km",
      location: "Salt Lake",
      status: "NOTIFIED",
    },
    {
      id: 2,
      name: "Priya Das",
      initials: "PD",
      distance: "1.2 km",
      location: "New Town",
      status: "NOTIFIED",
    },
    {
      id: 3,
      name: "Amit Roy",
      initials: "AR",
      distance: "2.5 km",
      location: "Park Street",
      status: "NOTIFIED",
    },
  ]);

  const [refreshing, setRefreshing] =
    useState(false);


  /*
    =========================================================
    SEARCHING -> MATCHING
    =========================================================
  */

  useEffect(() => {
    if (!requestData) {
      return;
    }

    if (stage !== "searching") {
      return;
    }

    const timer = setTimeout(() => {
      setStage("matching");
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [stage, requestData]);


  /*
    =========================================================
    WHEN MATCHING STARTS
    AUTOMATICALLY ACCEPT FIRST DONOR
    =========================================================
  */

  useEffect(() => {
    if (!requestData) {
      return;
    }

    if (stage !== "matching") {
      return;
    }

    setDonors((previousDonors) =>
      previousDonors.map((donor, index) => ({
        ...donor,
        status:
          index === 0
            ? "ACCEPTED"
            : "NOTIFIED",
      }))
    );
  }, [stage, requestData]);


  /*
    =========================================================
    SAVE RESULT TO DASHBOARD
    =========================================================
  */

  useEffect(() => {
    if (!requestData) {
      return;
    }

    const acceptedCount = donors.filter(
      (donor) => donor.status === "ACCEPTED"
    ).length;

    const pendingCount = donors.filter(
      (donor) => donor.status !== "ACCEPTED"
    ).length;

    const updatedRequest = {
      ...requestData,

      stage,

      status:
        stage === "matching"
          ? "MATCHED"
          : "MATCHING",

      matched:
        stage === "matching",

      donorsFound:
        stage === "matching"
          ? donors.length
          : 0,

      donorResponses:
        stage === "matching"
          ? acceptedCount
          : 0,

      pendingDonors:
        stage === "matching"
          ? pendingCount
          : 0,

      donors:
        stage === "matching"
          ? donors.map((donor) => ({
              id: donor.id,
              name: donor.name,
              initials: donor.initials,
              distance: donor.distance,
              location: donor.location,
              status: donor.status,
            }))
          : [],
    };

    localStorage.setItem(
      "bloodRequest",
      JSON.stringify(updatedRequest)
    );

    window.dispatchEvent(
      new Event("bloodRequestUpdated")
    );

  }, [stage, donors, requestData]);


  /*
    =========================================================
    NO REQUEST
    =========================================================
  */

  if (!requestData) {
    return (
      <div className="donor-empty-page">

        <div className="donor-empty-card">

          <div className="empty-heart">
            ♥
          </div>

          <h1>
            No Blood Request Found
          </h1>

          <p>
            Please create a blood request first.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/blood-request")
            }
          >
            Create Blood Request
          </button>

        </div>

      </div>
    );
  }


  /*
    =========================================================
    REQUEST INFORMATION
    =========================================================
  */

  const {
    patientName,
    bloodGroup,
    units,
    hospital,
    location: hospitalLocation,
    urgency,
  } = requestData;


  /*
    =========================================================
    ACCEPT DONOR
    =========================================================
  */

  const handleAcceptDonor = (donorId) => {

    setDonors((previousDonors) =>
      previousDonors.map((donor) => ({
        ...donor,

        status:
          donor.id === donorId
            ? "ACCEPTED"
            : "NOTIFIED",
      }))
    );

  };


  /*
    =========================================================
    REFRESH
    =========================================================
  */

  const handleRefresh = () => {

    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 900);

  };


  /*
    =========================================================
    SEARCHING SCREEN
    =========================================================
  */

  if (stage === "searching") {

    return (
      <div className="searching-page">

        <header className="searching-header">

          <button
            type="button"
            className="search-back-button"
            onClick={() =>
              navigate("/blood-request")
            }
          >
            ←
          </button>

          <button
            type="button"
            className="searching-logo"
            onClick={() =>
              navigate("/")
            }
          >
            LifeLink
          </button>

          <div className="header-notification">
            ♧
          </div>

        </header>


        <main className="searching-content">

          <section className="search-card">

            <div className="search-blood-circle">

              <div className="search-heart">
                ♥
              </div>

              <span>
                {bloodGroup}
              </span>

            </div>


            <div className="searching-label">
              FINDING COMPATIBLE DONORS
            </div>


            <h1>
              Searching for nearby{" "}
              <span>{bloodGroup}</span>{" "}
              donors...
            </h1>


            <p className="search-description">
              We are notifying compatible donors
              within a 5 km radius of{" "}
              <strong>
                {hospitalLocation}
              </strong>.
            </p>


            <div className="progress-wrapper">

              <div className="progress-track">

                <div className="progress-animation"></div>

              </div>

            </div>


            <p className="wait-text">
              Searching nearby donors...
            </p>


            <div className="request-information">

              <div className="request-info-item">
                <span>PATIENT</span>
                <strong>{patientName}</strong>
              </div>

              <div className="request-info-item">
                <span>HOSPITAL</span>
                <strong>{hospital}</strong>
              </div>

              <div className="request-info-item">
                <span>BLOOD</span>
                <strong className="red-text">
                  {bloodGroup}
                </strong>
              </div>

              <div className="request-info-item">
                <span>UNITS</span>
                <strong>{units}</strong>
              </div>

            </div>


            <div className="search-location">
              📍 {hospitalLocation}
            </div>

          </section>

        </main>

      </div>
    );
  }


  /*
    =========================================================
    MATCHING SCREEN
    =========================================================
  */

  return (
    <div className="matching-page">

      {/* HEADER */}

      <header className="matching-header">

        <button
          type="button"
          className="matching-logo"
          onClick={() =>
            navigate("/")
          }
        >
          LifeLink
        </button>


        <nav className="matching-navigation">

          <button
            type="button"
            onClick={() =>
              navigate("/requester-dashboard")
            }
          >
            Dashboard
          </button>

          <button
            type="button"
            className="active"
          >
            Requests
          </button>

          <button type="button">
            Donate
          </button>

          <button type="button">
            Profile
          </button>

        </nav>


        <button
          type="button"
          className="matching-bell"
        >
          ♧
        </button>

      </header>


      {/* MAIN */}

      <main className="matching-layout">

        {/* SIDEBAR */}

        <aside className="matching-sidebar">

          <section className="process-section">

            <span className="process-label">
              MATCHING PROCESS
            </span>

            <h1>
              Nearby donor matches
            </h1>

            <div className="process-status">

              <span className="target-symbol">
                ◎
              </span>

              <span>
                {donors.length}
                {" "}
                compatible donors found
              </span>

            </div>

            <div className="process-location">
              📍 {hospitalLocation}
            </div>

          </section>


          {/* REQUEST */}

          <section className="sidebar-request">

            <span className="sidebar-title">
              BLOOD REQUEST
            </span>

            <div className="blood-request-mini">

              <div className="mini-blood">
                {bloodGroup}
              </div>

              <div>

                <strong>
                  {patientName}
                </strong>

                <span>
                  {hospital}
                </span>

              </div>

            </div>


            <div className="request-detail-row">

              <span>
                Units needed
              </span>

              <strong>
                {units}
              </strong>

            </div>


            <div className="request-detail-row">

              <span>
                Urgency
              </span>

              <strong className="urgency-text">
                {urgency}
              </strong>

            </div>

          </section>


          {/* CANDIDATES */}

          <section className="candidates-section">

            <div className="candidate-heading">

              <span>
                CANDIDATES
              </span>

              <strong>
                {donors.length}
              </strong>

            </div>


            {donors.map((donor) => {

              const accepted =
                donor.status === "ACCEPTED";

              return (
                <article
                  key={donor.id}
                  className={
                    accepted
                      ? "candidate-card accepted"
                      : "candidate-card"
                  }
                >

                  <div
                    className={
                      accepted
                        ? "candidate-avatar accepted-avatar"
                        : "candidate-avatar"
                    }
                  >
                    {donor.initials}
                  </div>


                  <div className="candidate-information">

                    <h3>

                      {donor.name}

                      {accepted && (
                        <span className="verified">
                          ✓
                        </span>
                      )}

                    </h3>

                    <p>
                      📍 {donor.distance}
                    </p>

                  </div>


                  {accepted ? (

                    <span className="accepted-badge">
                      Accepted
                    </span>

                  ) : (

                    <button
                      type="button"
                      className="notified-button"
                      onClick={() =>
                        handleAcceptDonor(
                          donor.id
                        )
                      }
                    >
                      Notified
                    </button>

                  )}

                </article>
              );

            })}

          </section>

        </aside>


        {/* MAP */}

        <section className="map-section">

          <div className="map-topbar">

            <div>

              <span>
                DONOR LOCATION
              </span>

              <h2>
                Nearby compatible donors
              </h2>

            </div>

            <div className="map-blood-group">
              {bloodGroup}
            </div>

          </div>


          <div className="map">

            <div className="map-water"></div>

            <div className="map-road map-road-1"></div>
            <div className="map-road map-road-2"></div>
            <div className="map-road map-road-3"></div>
            <div className="map-road map-road-4"></div>
            <div className="map-road map-road-5"></div>


            <div className="map-area area-1">
              Salt Lake
            </div>

            <div className="map-area area-2">
              City Centre
            </div>

            <div className="map-area area-3">
              Medical District
            </div>

            <div className="map-area area-4">
              Main Road
            </div>


            {/* HOSPITAL */}

            <div className="hospital-pin">

              <div className="hospital-ring"></div>

              <div className="hospital-circle">
                ✚
              </div>

              <div className="hospital-label">

                <strong>
                  {hospital}
                </strong>

                <span>
                  {hospitalLocation}
                </span>

              </div>

            </div>


            {/* DONORS */}

            <button
              type="button"
              className="donor-map-pin pin-one"
              onClick={() =>
                handleAcceptDonor(1)
              }
            >
              RS
              <span>Rahul S.</span>
            </button>


            <button
              type="button"
              className="donor-map-pin pin-two"
              onClick={() =>
                handleAcceptDonor(2)
              }
            >
              PD
              <span>Priya D.</span>
            </button>


            <button
              type="button"
              className="donor-map-pin pin-three"
              onClick={() =>
                handleAcceptDonor(3)
              }
            >
              AR
              <span>Amit R.</span>
            </button>


            {/* CURRENT LOCATION */}

            <div className="current-location">

              <div className="current-location-pulse"></div>

              <div className="current-location-dot"></div>

            </div>


            {/* LOCATION CARD */}

            <div className="map-location-card">

              <div className="location-card-icon">
                📍
              </div>

              <div>

                <strong>
                  Request Location
                </strong>

                <span>
                  {hospitalLocation}
                </span>

              </div>

            </div>


            {/* CONTROLS */}

            <div className="map-controls">

              <button
                type="button"
                onClick={() =>
                  navigate("/requester-dashboard")
                }
              >
                ◎
              </button>

              <button type="button">
                +
              </button>

              <button type="button">
                −
              </button>

            </div>

          </div>


          {/* FOOTER */}

          <div className="map-footer">

            <div>

              <strong>
                {donors.length}
                {" "}
                compatible donors
              </strong>

              <span>
                within approximately 5 km
              </span>

            </div>


            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              ↻{" "}
              {refreshing
                ? "Refreshing..."
                : "Refresh Status"}
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default DonorStatus;