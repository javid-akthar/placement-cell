//  addStudentInterview2 = function(formId){
//         let newPostForm = $('#'+formId);

//         newPostForm.submit(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type: 'post',
//                 url: '/student/add-interview',
//                 data: newPostForm.serialize(),
//                 success: function(data){
//                     console.log(data);
//                     // let newPost = newPostDom(data.data.addedInterview);
//                     // $('#posts-list-container>ul').prepend(newPost);
//                 }, error: function(error){
//                     console.log(error.responseText);
//                 }
//             });
//         });
//     }
