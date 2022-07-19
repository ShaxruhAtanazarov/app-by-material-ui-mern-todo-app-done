// importing dependencies
const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
// ===------------------------------------------

// Registration route===========================
router.post(
  "/registration",
  [
    check("email", "Invalid E-mail").isEmail(),
    check("password", "Password must be at least 4 characters").isLength({
      min: 4,
    }),
  ],
  async (req, res) => {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        return res.status(400).json({
          errors: validationErrors.array(),
          message: "Invalid data in Registration",
        });
      }

      // Getting data from request body
      const { username, email, password } = req.body;

      // Checking if user is already registered
      const isRegistrated = await User.findOne({ email });

      // If there shuch user returning an caution
      if (isRegistrated)
        return res
          .status(300)
          .json({ message: "This E-mail is already registered" });

      const hashedPassword = await bcrypt.hash(password, 7);

      const user = await new User({
        username,
        email,
        password: hashedPassword,
      });

      const jwtSecret = "shakaAtanazarov99960982219981711___";

      const jwtToken = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: "1h",
      });

      await user.save();

      res.status(201).json({
        message: "User Registrated succesfully",
        token: jwtToken,
        userId: user._id,
      });
    } catch (error) {
      console.log(error);
    }
  }
);
// ===========================================//

// login route==================================
router.post(
  "/login",
  [
    check("email", "Invalid E-mail").isEmail(),
     check("password", "Password must be at least 4 characters").isLength({
      min: 4,
    }),
  ],
  async (req, res) => {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        return res.status(400).json({
          errors: validationErrors.array(),
          message: "Invalid data in Login",
        });
      }

      // Getting data from request body
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) return res.status(400).json({ message: "User not found" });

      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch)
        return res.status(400).json({ message: "Invalid password" });

      const jwtSecret = "shakaAtanazarov99960982219981711___";

      const jwtToken = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: "1h",
      });

      res.json({ jwtToken, userId: user._id });
    } catch (error) {
      throw(error);
    }
  }
);

module.exports = router;
