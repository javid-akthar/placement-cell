const Student = require('../model/student');
const studentInterview = require('../model/student_interview');
const company = require('../model/company');
const ejs = require("ejs");


module.exports.createStudent =async function(req, res){
    try{
    console.log('value of req',req.body);    
    let obj = req.body;
    console.log('objvalue',req.body);
    let addedStudent = await Student.create(obj);
    let student_list = await Student.find({})
        .populate({
            path: 'interviews',
            populate: {
                path: 'companyId'
            }
        });

     let html = await ejs.renderFile(__dirname +'../../views/student_details_list.ejs',{
            title: "Placement Cell",
            i : addedStudent
     }); 
     console.log('req.xhr',req.xhr);

     if(req.xhr){
        console.log('inside shr');
        return res.status(200).json({
            data: {
                html: html
            },
            message: "addedCompanyRecord!"
        });
     }   
    }catch(err){
        console.log('error in createStudent controller');
        console.log(err);
    }
}


module.exports.deleteStudent = function (req, res) {
    let id = req.query.id;
    console.log('id', id);
    Student.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log('error in deleting record')
            // console.log(err);
        }
        return res.redirect('back');
    });
}

module.exports.updateStudent =async function (req, res) {
    // console.log('the data to update is ', req.body);
    // let id = req.body.id;
    // console.log('id', id);
    // Student.findByIdAndUpdate(id, req.body, function (err) {
    //     if (err) {
    //         console.log('error in deleting record')
    //         // console.log(err);
    //     }
    //     return res.redirect('back');
    // });

    try{
        console.log('value of req',req.body);    
        let obj = req.body;
        let studentId = req.body.id;
        console.log('objvalue',req.body);
        let modifiedStudent = await Student.findByIdAndUpdate(studentId, obj);
        modifiedStudent = await Student.findById(studentId);
    
         let html = await ejs.renderFile(__dirname +'../../views/student_details_list.ejs',{
                title: "Placement Cell",
                i : modifiedStudent
         }); 
         console.log('req.xhr',req.xhr);
    
         if(req.xhr){
            console.log('inside shr');
            return res.status(200).json({
                data: {
                    html: html
                },
                message: "modifiedStudentRecord!"
            });
         }   
        }catch(err){
            console.log('error in updateStudent controller');
            console.log(err);
        }

}