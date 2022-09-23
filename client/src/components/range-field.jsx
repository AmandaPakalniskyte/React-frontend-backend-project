import React from 'react';
import {
  Box,
  Typography,
  Slider,
  FormControl,
} from '@mui/material';

const RangeField = ({
  label,
  value,
  onChange,
  onChangeCommitted,
  min = 0,
  max = 200,
}) => (
  <FormControl sx={{ width: '100%' }}>
    <Typography variant="h6">{label}</Typography>
    <Box sx={{ mx: 2 }}>
      <Slider
        value={value}
        min={min}
        max={max}
        onChangeCommitted={onChangeCommitted}
        onChange={onChange}
        valueLabelDisplay="on"
        sx={{ mt: 4 }}
      />
    </Box>
  </FormControl>
);

export default RangeField;
