import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLoginComplete }) => {
  const [error, setError] = useState(false);
  const [sms_error, setSms_error] = useState("");
  const [bool_response, setBool_response] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = data;

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: [e.target.value] });
  };


  const submitHandler = (e) => {
    e.preventDefault();
    setError(false);
    setBool_response(false);

    if (username && password) {
      const body = {
        username: username[0],
        password: password[0],
      };
      axios
        .post("https://three-points.herokuapp.com/api/login", body, {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Headers":
            "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
          "Content-Type": "application/json",
        })
        .then(function (response) {
          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", username);
            onLoginComplete(true);
          } else {
            setBool_response(true);
            setSms_error(response.data.message);
          }
        })
        .catch(function (error) {
          setBool_response(true);
          setSms_error(error.response.data.message);
        });
    } else {
      setError(false);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <form className="form-login w-50" onSubmit={submitHandler}>
        {error && (
          <div className="alert alert-danger" role="alert">
            Invalid email or password
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={username}
            onChange={changeHandler}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={changeHandler}
          />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            login
          </button>
        </div>
        {bool_response && <p className="text-danger mt-2">{sms_error}</p>}
      </form>
    </div>
  );
};
export default Login;
