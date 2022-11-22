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
            // rederableTable.innerHTML = newTable(updatedData);
            console.log('data.data.html',data.data.html)
            rederableTable.innerHTML = data.data.html;
        }, error: function (error) {
            console.log(error.responseText);
        }
    });
}

function newTable(updatedData) {
    console.log('inside newTable function')
    let tempTable = `
<table class="table table-striped">
    <thead>
        <tr>
            <th scope="col">S.No</th>
            <th scope="col">Student Name</th>
            <th scope="col">Profile</th>
            <th scope="col">Result</th>
        </tr>
    </thead>
    <tbody>`;
    console.log('updatedData', updatedData)
    for (k of updatedData.students) {
        // let editSection = ejs.render("<%- include('demo') %>");
        // console.log('editSection',editSection)
        tempTable += `<tr>
                <th scope="row">count</th>
                <td>${k.studentName}</td>
                <td>${k.profile}</td>
                <td>${k.result}</td>
            </tr>`;
    }

    tempTable += `</tbody>
</table>`;

    return tempTable;
}
