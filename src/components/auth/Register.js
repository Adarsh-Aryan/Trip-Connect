import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import Auth from "../../images/auth.png";
import Loader from "../../images/loader.svg";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState();

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError("Please Specify All The Fields");

      return;
    }

    if (!email || !email.includes("@")) {
      setError("Please Enter A Valid Email Address !");
      return;
    }

    setLoading(true);
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    console.log(response);

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
        <h1>Sign Up</h1>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <TextField
          label="Name"
          variant="filled"
          style={{ margin: "1rem 0rem" }}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          label="Email"
          variant="filled"
          type="email"
          style={{ marginBottom: "1rem" }}
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
          onClick={handleRegister}
          color="primary"
          size="large"
          style={{ margin: "1rem 0rem" }}
        >
          {!loading ? (
            "Sign Up"
          ) : (
            <img src={Loader} alt="loader" style={{ width: "8%" }}></img>
          )}
        </Button>
        <div style={{ textAlign: "center" }}>
          <Link to="/login">Already User?</Link>
        </div>
      </div>
      <img src={Auth} alt="auth" />
    </div>
  );
};

export default Register;
