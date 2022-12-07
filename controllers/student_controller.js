const Student = require('../model/student');
const Interview = require('../model/student_interview');
const Company = require('../model/company');
const ejs = require("ejs");

// controlling for creating student
module.exports.createStudent = async function (req, res) {
    try {
        console.log('value of req', req.body);
        let obj = req.body;
        console.log('objvalue', req.body);
        let addedStudent = await Student.create(obj);
        let student_list = await Student.find({})
            .populate({
                path: 'interviews',
                populate: {
                    path: 'companyId'
                }
            });

        let html = await ejs.renderFile(__dirname + '../../views/student_details_list.ejs', {
            title: "Placement Cell",
            i: addedStudent
        });
        console.log('req.xhr', req.xhr);

        if (req.xhr) {
            console.log('inside shr');
            return res.status(200).json({
                data: {
                    html: html
                },
                message: "addedStudentRecord!"
            });
        }
    } catch (err) {
        console.log('error in createStudent controller');
        console.log(err);
        let errorObj = "";
        for(errorObj in err["errors"]){
            console.log(errorObj);
        }
        return res.status(400).json({
            message: "not able to update StudentRecord!",
            error: err["errors"][errorObj]["properties"]["message"]
        });
    }
}

// controller for deleting student
module.exports.deleteStudent = async function (req, res) {
    try {
        console.log('reached deletestudent')
        console.log(req.query);
        console.log(req.body);
        let deletableStudnetId = req.query.deletableStudnetId;
        console.log('deletableStudnetId', deletableStudnetId);
        let deletableStudentRecord = await Student.findByIdAndDelete(deletableStudnetId);
        if (deletableStudentRecord.interviews) {
            for (interview of deletableStudentRecord.interviews) {
                let removedInterviewRecord = await Interview.findByIdAndDelete(interview);
                let modifyRequiredCompanyRecord = removedInterviewRecord.companyId;
                console.log('modifyRequiredCompanyRecord', modifyRequiredCompanyRecord);
                await Company.findByIdAndUpdate(modifyRequiredCompanyRecord, { $pull: { interviews: removedInterviewRecord._id } });
            }
        }
        let status = true;
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    status: status
                },
                message: "addedCompanyRecord!"
            });
        }
    } catch (err) {
        console.log('error in deleteComapny controller');
        console.log(err);
    }
}

// controller for updating student
module.exports.updateStudent = async function (req, res) {

    try {
        console.log('value of req', req.body);
        let obj = req.body;
        let studentId = req.body.id;
        console.log('objvalue', req.body);
        let modifiedStudent = await Student.findByIdAndUpdate(studentId, obj, { runValidators: true });
        modifiedStudent = await Student.findById(studentId)
        .populate({
            path: 'interviews',
            populate: {
              path: 'companyId'
            }
          });

        let html = await ejs.renderFile(__dirname + '../../views/student_details_list.ejs', {
            title: "Placement Cell",
            i: modifiedStudent
        });
        console.log('req.xhr', req.xhr);

        if (req.xhr) {
            console.log('inside shr');
            return res.status(200).json({
                data: {
                    html: html
                },
                message: "modifiedStudentRecord!"
            });
        }
    } catch (err) {
        console.log('error in updateStudent controller');
        console.log(err);
        console.log('err[errors]',err["errors"]);
        console.log(typeof(err["errors"]));
        let errorObj = "";
        for(errorObj in err["errors"]){
            console.log(errorObj);
        }
        return res.status(400).json({
            message: "not able to update StudentRecord!",
            error: err["errors"][errorObj]["properties"]["message"]
        });
    }

}