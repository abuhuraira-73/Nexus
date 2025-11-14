const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  changePassword,
} = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const passport = require("passport");
const jwt = require("jsonwebtoken");

//
// AUTH ROUTES
//

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Change password
router.put("/change-password", auth, changePassword);

// Google OAuth start
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//
// GOOGLE CALLBACK — FIXED 100%
//
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        console.error("OAuth Error: User missing in callback.");
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=NoUser`
        );
      }

      // Create token
      const token = jwt.sign(
        { user: { id: req.user._id } },
        process.env.JWT_SECRET,
        { expiresIn: "5d" }
      );

      // ONLY ONE SOURCE OF FRONTEND URL
      const frontendUrl = process.env.FRONTEND_URL;  // required in .env

      // Redirect to frontend success page
      const redirectUrl = `${frontendUrl}/login/success/${req.user._id}?token=${token}`;

      console.log("OAuth Redirect →", redirectUrl);

      return res.redirect(redirectUrl);
    } catch (err) {
      console.error("Google OAuth Error:", err.message);

      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=OAuthFailed`
      );
    }
  }
);

// Get user info
router.get("/me", auth, getMe);

module.exports = router;
