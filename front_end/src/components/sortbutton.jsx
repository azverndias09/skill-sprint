
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SortButton = ({ onChange }) => {
    const handleSortChange = (event) => {
      onChange(event.target.value);
    };
  
    return (
      <FormControl>
        <Select
          value=""
          onChange={handleSortChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Sort by' }}
        >
          <MenuItem value="" disabled>
            Sort by
          </MenuItem>
          <MenuItem value="priceLowToHigh">Price: Low to High</MenuItem>
          <MenuItem value="priceHighToLow">Price: High to Low</MenuItem>
          <MenuItem value="distance">Distance</MenuItem>
        </Select>
      </FormControl>
    );
  };
  

export default SortButton;
