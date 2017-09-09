const express = require('express');
const bodyParser = require('body-parser');
const volley = require('volleyball');
const path = require('path');

const app = express();
app.use(volley);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./public")));

app.get('/', function(req, res, next){
  res.send('index.html');
})

app.listen(process.env.PORT || 4726, function(){
  console.log('Listening to port 4726');
})
