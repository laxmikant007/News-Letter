const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const https = require('https');


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/' , function(req, res){

    res.sendFile(__dirname + '/signup.html')
 
})

app.post('/' , function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    console.log(firstName ,  lastName , email);

    const data = {
        members: [
            { 
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: 'firstName',
                    LNAME: 'lastName'
                }
           
            }
        ]

    };


    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/7ed1f3610a";

    const options = {
        method: 'POST',
        auth: "laxmikant1 :37a0a5fa95b700373b52690ff8a4772b-us10 "
    }


   const request = https.request(url,options, function(response){

        response.on("data" , function(data){
            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end();

});












app.listen(3000 , function(){
    console.log("Server is started on 3000 port!");
})




// 37a0a5fa95b700373b52690ff8a4772b-us10
// 7ed1f3610a