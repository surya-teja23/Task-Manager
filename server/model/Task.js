const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
      uppercase: true
    },
    description: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 200,
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);