// REGISTERING USER

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../modals/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, check, validationResult } = require("express-validator");

//@route  -  POST  api/users
//@desc   -  Regiter a user
//@access -  Public
router.post(
  "/",
  [
    body("name", "name is required").not().isEmpty(),
    body("email", "Please include valid email").isEmail(),
    body("password", "password must be atleast 6 character length").isLength({
      min: 6,
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      //finding if user email is already exists
      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: "email already exists" });
      }
      user = new User({
        name: name,
        email: email,
        password: password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.save();

      const payload = {
        user: {
          id: user.id,
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
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("server error");
    }
  }
);

module.exports = router;
