const express = require('express');
const bodyParser = require('body-parser');
//mongo db configuration 
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');
// create a express app
const app = express();
//parse request of content-type - application.x-www-urlencoded
app.use(bodyParser.urlencoded({extended : true}))
//parse request of content-type - application/json
app.use(bodyParser.json())
mongoose.Promise = global.Promise;
console.log("url",dbConfig)
console.log("url",dbConfig.url)
//conecting to database
mongoose.connect(dbConfig.url,{
    useNewUrlParser: true
}).then(() =>{
    console.log('Successfully connect to the databse of mongo');
}).catch(err =>{
    console.log('Could not connect to database. Exiting now.....', err);
    process.exit();
})
//define a simple route
app.get('/',(req,res) =>{
    res.json({"message": "welcome to easyNotes application. Take notes quickly. Organize and keeptrack of all your notes"});
})
//..........
//Reuire Notes routes
require('./app/routes/note.routes')(app);
 // listen for request
 app.listen(3000, () =>{
     console.log("server is listing on port 3000");
 });
