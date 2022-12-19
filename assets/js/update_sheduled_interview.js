// function to edit sheduled interview details without page reload
function editsheduleInterview(formId, closeBtnId) {
    let formInputValidation = true;
    let formElements = $('#' + formId + " " + "input");
    for (inputElement of formElements) {
        if (!inputElement.checkValidity()) {
            formInputValidation = false;
            return inputElement.reportValidity();
        }
    }
    // code to perform form validation
    if (formInputValidation) {
        console.log('reached editsheduleInterview');
        let formIdtemp = document.getElementById(formId);
        console.log(formIdtemp);
        let editsheduledInterviewForm = $('#' + formId);
        console.log('editsheduledInterviewForm', editsheduledInterviewForm);
        console.log('editsheduledInterviewForm.serialize()', editsheduledInterviewForm.serialize());
        document.getElementById(closeBtnId).click();
        $(".modal-backdrop").hide();
        $.ajax({
            type: 'post',
            url: '/company/edit-sheduled-interview',
            data: editsheduledInterviewForm.serialize(),
            success: function (data) {
                console.log(data);
                let updatedData = data.data.modifiedCompanyRecord
                // render sheduled interview table
                let rederableTable = document.getElementById('sheduled-interviews-table' + updatedData._id);
                console.log('data.data.html', data.data.html)
                rederableTable.innerHTML = data.data.html;
                toastr.options.timeOut = 1500;
                toastr.success('Interview Updated');
            }, error: function (error) {
                // to handle error scenario of ajax call
                console.log(error.responseText);
                errObj = JSON.parse(error.responseText);
                console.log("harvest error", errObj["message"]);
                console.log("error.error", errObj["error"]);
                toastr.options.timeOut = 1500;
                toastr.error(errObj["message"] + " " + errObj["error"]);
                document.getElementById(formId).reset();
            }
        });
    }
}

