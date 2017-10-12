var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

//APP CONFIGURATION
//Project
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


//ROUTES 

app.get("/",function(req,res)
{
    res.render("landing");
});


app.get("/form",function(req, res) {
    res.render("form");
})

app.get("/results", function(req, res){
    var query = req.query.searchs;
    var url = "http://it-ebooks-api.info/v1/search/" + query;
    
    request(url , function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body)
            res.render("results", {data: data,input: query});
            //console.log(data["Books"][0]["Title"]);
        }
    });
});





//Server listener 
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("SERVER IS RUNNING!");
});





