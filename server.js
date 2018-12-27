"use strict";
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const axios = require("axios");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(express.static("public"));

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require("./routes/htmlRoutes")(app);
// POST route from contact form
// let reviews;
// axios({
//   url: "https://api.yelp.com/v3/businesses/eyebrow-queen-salon-oakland/reviews",
//   method: "GET",
//   headers: {
//     Authorization:
//       "Bearer bodr0C5NbsgwzXAY66PQgwsXriZVq25XHKYI_c0arjunsapkotaeKB3bU1Oc_wyGi7rM0IANKu2IknzKhXd8Mw3DuQNAnLTRklS96KP28l5jlLHJ-FtWd_Y1dM2pwWeR0jQ_2oYeXHYx"
//   }
// }).then(response => {
//   console.log(response.data);
//   reviews = response.data;
// });
// app.get("/reviews", function(req, res) {
//   res.send(reviews);
// });
app.post("/contact", function(req, res) {
  console.log("data from the contact form: ", req.body);

  const sendthemail = async () => {
    const oauth2Client = new OAuth2(
      "235455796862-b7onrahbiqhiqtk6j4s7e157t5t8n9t1.apps.googleusercontent.com", // ClientID
      "aFMbPQrmvBYj0jfvL3lIo7pe", // Client Secret
      "https://http://localhost:8080/" // Redirect URL
    );

    oauth2Client.setCredentials({
      refresh_token: "1/W9MWsi4vy1SOT4LnindH5oPLJowyLW8jOqi_yuPAxpI"
    });
    //const tokens = oauth2Client.refreshAccessToken();

    const tokens = await oauth2Client.getAccessToken();

    console.log("token ########### :  ", tokens.token);
    const accessToken = tokens.token;

    let mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "class.omega.group@gmail.com",
        clientId:
          "235455796862-b7onrahbiqhiqtk6j4s7e157t5t8n9t1.apps.googleusercontent.com",
        clientSecret: "aFMbPQrmvBYj0jfvL3lIo7pe",
        refreshToken: "1/W9MWsi4vy1SOT4LnindH5oPLJowyLW8jOqi_yuPAxpI",
        accessToken: accessToken,

        expires: 1484314697598
      },
      TLS: {
        rejectUnauthorized: false
      }
    });
    // verify connection configuration
    smtpTrans.verify(function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
    mailOpts = {
      from: req.body.name + " &lt;" + req.body.email + "&gt;",
      to: "arjunalap@gmail.com",
      subject: "Customer Inquiry from EBQ salon",
      text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    };
    smtpTrans.sendMail(mailOpts, function(error, response) {
      if (error) {
        res.send("contact-failure");
      } else {
        res.sendStatus(200);
      }
    });
  };
  sendthemail();
});
// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
