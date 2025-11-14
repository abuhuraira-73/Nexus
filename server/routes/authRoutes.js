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
// @desc    Auth with Google
// @access  Public
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// @route   GET /api/auth/google/callback
// @desc    Google auth callback
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

      // Create JWT
      const token = jwt.sign(
        { user: { id: user._id } },
        process.env.JWT_SECRET,
        { expiresIn: "5d" }
      );

      // FRONTEND URL (updated)
      const frontendUrl =
        process.env.FRONTEND_URL ||
        process.env.CLIENT_URL ||
        "http://localhost:5173";

      // Redirect including userId + token
      const redirectUrl = `${frontendUrl}/login/success/${user._id}?token=${token}`;

      return res.redirect(redirectUrl);
    } catch (err) {
      console.error("Google OAuth Error:", err);
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=OAuthFailed`
      );
    }
  }
);

// @route   GET /api/auth/me
// @desc    Get user data
// @access  Private
router.get("/me", auth, getMe);

module.exports = router;
