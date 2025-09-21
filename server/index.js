const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();

// Validate Environment Variables
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error('FATAL ERROR: MONGO_URI and JWT_SECRET must be defined in .env file');
  process.exit(1);
}

const authRoutes = require('./routes/authRoutes');
const canvasRoutes = require('./routes/canvasRoutes');


const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

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

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
