const Student = require('../model/student');
const Company = require('../model/company')
module.exports.home = async function(req, res){
  let company_list = await Company.find({})
  let student_list = await Student.find({})
  .populate({
    path: 'interviews',
    populate: {
      path: 'companyId'
    }
  });

  // let posts = await Post.find({})
  //       .sort('-createdAt')
  //       .populate('user')
  //       .populate({
  //           path: 'comments',
  //           populate: {
  //               path: 'user'
  //           },
  //           populate: {
  //               path: 'likes'
  //           }
  //       }).populate('likes');

    return res.render('home',{
            title: "Contact List",
            student_list,
            company_list
    });
}