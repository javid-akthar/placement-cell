const https = require('https');
const axios = require("axios");

// controller for fetching job interviews
module.exports.fetchJob = async function (req, response) {
  try {
    // calling the job api
    const url = "https://www.arbeitnow.com/api/job-board-api";
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => {
        data = JSON.parse(data);
        // sending the jobs list as a rendered page
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
