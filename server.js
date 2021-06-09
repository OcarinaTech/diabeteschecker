const express = require("express");
const app = express();
const PORT = 3001;
const FormController = require("./FormController");
// const spawn = require("child_process").spawn;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("./"));

// create endpoints and routes:
app.get("/", function (req, res) {
  res.send("Hello from Express JS!");
});

app.get("/api/ping", function (req, res) {
  return res.send("pong");
});

app.post("/api/formCheck", FormController.sendDataToModel, (req, res) => {
  // return next(res);
  console.log("server.js line22 :", res.locals.result);
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
app.listen(PORT, "127.0.0.1");

console.log("Listening on port: ", PORT);
