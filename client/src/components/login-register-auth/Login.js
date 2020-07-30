import React, { Fragment, useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submit Login user");
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
