import React, { Fragment, useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";

const Login = (props) => {
  const { loginUser, error, clearErrors, isAuthenticated } = useContext(
    AuthContext
  );
  const { showAlert } = useContext(AlertContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      // redirect to Home page
      props.history.push("/");
    }
    if (error === "password does not match") {
      showAlert(error, "danger");
      clearErrors();
    }

    if (error === "Invalid Crendentials or not Registered") {
      showAlert(error, "danger");
      clearErrors();
    }

    //  eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    if (email === "" || password === "") {
      showAlert("email & password is required");
    } else {
      loginUser({ email, password });
    }
    //console.log("submit Login user");
    e.preventDefault();
  };
  return (
    <Fragment>
      <div className="form-container">
        <h1>
          Account <span className="text-primary">Login</span>
        </h1>
        <form action="#" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Enter Email"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter Password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Login"
            />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
