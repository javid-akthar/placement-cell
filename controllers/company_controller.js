const Company = require('../model/company');
const Student = require('../model/student');
const Interview = require('../model/student_interview');
const ejs = require('ejs');
const toastr = require('toastr');
const path = require('path');

// controller for creating the company
module.exports.createCompany = async function (req, res) {
    Company.create(req.body, function (err, newCompany) {
        if (err) {
            console.log('Error in creating a Company')
            return;
        } else {
            req.flash('success', 'Company Added');
            console.log('******', newCompany);
            return res.redirect('back');
        }

    });
}

// controller for updating the company details
module.exports.updateCompany = async function (req, res) {
    try {
        console.log('reached updatedCompany')
        let companyId = req.body.companyId;
        let newObj = req.body;
        console.log('companyId',companyId);
        console.log('newObj',newObj);
        await Company.findByIdAndUpdate(companyId, newObj);
        let updatedCompany = await Company.findById(companyId)
            .populate({
                path: 'students',
                populate: {
                    path: 'studentId'
                }
            });
        let student_list = await Student.find({});
        // let html = await ejs.renderFile(__dirname + '../../views/company_accordian.ejs', {
        //     title: "Placement Cell",
        //     company: updatedCompany,
        //     student_list
        // });
        let html = await ejs.renderFile(path.join(__dirname,'../views/company_accordian.ejs'), {
            title: "Placement Cell",
            company: updatedCompany,
            student_list
        });
        // console.log('value of html', html);
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    html: html
                },
                message: "updatedCompanyRecord!"
            });
        }
    } catch (err) {
        console.log('error in updateComapny controller');
        console.log(err);
    }
}

// controller for deleting the company details
module.exports.deleteCompany = async function (req, res) {
    console.log('reached deleteC0mpany')
    console.log(req.query);
    console.log(req.body);
    try {
        let deletableCompanyId = req.query.deletableCompanyId;
        console.log('deletableCompanyId', deletableCompanyId);
        let deletableCompanyRecord = await Company.findByIdAndDelete(deletableCompanyId);
        if (deletableCompanyRecord.students) {
            for (student of deletableCompanyRecord.students) {
                let removedInterviewRecord = await Interview.findByIdAndDelete(student);
                let modifyRequiredStudentRecord = removedInterviewRecord.studentId;
                console.log('modifyRequiredStudentRecord', modifyRequiredStudentRecord);
                await Student.findByIdAndUpdate(modifyRequiredStudentRecord, { $pull: { interviews: removedInterviewRecord._id } });
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

// controller for showing the company details
module.exports.showComapny = async function (req, res) {
    try {
        let company_list = await Company.find({})
            .populate({
                path: 'students',
                populate: {
                    path: 'studentId'
                }
            });

        console.log('company_list', company_list);
        console.log(company_list.students);
        // console.log(company_list.students[0].studentId.name);
        let student_list = await Student.find({});
        res.render('interview', {
            title: "Placement Cell",
            company_list,
            student_list
        });
    } catch (err) {
        console.log('error in showComapny controller');
        console.log(err);
    }

}

// controller for shedulign interview for students
module.exports.sheduleInterview = async function (req, res) {
    try {
        let studentId = req.body.studentId;
        console.log('studentIdvalue', studentId);
        if (!studentId) {
            return res.status(400).json({
                message: "not able to shedule Interview!",
                error: "Ple select valid value for student"
            });
        }
        let createdInterview = await Interview.create(req.body);
        console.log('createdInterview', createdInterview);
        let companyId = createdInterview.companyId;
        console.log('companyId', companyId);
        let modifiedCompanyRecord = await Company.findByIdAndUpdate(companyId, { $push: { students: createdInterview._id } });
        modifiedCompanyRecord = await Company.findById(companyId)
            .populate({
                path: 'students',
                populate: {
                    path: 'studentId'
                }
            });
        await Student.findByIdAndUpdate(studentId, { $push: { interviews: createdInterview._id } });
        console.log('modifiedCompanyRecord', modifiedCompanyRecord);
        let student_list = await Student.find({});
        // let html = await ejs.renderFile(__dirname + '../../views/sheduled_interview_table_data.ejs', {
        //     title: "Placement Cell",
        //     company: modifiedCompanyRecord,
        //     student_list
        // });
        let html = await ejs.renderFile(path.join(__dirname, '../views/sheduled_interview_table_data.ejs'), {
            title: "Placement Cell",
            company: modifiedCompanyRecord,
            student_list
        });
        console.log('value of html', html);
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    modifiedCompanyRecord: modifiedCompanyRecord,
                    html
                },
                message: "addedCompanyRecord!"
            });
        }
    } catch (err) {
        try {
            console.log(err);
            console.log('error in interview shedule controller');
            let errorObj = "";
            for (errorObj in err["errors"]) {
                console.log(errorObj);
            }
            return res.status(400).json({
                message: "not able to shedule Interview!",
                error: err["errors"][errorObj]["properties"]["message"]
            });
        } catch (err) {
            console.log("error in shedule Interivew Controller");
            console.log(err);
        }

    }
}

