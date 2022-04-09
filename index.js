// A static server using Node and Express
const express = require("express");
const fetch = require('node-fetch');
const app = express();
const schoolList = require( './schoolList');


// app.set('trust proxy', true);



app.get("/", (request, response) => {
  // response.sendFile(__dirname + "/index.html");
  console.log("receive the request.")
  response.send("Receive your request.");
});

app.use(function (request, response, next) {
  console.log("got request",request.url);
  next();
})

app.get("/api/getSchool", function(request, response, next) {
  console.log("get School Request");
  //let body = request.body;
 
  // const body = { a: 1 };
 
  // fetch('https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=BIId3uPObpE9c5zgzM0cOEiTgSJoTiC464a5KZfP&school.state=CA&school.degrees_awarded.predominant=3&fields=school.name&per_page=99')
  //   .then(res => res.json())
  //   .then(json => {
  //     let result = "";
  //     console.log(json.results[0]["school.name"]);
  //     var jsonObj = {};
  //     var list = []
  //     for(i = 0;i<99;i++){
  //       list.push({id:i,name:json.results[i]["school.name"]});
  //     }
  //     console.log(list);
  //     jsonObj[0]= list;
  //     console.log(jsonObj);
  //     response.send(jsonObj);
  //   })
  //   .catch(err => console.log(err)); 
  console.log(schoolList);
  response.send(schoolList.schoolList);
});

app.get("/api/getInfor", function(request, response, next) {
  console.log("get Infor Request");

  let school = request.query.school;
  console.log(`receive "${school}" as request `);
 
  let url = "https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=BIId3uPObpE9c5zgzM0cOEiTgSJoTiC464a5KZfP&school.name="+ school;
  console.log(url);
  const body = { a: 1 };
 
  fetch(url)
    .then(res => res.json())
    .then(json => {
      let result = "";
      console.log(json.results[0]["latest"]["cost"]["tuition"]["in_state"]);
      console.log(json.results[0]["latest"]["cost"]["attendance"]["academic_year"]);
      address = json.results[0]["school"]["name"] + ","
                + json.results[0]["school"]["state"] + ","
                + json.results[0]["school"]["city"];
      console.log(address);
      response.send({tuition:json.results[0]["latest"]["cost"]["tuition"]["in_state"],fee:json.results[0]["latest"]["cost"]["attendance"]["academic_year"],address:address});
    });
});




app.get("/api/getDiscount", function(request, response, next) {
  console.log("get Discount Request");
  
  console.log(request);

  // let requestList = request.body.splite("/");
  let school = request.query.school;
  let income = request.query.income;
  console.log(income)
  console.log(`The select school "${school}" with income level ${income}`);
  let url = "https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=BIId3uPObpE9c5zgzM0cOEiTgSJoTiC464a5KZfP&school.name=" + school + "&fields=2018.cost";
  const body = { a: 1 };
  
  fetch(url)
    .then(res => res.json())
    .then(json => {
      let result = "";
      
      if(income == 1){
        result = json.results[0]["2018.cost.net_price.consumer.by_income_level.0-30000"];
        console.log(1)
      }else if(income == 2){
         result = json.results[0]["2018.cost.net_price.consumer.by_income_level.30001-48000"];
      }else if(income == 3){
        result = json.results[0]["2018.cost.net_price.consumer.by_income_level.48001-75000"];
      }else if(income == 4){
        result = json.results[0]["2018.cost.net_price.consumer.by_income_level.750001-111000"];
      }else if(income == 5){
        result = json.results[0]["2018.cost.net_price.consumer.by_income_level.110001-plus"];
      }
      
      console.log(result);
      response.send({netPrice:result});
    });    
});

app.use(function (request, response) {
  response.status(404);
  response.send("Cannot answer this request");
})


// listen for requests :)
const listener = app.listen(3000, () => {
  console.log("The static server is listening on port " + listener.address().port);
});
