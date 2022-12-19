const Student = require('../model/student');
const Company = require("../model/company");
const { Parser } = require("json2csv");

// for converting all student data to csv format
module.exports.downloadCSV = async function (req, res) {
  console.log("readed csv controller")
  try {
    // extracting company data
    let company_list = await Company.find({})
        .populate({
            path: 'students',
            populate: {
                path: 'studentId'
            }
        });
        // extracting student data
        let student_list = await Student.find({})
        .populate({
            path: 'interviews',
            populate: {
                path: 'companyId'
            }
        });    


    //Convert csv Data to json
    let interviewRecord = [];

    for (student of student_list) {
      let addedInterviewForStudent = false;
      for (interview of student.interviews) {
        // adding record for each student's interview
        addedInterviewForStudent = true;
        let singleInterviewRecord = {};
        singleInterviewRecord["StudentID"] = student._id;
        singleInterviewRecord["StudentName"] = student.name;
        singleInterviewRecord["StudentCollege"] = student.college;
        singleInterviewRecord["StudentStatus"] = student.status;
        singleInterviewRecord["DSAScore"] = student.dsaScore;
        singleInterviewRecord["WebDevScore"] = student.webDevelopmentScore;
        singleInterviewRecord["ReactScore"] = student.reactScore;
        singleInterviewRecord["InterviewDate"] = interview.date;
        singleInterviewRecord["InterviewCompany"] = interview.companyId.companyName;
        singleInterviewRecord["InterviewProfile"] = interview.profile;
        if(interview.result == "Didn’t Attempt"){
          let result = "Didnot Attempt";
          singleInterviewRecord["InterviewResult"] = result;
        }else{
          singleInterviewRecord["InterviewResult"] = interview.result;
        }
        
        interviewRecord.push(singleInterviewRecord);
      }

      if(!addedInterviewForStudent){
        // if student is not sheduled for any interiew making the interview fields as null
        let singleInterviewRecord = {};
        singleInterviewRecord["StudentID"] = student._id;
        singleInterviewRecord["StudentName"] = student.name;
        singleInterviewRecord["StudentCollege"] = student.college;
        singleInterviewRecord["StudentStatus"] = student.status;
        singleInterviewRecord["DSAScore"] = student.dsaScore;
        singleInterviewRecord["WebDevScore"] = student.webDevelopmentScore;
        singleInterviewRecord["ReactScore"] = student.reactScore;
        singleInterviewRecord["InterviewDate"] = "-";
        singleInterviewRecord["InterviewCompany"] = "-";
        singleInterviewRecord["InterviewProfile"] = "-";
        singleInterviewRecord["InterviewResult"] = "-";
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
      "InterviewResult"
    ];
    const HeadingList = { Heading };
    //Parse the json obj to csv format
    const parser = new Parser(HeadingList);
    const csv = parser.parse(interviewRecord);
    // sending csv file as response
    res.attachment("InterviewRecord.csv");
    res.status(200).send(csv);
  } catch (err) {
    // hadling in case of error response
    console.log("Error in creating the CSV of data controller", err);
    return res.redirect("back");
  }
};