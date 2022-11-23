function editsheduleInterview(formId, closeBtnId) {
    console.log('reached editsheduleInterview');
    let formIdtemp = document.getElementById(formId);
    console.log(formIdtemp);
    let editsheduledInterviewForm = $('#' + formId);
    console.log('editsheduledInterviewForm', editsheduledInterviewForm);
    console.log('editsheduledInterviewForm.serialize()', editsheduledInterviewForm.serialize());
    document.getElementById(closeBtnId).click();
    $.ajax({
        type: 'post',
        url: '/company/edit-sheduled-interview',
        data: editsheduledInterviewForm.serialize(),
        success: function (data) {
            console.log(data);
            let updatedData = data.data.modifiedCompanyRecord
            // render sheduled interview table
            let rederableTable = document.getElementById('sheduled-interviews-table' + updatedData._id);
            console.log('data.data.html',data.data.html)
            rederableTable.innerHTML = data.data.html;
        }, error: function (error) {
            console.log(error.responseText);
        }
    });
}

