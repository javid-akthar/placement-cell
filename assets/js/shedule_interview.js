function sheduleInterview(formId, closeBtnId) {

    let formInputValidation = true;
    let formElements = $('#' + formId + " " + "input");
    for (inputElement of formElements) {
        if (!inputElement.checkValidity()) {
            formInputValidation = false;
            return inputElement.reportValidity();
        }
    }
    if (formInputValidation) {
        console.log('reached sheduleInterview');
        let formIdtemp = document.getElementById(formId);
        console.log(formIdtemp);
        let shedulingInterviewForm = $('#' + formId);
        // console.log('typeof(shedulingInterviewForm',typeof(shedulingInterviewForm));
        // console.log(shedulingInterviewForm.get(0));
        console.log('shedulingInterviewForm', shedulingInterviewForm);
        console.log('shedulingInterviewForm.serialize()', shedulingInterviewForm.serialize());
        document.getElementById(closeBtnId).click();
        $(".modal-backdrop").hide();
        $.ajax({
            type: 'post',
            url: '/company/shedule-interview/',
            data: shedulingInterviewForm.serialize(),
            success: function (data) {
                console.log('success');
                console.log(data);
                let updatedData = data.data.modifiedCompanyRecord
                // render sheduled interview table
                let rederableTable = document.getElementById('sheduled-interviews-table' + updatedData._id);
                rederableTable.innerHTML = data.data.html;
                toastr.options.timeOut = 1500;
                toastr.success('Interview Added');
                document.getElementById(formId).reset();
            }, error: function (error) {
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

