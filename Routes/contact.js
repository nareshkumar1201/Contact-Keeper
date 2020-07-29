const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../modals/User");
const Contact = require("../modals/Contact");
const jwt = require("jsonwebtoken");
const config = require("config");
const middlewareAuth = require("../middleware/auth");
const { body, check, validationResult } = require("express-validator");

//@route  -  GET  /api/contacts
//@desc   -  Get saved contacts
//@access -  PRIVATE

router.get("/", middlewareAuth, async (req, res, next) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  -  POST  /api/contacts
//@desc   -  add new  contacts
//@access -  PRIVATE

router.post(
  "/",
  [
    middlewareAuth,
    [
      body("name", "Enter Name").not().isEmpty(),
      body("email", "Enter valid email").isEmail(),
      body("phone", "phone no. should be 10 digits").isLength(10),
    ],
  ],
  async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ error: error.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name: name,
        email: email,
        phone: phone,
        type: type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route  -  PUT  /api/contact/:id
//@desc   -  UPDATE contacts
//@access -  PRIVATE

router.put("/:id", (req, res, next) => {
  res.send("update user contacts");
});

//@route  -  DELETE  /api/contact/:id
//@desc   -  DELETE contacts
//@access -  PRIVATE

router.delete("/:id", (req, res, next) => {
  res.send("delete user contacts");
});

module.exports = router;
