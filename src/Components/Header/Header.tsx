import * as React from 'react';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Customer from './Customer/Customer';
import DateSelect from './DateSelect/DateSelect';
import Version from './Version/Version';

const Header = () => {
    const [value, setValue] = useState<Dayjs | null>(dayjs(''));
    return (
        <Box width={'90%'} sx={{
            display:'flex',
            flexDirection:'row', 
            justifyContent:'center'
        }}> 

        
        <Box sx={{
            width:'90%',
            display:'flex', 
            justifyContent:'space-between',
            alignItems:'center' 
        }}>
            <Customer/>
            <Version/>
            <DateSelect/>
            
        </Box>
        </Box>
    );
};
export default Header;