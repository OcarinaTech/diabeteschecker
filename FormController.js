const FormController = {};
// const spawn = require("child_process").spawn;

FormController.sendDataToModel =  (req, res, next) => {
  console.log("hey from FormController.js line 4");
  const {
    age,
    alopecia,
    blurring,
    gender,
    healing,
    hungry,
    irritable,
    obese,
    paralysis,
    pee,
    stiffness,
    thirsty,
    weak,
    weightLoss,
    yeast} = req.body;

  console.log(age,
    alopecia,
    blurring,
    gender,
    healing,
    hungry,
    irritable,
    obese,
    paralysis,
    pee,
    stiffness,
    thirsty,
    weak,
    weightLoss,
    yeast);

    const { spawn } = require("child_process");
    const pyProg = spawn("python", ["ml_model/exampleModel.py", 23, 1, 1]);
    pyProg.stdout.on("data", function (data) {
      res.locals.result = data;
    console.log(data.toString());
    // res.end("end");
    });
    return next();
}

// FormController.sendDataToModelGoodOne =  (req, res, next) => {
//   const { spawn } = require("child_process");
//   const pyProg = spawn("python", ["../ml_model/exampleModel.py", 23, 1, 2]);
//   pyProg.stdout.on("data", function (data) {
//     console.log(data.toString());
//     res.write(data);
//     res.end("end");
//   });
// }

module.exports = FormController;