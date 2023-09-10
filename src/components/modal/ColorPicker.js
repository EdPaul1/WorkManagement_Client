import React from 'react';
import { FormControl, Radio, FormLabel, RadioGroup, FormControlLabel } from '@mui/material';

const ColorPicker = ({ color, colors, setColor }) => {
  return (
    <FormControl xs={{ pb: 2 }}>
      <FormLabel>Project Color</FormLabel>
      <RadioGroup className='flex row' value={color} onChange={(e) => setColor(e.target.value)}>
        {colors.map((colorItem, index) => (
          <FormControlLabel
            key={index} // Add a unique "key" prop here
            control={<Radio />}
            value={colorItem.mainColor}
            label=''
            sx={{
              backgroundColor: colorItem.mainColor,
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ColorPicker;
