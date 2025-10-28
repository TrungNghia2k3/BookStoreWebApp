import React from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import "./GlobalLoading.scss";

const GlobalLoading = () => {
  const { isLoading, message } = useSelector((state) => state.loading);

  if (!isLoading) return null;

  return (
    <div className="global-loading-overlay">
      <div className="global-loading-container">
        <Spinner animation="border" variant="primary" className="loading-spinner" />
        <div className="loading-content">
          <h4 className="loading-title">Loading...</h4>
          {message && <p className="loading-message">{message}</p>}
          <p className="loading-info">
            <small>
              <i className="bi bi-info-circle me-2"></i>
              This is a demo project. The first request may take a few moments as the server wakes up.
              Thank you for your patience!
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;
