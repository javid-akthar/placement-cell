// importing axios for fetching API data
const https = require('https')

//controller for fetch the get request of github job
module.exports.fetchJob = async function (req, response) {
  try {


    const url = "https://www.arbeitnow.com/api/job-board-api";
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => {
        data = JSON.parse(data);
        console.log('data', typeof (data.data[0]));
        console.log('data', typeof (data));
        console.log('data', data.data[0]);
        return response.render("job_listings", {
          title: "Placement Cell",
          job_list: data.data
        });
      })
    }).on('error', err => {
      console.log('err.message', err.message);
    })

  } catch (err) {
    console.log("*** Error in Fetching GET request ***", err);
    return res.redirect("back");
  }
};
