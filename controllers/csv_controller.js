const Student = require('../model/student');
const Company = require("../model/company");
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

    // let students = await Student.find({});

    //Convert Data to json
    let interviewRecord = [];

    for (student of student_list) {
      let addedInterviewForStudent = false;
      for (interview of student.interviews) {
        addedInterviewForStudent = true;
        let singleInterviewRecord = {};
        obj["StudentID"] = student._id;
        obj["StudentName"] = student.name;
        obj["StudentCollege"] = student.college;
        obj["StudentEmail"] = student.email;
        obj["StudentPhoneNo"] = student.phone;
        obj["StudentStatus"] = student.status;
        obj["DSAScore"] = student.dsaScore;
        obj["WebDevScore"] = student.webDevelopmentScore;
        obj["ReactScore"] = student.reactScore;
        obj["InterviewDate"] = interview.date;
        obj["InterviewCompanyId"] = interview.companyId._id;
        obj["InterviewCompany"] = interview.companyId.companyName;
        obj["InterviewProfile"] = interview.profile;
        obj["InterviewResult"] = interview.result;
        interviewRecord.push(singleInterviewRecord);
      }

      if(!addedInterviewForStudent){
        let singleInterviewRecord = {};
        obj["StudentID"] = student._id;
        obj["StudentName"] = student.name;
        obj["StudentCollege"] = student.college;
        obj["StudentEmail"] = student.email;
        obj["StudentPhoneNo"] = student.phone;
        obj["StudentStatus"] = student.status;
        obj["DSAScore"] = student.dsaScore;
        obj["WebDevScore"] = student.webDevelopmentScore;
        obj["ReactScore"] = student.reactScore;
        obj["InterviewDate"] = "-";
        obj["InterviewCompanyId"] = "-";
        obj["InterviewCompany"] = "-";
        obj["InterviewProfile"] = "-";
        obj["InterviewResult"] = "-";
        interviewRecord.push(singleInterviewRecord);
      }
    }
    const Heading = [
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
    const HeadingList = { Heading };
    //Parse the json to csv
    const parser = new Parser(HeadingList);
    const csv = parser.parse(interviewRecord);
    res.attachment("InterviewRecord.csv");
    res.status(200).send(csv);
  } catch (err) {
    console.log("*** Error in Exporting the CSV of data controller ***", err);
    return res.redirect("back");
  }
};