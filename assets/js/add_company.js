// function to call addCompany controller
function addCompany(formId) {  
  let formInputValidation = true;
  let formElements = $('#' + formId + " " + "input");
  for (inputElement of formElements) {
    if (!inputElement.checkValidity()) {
      formInputValidation = false;
      return inputElement.reportValidity();
    }
  }
  // function to do form input validation
  if (formInputValidation) {
    document.getElementById(formId).submit();
    document.getElementById(formId).reset();
}
}

  console.log("add-form-loaded");
  function addCompanyAjax(formId, closeBtnId) {
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
        console.log("reached Company add form");
      let companyAddForm = $('#' + formId);
      console.log('companyAddForm', companyAddForm);
      document.getElementById(closeBtnId).click();
      $(".modal-backdrop").hide();
      console.log('companyAddForm.serialize()', companyAddForm.serialize());
      console.log('companyAddForm.name', companyAddForm.companyName);

      $.ajax({
        type: 'post',
        url: '/company/create',
        data: companyAddForm.serialize(),
        success: function (data) {
          console.log('reached inside jquery');
          // console.log('data.data.html',data.data.html)
          let html = data.data.html;
          console.log('typeof(html)', typeof (html));
          // document.getElementById('student-details-ul-container').appendChild(html);
          console.log(document.getElementById('company-list-container'));
          document.getElementById('company-list-container').insertAdjacentHTML('beforeend', html);
          toastr.options.timeOut = 1500;
          toastr.success('Company Added');
        }, error: function (error) {
          console.log(error.responseText);
        }
      });
      }
  }
