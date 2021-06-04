import React from "react";
import "./index.css";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Button,
  Grid,
  Radio,
  FormControlLabel,
  RadioGroup,
  Input,
} from "@material-ui/core";
import { json } from "body-parser";

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  //const onSubmit = (data) => console.log(data);

  const onSubmit = (data) => {
    console.log("line 29: ", data);
    fetch("/api/formCheck", {
      method: "POST",
      headers: { "Content-Type": "Application/JSON" },
      body: JSON.stringify(data),
      // body: data,
    })
    .then((res) => res.toString())
    .then((data) => {
      console.log("After converting to JSON...");
      console.log(data);
    }).catch((err) => console.log("Get Category Error :", err));
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <div>How old are you?</div>
        <Input
          type="number"
          name="age"
          required
          {...register("age")}
          InputProps={{
            inputProps: {
              max: 120,
              min: 1,
            },
          }}
          label="Age"
        />

        <Grid container spacing={2}>
          <Grid container item xs={6} direction="column">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender" required>
              <FormControlLabel
                value="1"
                {...register("gender")}
                control={<Radio required={true} />}
                label="Male"
                required
              />
              <FormControlLabel
                value="0"
                {...register("gender")}
                control={<Radio required={true} />}
                label="Female"
              />
            </RadioGroup>
            <FormLabel component="legend">
              Do you have to pee frequently?{" "}
            </FormLabel>
            <RadioGroup aria-label="pee" name="pee" required>
              <FormControlLabel
                value="1"
                {...register("pee")}
                control={<Radio required={true} />}
                label="Yes"
              />
              <FormControlLabel
                value="0"
                {...register("pee")}
                control={<Radio required={true} />}
                label="No"
              />
            </RadioGroup>
            <FormLabel component="legend">
              Are you thirsty frequently?{" "}
            </FormLabel>
            <RadioGroup aria-label="thirsty" name="thirsty" required>
              <FormControlLabel
                value="1"
                {...register("thirsty")}
                control={<Radio required={true} />}
                label="Yes"
              />
              <FormControlLabel
                value="0"
                {...register("thirsty")}
                control={<Radio required={true} />}
                label="No"
              />
            </RadioGroup>
            <FormLabel component="legend">
              Have you recently experienced sudden weight loss?{" "}
            </FormLabel>
            <RadioGroup aria-label="weightLoss" name="weightLoss" required>
              <FormControlLabel
                value="1"
                {...register("weightLoss")}
                control={<Radio required={true} />}
                label="Yes"
              />
              <FormControlLabel
                value="0"
                {...register("weightLoss")}
                control={<Radio required={true} />}
                label="No"
              />
            </RadioGroup>
            <FormLabel component="legend">
              Do you frequently feel physically weak?
            </FormLabel>
            <RadioGroup aria-label="weak" name="weak" required>
              <FormControlLabel
                value="1"
                {...register("weak")}
                control={<Radio required={true} />}
                label="Yes"
              />
              <FormControlLabel
                value="0"
                {...register("weak")}
                control={<Radio required={true} />}
                label="No"
              />
            </RadioGroup>

            <FormLabel component="legend">
              Do you frequently feel excessively hunngry?
            </FormLabel>
            <RadioGroup aria-label="hungry" name="hungry" required>
              <FormControlLabel
                value="1"
                {...register("hungry")}
                control={<Radio required={true} />}
                label="Yes"
              />
              <FormControlLabel
                value="0"
                {...register("hungry")}
                control={<Radio required={true} />}
                label="No"
              />
            </RadioGroup>

            <FormLabel component="legend">
              Are you experiencing genital thrush (yeast infection)?
            </FormLabel>
            <RadioGroup aria-label="yeast" name="yeast" required>
              <FormControlLabel
                value="1"
                {...register("yeast")}
                control={<Radio required={true} />}
                label="Yes"
              />
              <FormControlLabel
                value="0"
                {...register("yeast")}
                control={<Radio required={true} />}
                label="No"
              />
            </RadioGroup>
          </Grid>

          <Grid container item xs={6} direction="column">
            <FormLabel component="legend">
              Are you experiencing visual blurring?
            </FormLabel>
            <RadioGroup aria-label="blurring" name="blurring" required>
              <FormControlLabel
                value="1"
                {...register("blurring")}
                control={<Radio required={true} />}
                label="Yes"
              />
              <FormControlLabel
                value="0"
                {...register("blurring")}
                control={<Radio required={true} />}
                label="No"
              />
            </RadioGroup>

            <FormLabel component="legend">
              Are you frequently irritable?{" "}
            </FormLabel>
            <RadioGroup aria-label="irritable" name="irritable" required>
              <FormControlLabel
                value="1"
                {...register("irritable")}
                control={<Radio required={true} />}
                label="Yes"
              />
              <FormControlLabel
                value="0"
                {...register("irritable")}
                control={<Radio required={true} />}
                label="No"
              />
            </RadioGroup>

            <FormLabel component="legend">
              When injured, do you experience delayed healing?
            </FormLabel>
            <RadioGroup aria-label="healing" name="healing" required>
              <FormControlLabel
                value="1"
                {...register("healing")}
                control={<Radio required={true} />}
                label="Yes"
              />
              <FormControlLabel
                value="0"
                {...register("healing")}
                control={<Radio required={true} />}
                label="No"
              />
            </RadioGroup>

            <FormLabel component="legend">
              Are you experiencing partial or mild paralysis?
            </FormLabel>
            <RadioGroup aria-label="paralysis" name="paralysis" required>
              <FormControlLabel
                value="1"
                {...register("paralysis")}
                control={<Radio required={true} />}
                label="Yes"
              />
              <FormControlLabel
                value="0"
                {...register("paralysis")}
                control={<Radio required={true} />}
                label="No"
              />
            </RadioGroup>

            <FormLabel component="legend">
              Are you experiencing muscle stiffness?
            </FormLabel>
            <RadioGroup aria-label="stiffness" name="stiffness" required>
              <FormControlLabel
                value="1"
                {...register("stiffness")}
                control={<Radio required={true} />}
                label="Yes"
              />
              <FormControlLabel
                value="0"
                {...register("stiffness")}
                control={<Radio required={true} />}
                label="No"
              />
            </RadioGroup>
            <FormLabel component="legend">
              Are you experiencing hair falling out in small patches (Alopecia)?
            </FormLabel>
            <RadioGroup aria-label="alopecia" name="alopecia" required>
              <FormControlLabel
                value="1"
                {...register("alopecia")}
                control={<Radio required={true} />}
                label="Yes"
              />
              <FormControlLabel
                value="0"
                {...register("alopecia")}
                control={<Radio required={true} />}
                label="No"
              />
            </RadioGroup>

            <FormLabel component="legend">Are you obese?</FormLabel>
            <RadioGroup aria-label="obese" name="obese" required>
              <FormControlLabel
                value="1"
                {...register("obese")}
                control={<Radio required={true} />}
                label="Yes"
              />
              <FormControlLabel
                value="0"
                {...register("obese")}
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
            >
              Submit
            </Button>
           
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
};

export default Form;
