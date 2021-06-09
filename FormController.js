const FormController = {};
// const spawn = require("child_process").spawn;

FormController.sendDataToModel = (req, res, next) => {
  console.log("hey from FormController.js line 4");
  const {
    age,
    alopecia,
    blurring,
    gender,
    healing,
    hungry,
    irritable,
    itching,
    obese,
    paralysis,
    pee,
    stiffness,
    thirsty,
    weak,
    weightloss,
    yeast,
  } = req.body;

  /* YOU MUST USE THIS ORDER: 
    Age,Gender,pee,thirsty,weightloss,weak,hungry,yeast,blurring,itching,irritable,healing,paralysis,stiffness,alopecia,obese  
  */
  const { spawn } = require("child_process");
  console.log(
    age,
    gender,
    pee,
    thirsty,
    weightloss,
    weak,
    hungry,
    yeast,
    blurring,
    itching,
    irritable,
    healing,
    paralysis,
    stiffness,
    alopecia,
    obese
  );
  const pyProg = spawn(
    "python",
    [
      "ml_model/exampleModel.py",
      age,
      gender,
      pee,
      thirsty,
      weightloss,
      weak,
      hungry,
      yeast,
      blurring,
      itching,
      irritable,
      healing,
      paralysis,
      stiffness,
      alopecia,
      obese,
    ],
    { cwd: __dirname }
  );
  pyProg.stdout.on("data", function (data) {
    console.log("FormController.js line 72: ", data.toString());
    res.locals.result = data.toString();
    return next();
  });

  // process.on("close", (data) => {
  //   //res.send(result);
  // });
};

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
