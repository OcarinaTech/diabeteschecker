import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Button,
  TextField,
  Grid,
  Radio,
  FormControlLabel,
  RadioGroup,
  Input,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

const Form = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/json")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <form>
      <p>{!data ? "Loading..." : data}</p>
      <FormControl>
        <div>How old are you?</div>
        <Input
          type="number"
          name="age"
          required
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
            <RadioGroup aria-label="pee" name="pee" required>
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
            <RadioGroup aria-label="thirsty" name="thirsty" required>
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
            <RadioGroup aria-label="weightLoss" name="weightLoss" required>
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
            <RadioGroup aria-label="weak" name="weak" required>
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
              Do you frequently feel excessively hunngry?
            </FormLabel>
            <RadioGroup aria-label="hungry" name="hungry" required>
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
            <RadioGroup aria-label="yeast" name="yeast" required>
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
              Are you experiencing visual blurring?
            </FormLabel>
            <RadioGroup aria-label="blurring" name="blurring" required>
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
              Are you frequently irritable?{" "}
            </FormLabel>
            <RadioGroup aria-label="irritable" name="irritable" required>
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
            <RadioGroup aria-label="healing" name="healing" required>
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
            <RadioGroup aria-label="paralysis" name="paralysis" required>
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
            <RadioGroup aria-label="stiffness" name="stiffness" required>
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
              Are you experiencing hair falling out in small patches (Alopecia)?
            </FormLabel>
            <RadioGroup aria-label="alopecia" name="alopecia" required>
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
            <RadioGroup aria-label="obese" name="obese" required>
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
