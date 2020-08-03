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
    // console.log(err.message);
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
      // console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route  -  PUT  /api/contacts/:id
//@desc   -  UPDATE contacts
//@access -  PRIVATE

router.put("/:id", middlewareAuth, async (req, res, next) => {
  const editedContact = {};
  const { name, email, phone, type } = req.body;

  if (name) editedContact.name = name;
  if (email) editedContact.email = email;
  if (phone) editedContact.phone = phone;
  if (type) editedContact.type = type;

  try {
    const existedContact = await Contact.findById(req.params.id);
    // console.log(existedContact.user);
    if (!existedContact)
      return res.status(404).json({ msg: "Contact Not Found" });

    if (existedContact.user.toString() !== req.user.id) {
      res.status(401).json({ msg: "You cant update random contacts" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: editedContact },
      { new: true }
    );
    res.json(updatedContact);
  } catch (err) {
    // console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  -  DELETE  /api/contacts/:id
//@desc   -  DELETE contacts
//@access -  PRIVATE

router.delete("/:id", middlewareAuth, async (req, res, next) => {
  //find the contact in db
  try {
    const toDeleteContact = await Contact.findById(req.params.id);

    if (!toDeleteContact) {
      res.status(404).json({ msg: "No contact to delete" });
    }

    if (toDeleteContact.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json("Unauthorised-you can delete random contacts");
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "Contact Deleted" });
  } catch (err) {
    // console.log(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
