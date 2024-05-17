import * as React from 'react';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import { filterDataByDate } from '../../API/Api';


interface DateSelectProps {
    onDateTime: (dateTime: { startDate: string; endDate: string }) => void;
}
export default function DateSelect({ onDateTime }: DateSelectProps) {
    const date = new Date()
    const [starting, setStarting] = useState<Dayjs | null>(dayjs(date))
    const [finishing, setFinishing] = useState<Dayjs | null>(dayjs(date))

    if (starting && finishing) {
        const startDate = starting.format('YYYY-MM-DD');
        const endDate = finishing.format('YYYY-MM-DD');
        const dateTime = {startDate, endDate}
        onDateTime(dateTime)
    }
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
