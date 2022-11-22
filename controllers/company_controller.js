const Company = require('../model/company');
const Student = require('../model/student');
const Interview = require('../model/student_interview');
const ejs = require('ejs');

module.exports.createCompany = function (req, res) {
    Company.create(req.body, function (err, newCompany) {
        if (err) {
            console.log('Error in creating a Company')
            return;
        }
        console.log('******', newCompany);
        return res.redirect('back');
    });
}



module.exports.showComapny = async function (req, res) {
    try {
        let company_list = await Company.find({}).populate('students');
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

module.exports.sheduleInterview =async function(req, res){
    let studentId = req.body.studentId;
    let studentName =await Student.findById(studentId);
    studentName = studentName.name;
    req.body.studentName = studentName;
    let createdInterview =await Interview.create(req.body);
    console.log('createdInterview',createdInterview);
    let companyId = createdInterview.companyId;
    console.log('companyId',companyId);
    let modifiedCompanyRecord =await Company.findByIdAndUpdate(companyId, {$push:{students : createdInterview._id}} ).populate('students');
    modifiedCompanyRecord = await Company.findById(companyId).populate('students');
    await Student.findByIdAndUpdate(studentId, {$push: {interviews: createdInterview._id}}) ;
    console.log('modifiedCompanyRecord',modifiedCompanyRecord);
    let student_list = await Student.find({});
    let html = await ejs.renderFile(__dirname +'../../views/demo.ejs',{
        title: "Placement Cell",
        company: modifiedCompanyRecord,
        student_list
    });
    console.log('value of html',html);
    if(req.xhr){
        return res.status(200).json({
            data: {
                modifiedCompanyRecord: modifiedCompanyRecord,
                html
            },
            message: "addedCompanyRecord!"
        });
    }
}


module.exports.updateSheduledInterview =async function(req, res){
    console.log("reached updateSheduledInterview");
    console.log('req.body',req.body)
    let interviewId = req.body.interviewId;
    let companyId = req.body.companyId;
    await Interview.findByIdAndUpdate(interviewId, req.body);
    let modifiedCompanyRecord = await Company.findById(companyId).populate('students');
    console.log('modifiedCompanyRecord',modifiedCompanyRecord);
    let student_list = await Student.find({});
    let html = await ejs.renderFile(__dirname +'../../views/demo.ejs',{
        title: "Placement Cell",
        company: modifiedCompanyRecord,
        student_list
    });
    console.log('value of html',html);
    if(req.xhr){
        return res.status(200).json({
            data: {
                modifiedCompanyRecord: modifiedCompanyRecord,
                html
            },
            message: "modifiedCompanyRecord!"
        });
    }

}

module.exports.deleteSheduledInterview =async function(req, res){
    console.log("reached deleteSheduledInterview");
    console.log('req.body',req.body);
    console.log('req.query.interviewId',req.query.interviewId);
    let interviewId = req.query.interviewId;
    let companyId = req.query.companyId;
    // let interviewId = req.body.interviewId;
    // let companyId = req.body.companyId;
    await Interview.findByIdAndRemove(interviewId);
    let companyRecord = await Company.findByIdAndUpdate(companyId, {$pull: {students : companyId}});
    let modifiedCompanyRecord = await Company.findById(companyId).populate('students');
    let studentId = req.query.studentId;
    await Student.findByIdAndUpdate(studentId, {$push: {interviews: createdInterview._id}}) ;
    console.log(modifiedCompanyRecord);
    console.log('modifiedCompanyRecord',modifiedCompanyRecord);
    let student_list = await Student.find({});
    let html = await ejs.renderFile(__dirname +'../../views/demo.ejs',{
        title: "Placement Cell",
        company: modifiedCompanyRecord,
        student_list
    });
    console.log('value of html',html);
    if(req.xhr){
        return res.status(200).json({
            data: {
                modifiedCompanyRecord: modifiedCompanyRecord,
                html
            },
            message: "modifiedCompanyRecord!"
        });
    }
}