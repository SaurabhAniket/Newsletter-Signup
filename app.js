//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app =express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/" , function(req,res){
    const firstName = req.body.fName;
    const LastName = req.body.lName;
    const email = req.body.email;
    const data ={
        member:{
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: LastName,
            }
        }
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/account/2723a87d0e"
    // const url = "https://us9.api.mailchimp.com/3.0/lists/2723a87d0e";
    const options = {
        method: "POST",
        auth: "0f1198f3d3f08de0eebdb173182d295e-us9"

    }

    const request = https.request(url,options,function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();


    


});

app.listen(3000, function(){
    console.log("Server is Running on Port 3000");
});


// API KEY = 739019dc4647c21ce7173b2c249646b8-us9
// LIST ID = 2723a87d0e