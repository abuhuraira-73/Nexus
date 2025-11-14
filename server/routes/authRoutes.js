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
// GOOGLE CALLBACK — defensive fixed version
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
        // If CLIENT_URL missing, use root path so redirect is safe
        const safeFrontend = process.env.CLIENT_URL || "/";
        return res.redirect(`${safeFrontend}login?error=NoUser`);
      }

      // Create token
      const token = jwt.sign(
        { user: { id: req.user._id } },
        process.env.JWT_SECRET,
        { expiresIn: "5d" }
      );

      // FRONTEND URL: support common env names and fallback, but log if missing
      const frontendUrl =
        process.env.CLIENT_URL || process.env.FRONTEND_URL || process.env.VITE_CLIENT_URL || null;

      if (!frontendUrl) {
        console.error(
          "FATAL: CLIENT_URL not defined in environment. Set CLIENT_URL to your frontend URL (e.g. https://your-frontend.vercel.app)."
        );
        // Fallback to absolute safe path on same host (avoids creating 'undefined' path)
        const fallback = `/login/success/${req.user._id}?token=${encodeURIComponent(token)}`;
        console.warn("Using fallback redirect:", fallback);
        return res.redirect(fallback);
      }

      // Redirect to frontend success page (encode token)
      const redirectUrl = `${frontendUrl.replace(/\/$/, "")}/login/success/${req.user._id}?token=${encodeURIComponent(token)}`;

      console.log("OAuth Redirect →", redirectUrl);

      return res.redirect(redirectUrl);
    } catch (err) {
      console.error("Google OAuth Error:", err.message);

      const safeFrontend = process.env.CLIENT_URL || "/";
      return res.redirect(`${safeFrontend}login?error=OAuthFailed`);
    }
  }
);

// Get user info
router.get("/me", auth, getMe);

module.exports = router;
