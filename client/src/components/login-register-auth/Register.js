import React, { Fragment, useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;
  const { registerUser, error, clearErrors, isAuthenticated } = authContext;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPwd: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      // redirect to Home page
      props.history.push("/");
    }
    if (error === "email already exists") {
      showAlert(error, "danger");
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { name, email, password, confirmPwd } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      showAlert("Please Enter All Fields", "danger");
    } else if (password !== confirmPwd) {
      showAlert("password and ConfirmPwd should be same", "danger");
    } else {
      registerUser({
        name,
        email,
        password,
      });
      // console.log("Register User");
      // showAlert("Your Have Been Registered ...Login in Now", "success");
    }
  };
  return (
    <Fragment>
      <div className="form-container">
        <h1>
          Account <span className="text-primary">Register</span>
        </h1>
        <form action="#" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">UserName :</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter Name"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
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
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPwd">Confirm password :</label>
            <input
              type="password"
              name="confirmPwd"
              value={confirmPwd}
              placeholder="ReEnter Password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
