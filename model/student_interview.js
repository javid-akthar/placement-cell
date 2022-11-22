//Schema for fetching the details of students of particular interview selected
const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    companyId: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    },studentId: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    profile: {
      type: String,
      required: true,
    },date: {
      type: Date,
      required: true,
    },
    result: {
      type: String,
      enum: ["PASS", "FAIL", "On Hold", "Didn’t Attempt"],
    },companyName: {
      type: String,
      required: true,
    },studentName:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);
// exporting interview schema
const Interview = mongoose.model("Interview", interviewSchema);
module.exports = Interview;
