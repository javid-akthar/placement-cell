let deleteStudentAndSheduledInterview = function (deletableStudnetId, deletableStudentRecord) {
    console.log('deletableStudnetId',deletableStudnetId);
    console.log('deletableStudentRecord',deletableStudentRecord);
    // url = 
    // ?ajaxid=4&UserID=" + UserID + "&EmailAddress=" + encodeURIComponent(EmailAddress)
    $.ajax({
        type: 'get',
        url: `/student/delete/?deletableStudnetId=${deletableStudnetId}&deletableStudentRecord=${encodeURIComponent(deletableStudentRecord)}`,
        body: { deletableStudnetId: deletableStudnetId,
            deletableStudentRecord: deletableStudentRecord },
        success: function (data) {
            console.log('data.data.status',data.data.status);
            if(data.data.status == true){
                $('#'+deletableStudentRecord).remove();
                toastr.options.timeOut = 1500;
                toastr.warning('Student deleted');
            }
            console.log('success');
            
        },
        error: function (err){
            console.log(err.responseText);
        }
    });
}
