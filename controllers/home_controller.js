const Student = require('../model/student');
const Company = require('../model/company')
module.exports.home = async function(req, res){
  let company_list = await Company.find({})
  let student_list = await Student.find({}).populate('interviews');
  // console.log('hhss', student_list);
  // console.log('abccs',student_list[0].interviews[0]);

    return res.render('home',{
            title: "Contact List",
            student_list,
            company_list
    });
}