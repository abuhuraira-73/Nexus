const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path'); // Import path module

dotenv.config();

// --- Google OAuth Environment Variable Logging ---
console.log("--- Loading Google OAuth Environment Variables ---");
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? "Loaded" : "MISSING");
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "Loaded" : "MISSING");
console.log("GOOGLE_CALLBACK_URL:", process.env.GOOGLE_CALLBACK_URL || "MISSING");
console.log("CLIENT_URL (Frontend Redirect):", process.env.CLIENT_URL || "MISSING");
console.log("-------------------------------------------------");

// Validate Environment Variables
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error('FATAL ERROR: MONGO_URI and JWT_SECRET must be defined in .env file');
  console.log('DEBUG: MONGO_URI:', process.env.MONGO_URI ? 'DEFINED' : 'UNDEFINED');
  console.log('DEBUG: JWT_SECRET:', process.env.JWT_SECRET ? 'DEFINED' : 'UNDEFINED');
  process.exit(1);
}

const authRoutes = require('./routes/authRoutes');
const canvasRoutes = require('./routes/canvasRoutes');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const suggestionRoutes = require('./routes/suggestionRoutes');
const passport = require('passport');

// Passport config
require('./config/passport')(passport);



const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

// Passport middleware
app.use(passport.initialize());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/canvases', canvasRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/suggestions', suggestionRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
