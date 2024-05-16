import * as React from 'react';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';

export default function DateSelect() {
    const date = new Date()
    const [starting, setStarting] = useState<Dayjs | null>(dayjs(date))
    const [finishing, setFinishing] = useState<Dayjs | null>(dayjs(date))

    console.log(starting)

    return (

        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={['DatePicker', 'DatePicker']}

            >
                <DatePicker label="Սկսած"
                    defaultValue={dayjs(date)}
                    slotProps={{ textField: { size: 'small' } }}
                    onChange={(newValue) => setStarting(newValue)}
                />
                <DatePicker
                    label="Մինչև"
                    value={finishing}
                    onChange={(newValue) => setFinishing(newValue)}
                    slotProps={{ textField: { size: 'small' } }}

                />
            </DemoContainer>
        </LocalizationProvider>
        // </Box>
    );
}
