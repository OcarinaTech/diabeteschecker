const express = require('express'); 
const app = express();
const PORT = 3001;
const spawn = require("child_process").spawn;



// create endpoints and routes:
app.get('/', function(req,res) {
	res.send("Hello from Express JS!"); 
});

app.get('/api/ping', function (req, res) {
 return res.send('pong');
});


app.get('/api/python', (req, res) => {
    const { spawn } = require('child_process');
    const pyProg = spawn('python', ["ml_model/exampleModel.py", 23,1,2]);
    pyProg.stdout.on('data', function(data) {
        console.log(data.toString());
        res.write(data);
        res.end('end');
    });
})


app.get("/api/json", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.get('/process_get', function (req, res) {  
response = {  
       age:req.query.age,  
       gender:req.query.gender,
       pee:req.query.pee,
       weightLoss:req.query.weightLoss,
       weak:req.query.weak,
       hungry:req.query.hungry,
       yeast:req.query.yeast,
       blurring:req.query.blurring,
       irritable:req.query.irritable,
       healing:req.query.healing      
   };  
   console.log(response);  
   res.end(JSON.stringify(response));  
})  

//set port:
app.listen(PORT); 
