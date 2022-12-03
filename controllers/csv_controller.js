// importing student and interview models
// const Student = require("../models/student");
const Student = require('../model/student');
// const Interview = require("../models/student_interview");
const Company = require("../model/company");
// importing Parser for converting json to csv
const { Parser } = require("json2csv");

// for converting all student data to csv
module.exports.downloadCSV = async function (req, res) {
  try {
    let company_list = await Company.find({})
        .populate({
            path: 'students',
            populate: {
                path: 'studentId'
            }
        });

        let student_list = await Student.find({})
        .populate({
            path: 'interviews',
            populate: {
                path: 'companyId'
            }
        });    

    let students = await Student.find({});

    //Convert Data to json
    let exportData = [];

    for (student of student_list) {
      let addedInterviewForStudent = false;
      for (interview of student.interviews) {
        addedInterviewForStudent = true;
        let obj = {};
        obj["StudentID"] = student._id;
        obj["StudentName"] = student.name;
        obj["StudentCollege"] = student.college;
        obj["StudentStatus"] = student.status;
        obj["DSAScore"] = student.dsaScore;
        obj["WebdScore"] = student.webDevelopmentScore;
        obj["ReactScore"] = student.reactScore;
        obj["InterviewDate"] = interview.date;
        obj["InterviewCompany"] = interview.companyId.companyName;
        obj["InterviewProfile"] = interview.profile;
        obj["InterviewResult"] = interview.result;
        exportData.push(obj);
      }

      if(!addedInterviewForStudent){
        let obj = {};
        obj["StudentID"] = student._id;
        obj["StudentName"] = student.name;
        obj["StudentCollege"] = student.college;
        obj["StudentStatus"] = student.status;
        obj["DSAScore"] = student.dsaScore;
        obj["WebdScore"] = student.webDevelopmentScore;
        obj["ReactScore"] = student.reactScore;
        obj["InterviewDate"] = "-";
        obj["InterviewCompany"] = "-";
        obj["InterviewProfile"] = "-";
        obj["InterviewResult"] = "-";
        exportData.push(obj);
      }
    }

    const fields = [
      "StudentID",
      "StudentName",
      "StudentCollege",
      "StudentStatus",
      "DSAScore",
      "WebdScore",
      "ReactScore",
      "InterviewDate",
      "InterviewCompany",
      "InterviewProfile",
      "InterviewResult",
    ];

    const opts = { fields };

    //Parse the json to csv
    const parser = new Parser(opts);
    const csv = parser.parse(exportData);

    res.attachment("results.csv");
    res.status(200).send(csv);
  } catch (err) {
    console.log("*** Error in Exporting the CSV of data controller ***", err);
    return res.redirect("back");
  }
};
