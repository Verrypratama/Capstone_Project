import React from "react";

function ErrorPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h2 className="mb-3">Oops! Page Not Found</h2>
        <p className="mb-4 text-muted">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <a href="/" className="btn btn-primary">
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default ErrorPage;
