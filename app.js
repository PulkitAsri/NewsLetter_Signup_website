//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https=require("https");




const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");

});
app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
                }   
            }
        ]
    };

    const jsonData=JSON.stringify(data);

    const url="https://us1.api.mailchimp.com/3.0/lists/8ba058b952?";

    const options={
        method:"POST",
        auth:"Pulkit_asri:42c5bfa000c144ea47f5b85dbe7b246b-us1"
    }
    
    const request=https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));

        });

        console.log();
    });

    request.write(jsonData);
    request.end();

});


app.listen(3000, function () {
    console.log("Server Sunning On Port 3000");
});
//  Api Key 
// 42c5bfa000c144ea47f5b85dbe7b246b-us1

//Type of Data
// {"name":"","contact":{"company":"","address1":"","address2":"","city":"","state":"","zip":"","country":"","phone":""},"permission_reminder":"","use_archive_bar":false,"campaign_defaults":{"from_name":"","from_email":"","subject":"","language":""},"notify_on_subscribe":"","notify_on_unsubscribe":"","email_type_option":false,"visibility":"pub","double_optin":false,"marketing_permissions":false}

// List Id
// 8ba058b952