console.log("updated-js-loaded");
function updateCompanyAjax(formId, closeBtnId, companyAccordianId, collapseDivId) {
  let formInputValidation = true;
  let formElements = $('#' + formId + " " + "input");
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

    console.log('companyAddForm.serialize()', companyAddForm.serialize());
    console.log('companyAddForm.name', companyAddForm.companyName);
    document.getElementById(closeBtnId).click();
    $(".modal-backdrop").hide();

    let addShowClass = false;
    if ($('#' + collapseDivId).hasClass("show")) {
      addShowClass = true;
    }

    $.ajax({
      type: 'post',
      url: '/company/update',
      data: companyAddForm.serialize(),
      success: function (data) {
        console.log('reached inside jquery');
        // console.log('data.data.html',data.data.html)
        // company-accordian<%= company._id %>
        let html = data.data.html;
        console.log('typeof(html)', typeof (html));
        // document.getElementById('student-details-ul-container').appendChild(html);
        console.log(document.getElementById(companyAccordianId));
        $("#" + companyAccordianId).replaceWith(html);
        if(addShowClass){
          $('#'+collapseDivId).addClass("show");
        }
        toastr.options.timeOut = 1500;
        toastr.success('Company Updated');
      }, error: function (error) {
        console.log(error.responseText);
        toastr.options.timeOut = 1500;
        toastr.error('Pls provide valid values');
      }
    });
  }
}
