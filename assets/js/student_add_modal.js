console.log("add-form-loaded");
function addNewStudent(formId, closeBtnId) {
  let formInputValidation = true;
  let formElements = $('#' + formId + " " + "input");
  // const reversedFormElements = formElements.reverse();
  for (inputElement of formElements) {
    if (!inputElement.checkValidity()) {
       formInputValidation = false;
       return inputElement.reportValidity();
    }
  } 
    if (formInputValidation) {
      console.log("reached student add form");
    let studentAddForm = $('#' + formId);
    console.log('studentAddForm', studentAddForm);
    document.getElementById(closeBtnId).click();
    $(".modal-backdrop").hide();
    console.log('studentAddForm.serialize()', studentAddForm.serialize());
    console.log('studentAddForm.name', studentAddForm.name);

    $.ajax({
      type: 'post',
      url: '/student/create',
      data: studentAddForm.serialize(),
      success: function (data) {
        console.log('reasched inside jquery');
        // console.log('data.data.html',data.data.html)
        let html = data.data.html;
        console.log('typeof(html)', typeof (html));
        // document.getElementById('student-details-ul-container').appendChild(html);
        console.log(document.getElementById('student-details-ul-container'));
        document.getElementById('student-details-ul-container').insertAdjacentHTML('beforeend', html);

        toastr.options.timeOut = 1500;
        toastr.success('Student Added');
        document.getElementById(formId).reset();
      }, error: function (error) {
        console.log(error.responseText);
        errObj = JSON.parse(error.responseText);
        console.log("harvest error",errObj["message"]);
        console.log("error.error",errObj["error"]);
        toastr.options.timeOut = 1500;
        toastr.error(errObj["message"]+" "+errObj["error"]);
        document.getElementById(formId).reset();
      }
    });
    }
}