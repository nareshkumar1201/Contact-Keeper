// AUTHORIZING LOGIN DETAILS
const bcrypt = require("bcryptjs");
const User = require("../modals/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const middlewareAuth = require("../middleware/auth");
const { body, check, validationResult } = require("express-validator");

// 2 FUNCTIONALITY  1)GET loged user 2)login the user

const express = require("express");
const router = express.Router();

//@route  -  POST  api/auth
//@desc   -  auth user & get token
//@access -  PUBLIC

router.post(
  "/",
  [
    body("email", "please include a valid email").isEmail(),
    body("password", "password is reqired").exists(),
  ],
  async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      // console.log(user);
      if (!user) {
        return res
          .status(400)
          .json({ msg: "Invalid Crendentials or not Registered" });
      }

      //compare the pwd with hash pwd already db
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "password does not match" });
      }

      const payload = {
        user: {
          id: user._id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          return res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// get user- already register

//@route  -  GET  api/auth
//@desc   -  Get logged in user
//@access -  PRIVATE

router.get("/", middlewareAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: "Server Error" });
  }
});

module.exports = router;