// controller for updating sheduled interview
module.exports.updateSheduledInterview = async function (req, res) {
    try {
        let studentId = req.body.studentId;
        console.log('studentIdvalue', studentId);
        if (!studentId) {
            return res.status(400).json({
                message: "not able to shedule Interview!",
                error: "Ple select valid value for student"
            });
        }
        console.log("reached updateSheduledInterview");
        console.log('req.body', req.body)
        let interviewId = req.body.interviewId;
        let companyId = req.body.companyId;
        await Interview.findByIdAndUpdate(interviewId, req.body);
        let modifiedCompanyRecord = await Company.findById(companyId)
            .populate({
                path: 'students',
                populate: {
                    path: 'studentId'
                }
            });
        console.log('modifiedCompanyRecord', modifiedCompanyRecord);
        let student_list = await Student.find({});
        // let html = await ejs.renderFile(__dirname + '../../views/sheduled_interview_table_data.ejs', {
        //     title: "Placement Cell",
        //     company: modifiedCompanyRecord,
        //     student_list
        // });
        let html = await ejs.renderFile(path.join(__dirname, '../views/sheduled_interview_table_data.ejs'), {
            title: "Placement Cell",
            company: modifiedCompanyRecord,
            student_list
        });
        console.log('value of html', html);
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    modifiedCompanyRecord: modifiedCompanyRecord,
                    html
                },
                message: "modifiedCompanyRecord!"
            });
        }
    } catch (err) {
        try{
            console.log(err);
            console.log('error in updateSheduledInterview controller');
            let errorObj = "";
            for (errorObj in err["errors"]) {
                console.log(errorObj);
            }
            return res.status(400).json({
                message: "not able to update sheduledInterview!",
                error: err["errors"][errorObj]["properties"]["message"]
            });
        }catch(err){
            console.log(err);
        }
    }
}

// controller for deleting sheduled interview
module.exports.deleteSheduledInterview = async function (req, res) {
    try {
        console.log("reached deleteSheduledInterview");
        console.log('req.body', req.body);
        console.log('req.query.interviewId', req.query.interviewId);
        let interviewId = req.query.interviewId;
        let companyId = req.query.companyId;
        await Interview.findByIdAndRemove(interviewId);
        let companyRecord = await Company.findByIdAndUpdate(companyId, { $pull: { students: interviewId } });
        let modifiedCompanyRecord = await Company.findById(companyId)
            .populate({
                path: 'students',
                populate: {
                    path: 'studentId'
                }
            });
        let studentId = req.query.studentId;
        await Student.findByIdAndUpdate(studentId, { $pull: { interviews: interviewId } });
        console.log(modifiedCompanyRecord);
        console.log('modifiedCompanyRecord', modifiedCompanyRecord);
        let student_list = await Student.find({});
        // let html = await ejs.renderFile(__dirname + '../../views/sheduled_interview_table_data.ejs', {
        //     title: "Placement Cell",
        //     company: modifiedCompanyRecord,
        //     student_list
        // });
        let html = await ejs.renderFile(path.join(__dirname, '../views/sheduled_interview_table_data.ejs'), {
            title: "Placement Cell",
            company: modifiedCompanyRecord,
            student_list
        });
        console.log('value of html', html);
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    modifiedCompanyRecord: modifiedCompanyRecord,
                    html
                },
                message: "modifiedCompanyRecord!"
            });
        }
    } catch (err) {
        console.log(err);
        console.log('error in deleteSheduledInterview controller');
    }
}