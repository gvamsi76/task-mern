import React from "react";
import { Spinner } from "react-bootstrap";

const AppLoader = ({ variant = "light" }) => {
  return (
    <div className="fs-14 app-loader">
      <Spinner animation="border" variant={variant} size="sm" />
    </div>
  );
};

export default AppLoader;
