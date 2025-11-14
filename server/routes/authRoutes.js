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

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", registerUser);

// @route   POST /api/auth/login
// @desc    Login user and get token
// @access  Public
router.post("/login", loginUser);

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put("/change-password", auth, changePassword);

// @route   GET /api/auth/google
// @desc    Start Google OAuth
// @access  Public
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res) => {
    try {
      const user = req.user;

      if (!user || !user._id) {
        console.error("Google OAuth: Missing user in callback.");
        return res.redirect(
          `${process.env.FRONTEND_URL || "http://localhost:5173"}/login?error=NoUser`
        );
      }

      // Create JWT
      const token = jwt.sign(
        { user: { id: user._id } },
        process.env.JWT_SECRET,
        { expiresIn: "5d" }
      );

      // Determine FRONTEND URL (supports local & production)
      const frontendUrl =
        process.env.FRONTEND_URL ||
        process.env.CLIENT_URL ||
        "http://localhost:5173";

      // Redirect with userId + token to LoginSuccess route
      const redirectUrl = `${frontendUrl}/login/success/${user._id}?token=${token}`;

      console.log("Google OAuth redirect:", redirectUrl);

      return res.redirect(redirectUrl);
    } catch (err) {
      console.error("Google OAuth Error:", err.message);
      return res.redirect(
        `${process.env.FRONTEND_URL || "http://localhost:5173"}/login?error=OAuthFailed`
      );
    }
  }
);

// @route   GET /api/auth/me
// @desc    Get current logged-in user
// @access  Private
router.get("/me", auth, getMe);

module.exports = router;
