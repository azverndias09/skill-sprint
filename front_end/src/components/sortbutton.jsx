import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
    const [sort, setSort] = React.useState('');

    const handleChange = (event) => {
        setSort(event.target.value);
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
                    <MenuItem value={10}>Price: Low to High</MenuItem>
                    <MenuItem value={20}>Price: High to Low</MenuItem>
                    <MenuItem value={30}>Distance</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
