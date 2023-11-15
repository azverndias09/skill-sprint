// SortButton.js
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ onChange }) {
  const [sort, setSort] = React.useState('');

  const handleChange = (event) => {
    setSort(event.target.value);
    onChange(event.target.value); // Call the onChange callback with the selected value
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Sort By"
          onChange={handleChange}
        >
          <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
          <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
         
        </Select>
      </FormControl>
    </Box>
  );
}
