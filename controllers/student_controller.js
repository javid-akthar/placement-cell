const Student = require('../model/student');
const studentInterview = require('../model/student_interview');
const company = require('../model/company');

module.exports.createStudent = function(req, res){
    let temp = req.body;
    console.log(temp);
    let obj = {
        name: temp.name,
        phone: temp.phone,
        email: temp.email,
        college: temp.college,
        batch: temp.batch,
        status: temp.status,
        dsaScore: temp.dsaScore,
        webDevelopmentScore: temp.webDevelopmentScore,
        reactScore: temp.reactScore
    }

    Student.create(obj , function(err, newStudent){
        if(err){
            console.log('Error in creating a Student')
            return;
        }
            console.log('******', newStudent);
            return res.redirect('back');
    });
}


module.exports.deleteStudent = function(req, res){
    let id= req.query.id;
    console.log('id',id);
    Student.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting record')
            // console.log(err);
        }
        return res.redirect('back');
    });
}

module.exports.updateStudent = function(req, res){
    console.log('the data to update is ', req.body);
    let id= req.body.id;
    console.log('id',id);
    Student.findByIdAndUpdate(id, req.body ,function(err){
        if(err){
            console.log('error in deleting record')
            // console.log(err);
        }
        return res.redirect('back');
    });
}

module.exports.addInterview = async function(req, res){
    console.log('zz',req.body);
    let companyId = req.body.company;
    let companyObj = await company.findById(companyId);
    let companyName = companyObj.companyName;
    req.body.companyName = companyName;
    console.log('req.body.companyName ',req.body.companyName );
    let studentId = req.body.student;
    studentInterview.create(req.body, function(err, addedInterview){
        if(err){
            console.log('Error in creating a Student');
            console.log(err);
            return;
        }
            console.log('******', addedInterview); 
            console.log('******', addedInterview._id);
            Student.findByIdAndUpdate(studentId,{$push:{interviews : addedInterview._id}}, function(err, updatedStudent){
                if(err){
                    console.log('error in adding intervies list to student');
                    console.log(err);
                }
                if (req.xhr){
                    return res.status(200).json({
                        data: {
                            addedInterview: addedInterview
                        },
                        message: "Post created!"
                    });
                }
                return res.redirect('back');
            });
    });
}

module.exports.deleteInterview = async function(req, res){
    let id= req.query.id;
    console.log('id',id);
    studentInterview.findByIdAndDelete(id, function(err, deletedInterview){
        if(err){
            console.log('error in deleting record')
            // console.log(err);
        }
        if(req.xhr){
            return res.status(200).json({
                data: {
                    deletedInterview: deletedInterview
                },
                message: "interview Sheduled deleted!"
            });
        }
        return res.redirect('back');
    });
}

module.exports.editInterview = async function(req, res){
    console.log('reachededit-interview');
    let interviewId = req.body.interviewId;
    studentInterview.findByIdAndUpdate(interviewId, req.body, function(err, updatedRecord){
        if(err){
            console.log('error in updating student sheduled interview')
            console.log(err);
        }
        if(req.xhr){
            return res.status(200).json({
                data: {
                    updatedRecord: updatedRecord
                },
                message: "interview modified updated!"
            });
        }
    });
}