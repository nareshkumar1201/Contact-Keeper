import React, { Fragment, useState } from "react";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPwd: "",
  });

  const { name, email, password, confirmPwd } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Register User");
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
              required
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
              required
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
              required
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
              required
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
