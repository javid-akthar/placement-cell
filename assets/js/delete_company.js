
//  async function apicall(){
//     var data = await fetch("https://www.arbeitnow.com/api/job-board-api");
//  var res = await data.json();
//  console.log('dd',res.data[0]);
//  console.log('dd',res);
//  }
//  apicall();

 

let deleteCompanyAndSheduledInterviews = function (deletableCompanyId, deletableCompanyAccordian) {
    console.log('insidedeletableCompanyId',deletableCompanyId);
    console.log('deletableCompanyAccordian',deletableCompanyAccordian);
    $.ajax({
        type: 'get',
        url: `/company/delete/?deletableCompanyId=${deletableCompanyId}&deletableCompanyAccordian=${encodeURIComponent(deletableCompanyAccordian)}`,
        body: { deletableCompanyId: deletableCompanyId,
                 deletableCompanyAccordian: deletableCompanyAccordian },
        success: function (data) {
            console.log('data.data.status',data.data.status);
            if(data.data.status == true){
                $('#'+deletableCompanyAccordian).remove();
            }
            console.log('success');
            toastr.options.timeOut = 1500;
            toastr.warning('Company and relevant interviews deleted');
        },
        error: function (err){
            console.log(err.responseText);
        }
    });
}
