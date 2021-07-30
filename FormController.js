const { typeOf } = require("react-is");

const FormController = {};

// console.log("FormController called")
FormController.sendDataToModel = (req, res, next) => {

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
  } = JSON.parse(Object.keys(req.body)[0]);

  /* YOU MUST USE THIS ORDER: 
    Age,Gender,pee,thirsty,weightloss,weak,hungry,yeast,blurring,itching,irritable,healing,paralysis,stiffness,alopecia,obese  
  */
  const { spawn } = require("child_process");
  const values = {
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
  };
  
  for(let value in values){
    if(!values[value].match(/^[0-9]+$/)){
      next("Data Invalid")
    }
  }
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

