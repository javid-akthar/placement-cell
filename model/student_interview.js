const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

// Interview collection schema
const interviewSchema = new mongoose.Schema(
  {
    companyId: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true
    },studentId: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    profile: {
      type: String,
      required: true,
      trim: true

    },date: {
      type: String,
      required: true,
      trim: true
    },
    result: {
      type: String,
      enum: ["PASS", "FAIL", "On Hold", "Didn’t Attempt"],
      trim: true,
      required: true
    },companyName: {
      type: String,
      required: true,
      trim: true,
      required: true
    },studentName:{
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
  }
);

// exporting Interview schema
const Interview = mongoose.model("Interview", interviewSchema);
module.exports = Interview;
