const express = require("express");

const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

const bcrypt = require("bcryptjs");
const jwtSecret = "MynameisVineetKumarTiwari";

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password", `Incorrect form of password`).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      const { name, password, email, location } = req.body;
      await User.create({
        name,
        password: secPassword,
        email,
        location,
      }).then(
        res.json({
          success: true,
        })
      );
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
      });
    }
  }
);
router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", `Incorrect form of password`).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { password, email } = req.body;
      let userdata = await User.findOne({
        email,
      });
      if (!userdata) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userdata.password
      );
      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }
      const data = {
        user: {
          id: userdata.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
      });
    }
  }
);
module.exports = router;
