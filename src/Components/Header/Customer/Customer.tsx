import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '@mui/material';

export default function Customer() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{
         minWidth: 230,
         display:'flex',

         }}>
      <FormControl fullWidth size='small'>
        <InputLabel 
        // id="demo-simple-select-label"
        >Պատվիրատու</InputLabel>
        <Select
          labelId="demo-simple-select-label"
        //   id="demo-simple-select"
          value={age}
          label="Պատվիրատու"
          onChange={handleChange}
          sx={{
            borderRadius:'8px 0px 0px 8px ',

          }}
         
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Button 
      sx={{
        border:1,
        borderColor:'rgba(0, 0, 0, 0.54);',
        borderRadius:'0px 8px 8px 0px',
        height:40,
        color:'rgba(0,0,0,0.54)',

      }} >+</Button>
    </Box>
  );
}