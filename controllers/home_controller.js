const Student = require('../model/student');
const Company = require('../model/company')

// home comtroler for displaying the student page
module.exports.home = async function(req, res){
  try{
    let company_list = await Company.find({})
    // exptracting the company and student data
  let student_list = await Student.find({})
  .populate({
    path: 'interviews',
    populate: {
      path: 'companyId'
    }
  });

    // rendering the student page
    return res.render('home',{
            title: "Contact List",
            student_list,
            company_list
    });
  }catch(err){
    console.log(err);
    console.log("error in home controller")
  }
  
}