
console.log(' deleteSheduledInterview loaded')
function deleteSheduledInterview(deletableRecord, companyId, studentId){
    console.log('reaceh deleteSheduledInterview')
    $.ajax({
    type: 'get',
    url: '/company/delete-sheduled-interview',
    data: {interviewId: deletableRecord, companyId, studentId},
    success: function (data) {
        console.log(data);
        let updatedData = data.data.modifiedCompanyRecord
        // render sheduled interview table
        let rederableTable = document.getElementById('sheduled-interviews-table' + updatedData._id);
        // rederableTable.innerHTML = newTable(updatedData);
        console.log('data.data.html',data.data.html)
        rederableTable.innerHTML = data.data.html;
    }, error: function (error) {
        console.log(error.responseText);
    }
});
}