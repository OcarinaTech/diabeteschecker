import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FormControl, FormLabel, TextField,Radio, FormControlLabel, RadioGroup, Input, InputLabel, FormHelperText } from '@material-ui/core';

function Form() {
     return(
        <div>
            <FormControl>
                <TextField 
                    type="number"
                    InputProps={{
                        inputProps: { 
                            max: 120, min: 1 
                        }
                    }}
                    label="Age"
                />
                <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup aria-label="gender" name="gender1" >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                  </RadioGroup>


                <FormLabel component="legend">Do you have to pee frequently? </FormLabel>
                  <RadioGroup aria-label="pee" name="pee" >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="0" control={<Radio />} label="No" />
                  </RadioGroup>
                <FormLabel component="legend">Do you have to pee frequently? </FormLabel>
                  <RadioGroup aria-label="pee" name="pee" >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="0" control={<Radio />} label="No" />
                  </RadioGroup>
                <FormLabel component="legend">Are you thirsty frequently? </FormLabel>
                  <RadioGroup aria-label="thirsty" name="thirsty" >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="0" control={<Radio />} label="No" />
                  </RadioGroup>
                <FormLabel component="legend">Have you recently experienced sudden weight loss?  </FormLabel>
                  <RadioGroup aria-label="weightLoss" name="weightLoss" >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="0" control={<Radio />} label="No" />
                  </RadioGroup>
                <FormLabel component="legend">Do you frequently feel physically weak?</FormLabel>
                  <RadioGroup aria-label="weak" name="weak" >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="0" control={<Radio />} label="No" />
                  </RadioGroup>

                <FormLabel component="legend">Do you frequently feel excessively hunngry?</FormLabel>
                  <RadioGroup aria-label="hungry" name="hungry" >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="0" control={<Radio />} label="No" />
                  </RadioGroup>
                <FormLabel component="legend">Are you experiencing genital thrush (yeast infection)?
</FormLabel>
                  <RadioGroup aria-label="yeast" name="yeast" >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="0" control={<Radio />} label="No" />
                  </RadioGroup>

                <FormLabel component="legend">Are you experiencing visual blurring?</FormLabel>
                  <RadioGroup aria-label="blurring" name="blurring" >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="0" control={<Radio />} label="No" />
                  </RadioGroup>
                <FormLabel component="legend">Are you experiencing visual blurring?</FormLabel>
                  <RadioGroup aria-label="blurring" name="blurring" >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="0" control={<Radio />} label="No" />
                  </RadioGroup>

                <FormLabel component="legend">Are you frequently irritable? </FormLabel>
                  <RadioGroup aria-label="irritable" name="irritable" >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="0" control={<Radio />} label="No" />
                  </RadioGroup>


                <FormLabel component="legend">When injured, do you experience delayed healing? 
</FormLabel>
                  <RadioGroup aria-label="healing" name="healing" >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="0" control={<Radio />} label="No" />
                  </RadioGroup>

                <FormLabel component="legend">Are you experiencing partial or mild paralysis? 
</FormLabel>
                  <RadioGroup aria-label="paralysis" name="paralysis" >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="0" control={<Radio />} label="No" />
                  </RadioGroup>

                <FormLabel component="legend">Are you experiencing muscle stiffness?</FormLabel>
                  <RadioGroup aria-label="stiffness" name="stiffness" >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="0" control={<Radio />} label="No" />
                  </RadioGroup>
                <FormLabel component="legend">Are you experiencing hair falling out in small patches (Alopecia)?
</FormLabel>
                  <RadioGroup aria-label="alopecia" name="alopecia" >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="0" control={<Radio />} label="No" />
                  </RadioGroup>

                <FormLabel component="legend">Are you obese?</FormLabel>
                  <RadioGroup aria-label="obese" name="obese" >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                    <FormControlLabel value="0" control={<Radio />} label="No" />
                  </RadioGroup>






            </FormControl>
        </div>
    )
}

export default Form;
