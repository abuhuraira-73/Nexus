const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  provider: {
    type: String,
    required: true,
    default: 'local',
  },
  googleId: {
    type: String,
  },
  avatarUrl: {
    type: String,
    default: null,
  },
  plan: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free',
  },
  preferences: {
    defaultCanvasColor: { type: String, default: '#1a1a1a' },
    defaultPattern: { type: String, default: 'solid' },
  },
  password: {
    type: String,
    required: function() { return this.provider === 'local'; },
    minlength: 6,
    select: false,
  },
},{ timestamps: true ,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  if (!this.password) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);