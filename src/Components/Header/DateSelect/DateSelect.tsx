import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';

export default function DateSelect() {
    const date = new Date()
    const [value, setValue] = React.useState<Dayjs | null>(dayjs(date));

    return (
        // <Box sx={{
        //     height:50,
        // color:'rgba(0,0,0,0.54)',
        // }}>

        
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={['DatePicker', 'DatePicker']}
         
            >
                <DatePicker label="Սկսած" defaultValue={dayjs(date)} 
                 slotProps={{ textField: { size: 'small' } }}

               />
                <DatePicker
                    label="Մինչև"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    slotProps={{ textField: { size: 'small' } }}

                />
            </DemoContainer>
        </LocalizationProvider>
        // </Box>
    );
}
