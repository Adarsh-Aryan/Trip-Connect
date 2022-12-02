import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import React, { useState } from "react";

import Auth from "../../images/auth.png";
import Loader from "../../images/loader.svg";
import ErrorMessage from "../ui/ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState();

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !email.includes("@") || !password) {
      setError("Please Specify All The Fields");

      return;
    }

    setLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (!data.auth) {
      setLoading(false);
      setError(data.token);
      return;
    }

    setLoading(false);
    sessionStorage.setItem("userInfo", email);
    sessionStorage.setItem("token", data.token);
    window.location = "/";
  };

  if (sessionStorage.getItem("token")) {
    window.location = "/";
  }

  return (
    <div className="auth">
      <div className="auth_form">
        <h1>Log In</h1>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <TextField
          label="Email"
          variant="filled"
          type="email"
          style={{ margin: "1rem 0rem" }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          variant="contained"
          onClick={handleLogin}
          color="primary"
          size="large"
          style={{ margin: "1rem 0rem" }}
        >
          {!loading ? (
            "Log In"
          ) : (
            <img src={Loader} alt="loader" style={{ width: "8%" }}></img>
          )}
        </Button>
        <div style={{ textAlign: "center" }}>
          <Link to="/register">New User?</Link>
        </div>
      </div>
      <img src={Auth} alt="auth" />
    </div>
  );
};

export default Login;
