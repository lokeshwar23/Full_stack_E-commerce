import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    let dataObj;
    await fetch("https://full-stack-e-commerce-4-2uw6.onrender.com/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });
    if (dataObj.success) {
      localStorage.setItem("auth-token", dataObj.token);
      window.location.replace("/");
    } else {
      alert(dataObj.errors);
    }
  };

  const signup = async () => {
    let dataObj;
    await fetch("https://full-stack-e-commerce-4-2uw6.onrender.com/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });

    if (dataObj.success) {
      localStorage.setItem("auth-token", dataObj.token);
      window.location.replace("/");
    } else {
      alert(dataObj.errors);
    }
  };

  return (
    <div className="new-loginsignup">
      <div className="new-loginsignup-container">
        <h1>{state}</h1>
        <div className="new-loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              type="text"
              placeholder="Your Name"
              name="username"
              value={formData.username}
              onChange={changeHandler}
            />
          ) : null}
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>

        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
          disabled={!isChecked}
          className={isChecked ? "active-button" : "disabled-button"}
        >
          Continue
        </button>

        {state === "Login" ? (
          <p>
            Don't have an account?{" "}
            <span onClick={() => setState("Sign Up")}>Sign Up</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login</span>
          </p>
        )}

        <div className="new-loginsignup-agree">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label>By continuing, I agree to the Terms of Use & Privacy Policy.</label>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
