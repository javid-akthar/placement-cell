// function to edit student details without page relaod
    function studentEdit(formId, closeBtnId, listId, collapseDivId) {
    let formInputValidation = true;
    let formElements = $('#' + formId + " " + "input");
    // code to perform form validation
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
      $('.modal-backdrop').remove();
      console.log('studentAddForm.serialize()', studentAddForm.serialize());
      let addShowClass = false;
      if ($('#' + collapseDivId).hasClass("show")) {
        addShowClass = true;
      }
      // code to perform ajax call to /student/update 
      $.ajax({
        type: 'post',
        url: '/student/update',
        data: studentAddForm.serialize(),
        success: function (data) {
          console.log('reasched inside jquery');
          let html = data.data.html;
          // html = $.parseHTML(html),
          console.log('typeof(html)', typeof (html));
          // console.log('typeof(listNode)',typeof(listNode));
          // listNode.parentNode.replaceChild(html, listNode);
          // id="collapseOne<%= i._id %>"

          $('#' + listId).replaceWith(html);
          if (addShowClass) {
            $('#' + collapseDivId).addClass("show");
          }
          toastr.options.timeOut = 1500;
          toastr.success('Student Details Updated');
        }, error: function (error) {
          // to handle negative sceanrio
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