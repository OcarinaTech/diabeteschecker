const express = require("express");
const app = express();
const PORT = 3001;
const FormController = require("./FormController");
// const spawn = require("child_process").spawn;
const path = require('path');
const cors = require('cors');
const corsOptions = {
  origin: 'http://172.26.9.82:3000',
  //origin: 'http://www.ocarinadev.com:3000',
  //origin: "*",
  methods: "POST",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, './build/static')));
app.use(express.static("./build"));

// create endpoints and routes:
app.get("/", function (req, res) {
  res.send("Hello from Express JS!");
});

app.get("/api/ping", function (req, res) {
  return res.send("pong");
});

app.post("/api/formCheck", cors(corsOptions), FormController.sendDataToModel, (req, res) => {
  console.log("server.js", res.locals.result)
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return res.status(200).send(res.locals.result);
});

app.get("/api/python", (req, res) => {
  const { spawn } = require("child_process");
  const pyProg = spawn("python", ["ml_model/exampleModel.py", 23, 1, 2]);
  pyProg.stdout.on("data", function (data) {
    console.log(data.toString());
    res.write(data);
    res.end("end");
  });
});

app.get('/*',  (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

// app.get("/api/json", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

// app.get("/process_get", function (req, res) {
//   const response = {
//     age: req.query.age,
//     gender: req.query.gender,
//     pee: req.query.pee,
//     weightLoss: req.query.weightLoss,
//     weak: req.query.weak,
//     hungry: req.query.hungry,
//     yeast: req.query.yeast,
//     blurring: req.query.blurring,
//     irritable: req.query.irritable,
//     healing: req.query.healing,
//   };
//   console.log(response);
//   res.end(JSON.stringify(response));
// });

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send("Error 404"));

// global error handler
// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: "Express error handler caught unknown middleware error",
//     status: 500,
//     message: { err: "An error occurred" },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

//set port:
//app.listen(PORT, "127.0.0.1");
app.listen(PORT);

console.log("Listening on port: ", PORT);

