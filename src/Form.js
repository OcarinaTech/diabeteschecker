import React, {useState} from "react";

import "./index.css";
import {
  FormControl,
  FormLabel,
  Button,
  Dialog,
  Grid,
  Radio,
  FormControlLabel,
  RadioGroup,
  Input,
} from "@material-ui/core";


const useInput = (init) => {
  const [value, setValue] = useState(init);
  const onChange = (e) => {
    setValue(e.target.value);
  }
  return [value, onChange]
}
const Form = () => {
  const [age, ageOnChange] = useInput('');
  const [alopecia, alopeciaOnChange] = useInput('');
  const [blurring, blurringOnChange] = useInput('');
  const [gender, genderOnChange] = useInput('');
  const [healing, healingOnChange] = useInput('');
  const [hungry, hungryOnChange] = useInput('');
  const [irritable, irritableOnChange] = useInput('');
  const [itching, itchingOnChange] = useInput('');
  const [obese, obeseOnChange] = useInput('');
  const [paralysis, paralysisOnChange] = useInput('');
  const [pee, peeOnChange] = useInput('');
  const [stiffness, stiffnessOnChange] = useInput('');
  const [thirsty, thirstyOnChange] = useInput('');
  const [weak, weakOnChange] = useInput('');
  const [weightloss, weightlossOnChange] = useInput('');
  const [yeast, yeastOnChange] = useInput('');
  const [result, updateResult] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };


  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = {
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
    }

    console.log("line 29: ", body);
    // http://localhost:3001/api/formCheck
    fetch("/api/formCheck", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "Application/x-www-form-urlencoded"
        // "Content-Type": "Application/json"
     },
      body: JSON.stringify(body),
      // body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After converting to JSON...", data);
        const pred = data["pred"];
        let predProb = data["pred_prob"];
        predProb = predProb.slice(1, predProb.length -1 ).split(" ");
        console.log("predProb", predProb);
        console.log(predProb[0]);
        console.log(predProb[1]);
        updateResult(formatResult(pred, predProb));
        // alert(result)
        handleClickOpen(); 
      })
      .catch(err => console.log("error", err));
  };

  const formatResult = (pred, predProb) => {
    // let result = [];
    if (pred === "1" && predProb[1] > 0.6) {
      result.desc = "Warning you got diabetes";
    } else if (pred === "0" && predProb[0] > 0.6) {
      result.desc = "You likely do not have diabetes, pred";
    } else {
      result.desc = "The model is not clear";
    }
    result.pred = pred;
    result.predText = pred ? "Positive" : "Negative";
    result.negConf = predProb[0];
    result.posConf = predProb[1];
    return result;
  };
  /*
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/json")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  <p>{!data ? "Loading..." : data}</p>

  */
  return (
    <>
      {/* <form onSubmit = {onSubmitHandler}> */}
      <form>
        <FormControl>
          <div>How old are you? aaa</div>
          <Input
            type="number"
            name="age"
            required
            inputprops={{
              inputprops: {
                max: 120,
                min: 1,
              },
            }}
            label="Age"
            onChange = {ageOnChange}
          />

          <Grid container spacing={2}>
            <Grid container item xs={6} direction="column">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender" required onClick = {genderOnChange}>
                <FormControlLabel
                  value="1"
                  control={<Radio required={true} />}
                  label="Male"
                  required
                />
                <FormControlLabel
                  value="0"
                  control={<Radio required={true} />}
                  label="Female"
                />
              </RadioGroup>
              <FormLabel component="legend">
                Do you have to pee frequently?{" "}
              </FormLabel>
              <RadioGroup aria-label="pee" name="pee" required onClick = {peeOnChange}>
                <FormControlLabel
                  value="1"
                  control={<Radio required={true} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio required={true} />}
                  label="No"
                />
              </RadioGroup>
              <FormLabel component="legend">
                Are you thirsty frequently?{" "}
              </FormLabel>
              <RadioGroup aria-label="thirsty" name="thirsty" required onClick = {thirstyOnChange}>
                <FormControlLabel
                  value="1"
                  control={<Radio required={true} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio required={true} />}
                  label="No"
                />
              </RadioGroup>
              <FormLabel component="legend">
                Have you recently experienced sudden weight loss?{" "}
              </FormLabel>
              <RadioGroup aria-label="weightloss" name="weightloss" required onClick = {weightlossOnChange}>
                <FormControlLabel
                  value="1"
                  control={<Radio required={true} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio required={true} />}
                  label="No"
                />
              </RadioGroup>
              <FormLabel component="legend">
                Do you frequently feel physically weak?
              </FormLabel>
              <RadioGroup aria-label="weak" name="weak" required onClick = {weakOnChange}>
                <FormControlLabel
                  value="1"
                  control={<Radio required={true} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio required={true} />}
                  label="No"
                />
              </RadioGroup>

              <FormLabel component="legend">
                Do you frequently feel excessively hungry?
              </FormLabel>
              <RadioGroup aria-label="hungry" name="hungry" required onClick = {hungryOnChange}>
                <FormControlLabel
                  value="1"
                  control={<Radio required={true} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio required={true} />}
                  label="No"
                />
              </RadioGroup>

              <FormLabel component="legend">
                Are you experiencing genital thrush (yeast infection)?
              </FormLabel>
              <RadioGroup aria-label="yeast" name="yeast" required onClick = {yeastOnChange}>
                <FormControlLabel
                  value="1"
                  control={<Radio required={true} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio required={true} />}
                  label="No"
                />
              </RadioGroup>
              <FormLabel component="legend">
                Are you experiencing visual blurring?
              </FormLabel>
              <RadioGroup aria-label="blurring" name="blurring" required onClick = {blurringOnChange}>
                <FormControlLabel
                  value="1"
                  control={<Radio required={true} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio required={true} />}
                  label="No"
                />
              </RadioGroup>
            </Grid>

            <Grid container item xs={6} direction="column">
              <FormLabel component="legend">
                Are you frequently irritable?{" "}
              </FormLabel>
              <RadioGroup aria-label="irritable" name="irritable" required onClick = {irritableOnChange}>
                <FormControlLabel
                  value="1"
                  control={<Radio required={true} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio required={true} />}
                  label="No"
                />
              </RadioGroup>

              <FormLabel component="legend">
                Do you frequently experience itching?
              </FormLabel>
              <RadioGroup aria-label="itching" name="itching" required onClick = {itchingOnChange}>
                <FormControlLabel
                  value="1"
                  control={<Radio required={true} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio required={true} />}
                  label="No"
                />
              </RadioGroup>

              <FormLabel component="legend">
                When injured, do you experience delayed healing?
              </FormLabel>
              <RadioGroup aria-label="healing" name="healing" required onClick = {healingOnChange}>
                <FormControlLabel
                  value="1"
                  control={<Radio required={true} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio required={true} />}
                  label="No"
                />
              </RadioGroup>

              <FormLabel component="legend">
                Are you experiencing partial or mild paralysis?
              </FormLabel>
              <RadioGroup aria-label="paralysis" name="paralysis" required onClick = {paralysisOnChange}>
                <FormControlLabel
                  value="1"
                  control={<Radio required={true} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio required={true} />}
                  label="No"
                />
              </RadioGroup>

              <FormLabel component="legend">
                Are you experiencing muscle stiffness?
              </FormLabel>
              <RadioGroup aria-label="stiffness" name="stiffness" required onClick = {stiffnessOnChange}>
                <FormControlLabel
                  value="1"
                  control={<Radio required={true} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio required={true} />}
                  label="No"
                />
              </RadioGroup>
              <FormLabel component="legend">
                Are you experiencing hair falling out in small patches
                (Alopecia)?
              </FormLabel>
              <RadioGroup aria-label="alopecia" name="alopecia" required onClick = {alopeciaOnChange}>
                <FormControlLabel
                  value="1"
                  control={<Radio required={true} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio required={true} />}
                  label="No"
                />
              </RadioGroup>

              <FormLabel component="legend">Are you obese?</FormLabel>
              <RadioGroup aria-label="obese" name="obese" required onClick = {obeseOnChange}>
                <FormControlLabel
                  value="1"
                  control={<Radio required={true} />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio required={true} />}
                  label="No"
                />
              </RadioGroup>
              {/* <input type="submit" /> */}

              <Button
                type="submit"
                value="Submit"
                variant="contained"
                className="form-button"
                size="medium"
                color="primary"
                onClick = {onSubmitHandler}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </form>
      <Dialog open={open} onClick={handleClickClose} className="formDialog">
        <h2>Result is.....</h2>
        <p><strong>{result.desc}</strong></p>
        {/* <p>Model Prediction: {result.pred} </p> */}
        <p>
          The machine learning model predicts that you are <strong>{result.predText} </strong>for prediabetic
          symptoms
        </p>
        <p>Model Confidence in Negative Prediction: {Math.floor(result.negConf * 100)} % </p>
        <p>Model Confidence in Positive Prediction: {Math.floor(result.posConf * 100)} %</p>
      </Dialog>
    </>
  );
};

export default Form;

