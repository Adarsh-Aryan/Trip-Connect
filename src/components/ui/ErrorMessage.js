import React from "react";

const ErrorMessage = ({ children }) => {
  return <div style={{ marginTop: "1rem", color: "red" }}>{children}</div>;
};

export default ErrorMessage;
