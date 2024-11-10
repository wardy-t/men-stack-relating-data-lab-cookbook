const mongoose = require('mongoose');
const { Schema } = mongoose; 

const foodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  expirationDate: {
    type: Date,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['Vegetable', 'Fruit', 'Dairy', 'Meat', 'Grain', 'Other'],
    default: 'Other'
  }
}, {
  timestamps: true
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema]
});

const User = mongoose.model('User', userSchema);
const Food = mongoose.model('Food', foodSchema);

module.exports = { User, Food };