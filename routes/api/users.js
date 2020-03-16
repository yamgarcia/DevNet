const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

/**
 * @route    GET api/users
 * @desc     Register user
 * @access   Public
 *
 */
router.post(
 "/",
 [
  check("name", "Name is required")
   .not()
   .isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
   "password",
   "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 })
 ],
 async (req, res) => {
  const errors = validationResult(req);

  //checks for errors
  !errors.isEmpty() && res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;

  try {
   // Checks for the user's existence
   let user = await User.findOne({ email });

   if (user) {
    return res.status(400).json({ errors: [{ msg: "User already exists" }] });
   }
   // Get User's gravatar
   const avatar = gravatar.url(email, {
    s: "200", //default size
    r: "pg", //rating
    d: "mm" //stands for default
   });

   user = new User({
    name,
    email,
    avatar,
    password
   });
   // Encrypt/hash password

   const salt = await bcrypt.genSalt(10);

   user.password = await bcrypt.hash(password, salt);

   //save the user in the database
   await user.save();

   // Return jsonwebtoken
   const payload = {
    user: {
     id: user.id
    }
   };

   jwt.sign(
    payload,
    config.get("jwtSecrete"),
    { expiresIn: 360000 },
    (err, token) => {
     if (err) throw err;
     res.json({ token });
    }
   );

   //   res.send('User registered');
  } catch (err) {
   console.error(err.message);
   res.status(500).send("Server error");
  }
 }
);

module.exports = router;
