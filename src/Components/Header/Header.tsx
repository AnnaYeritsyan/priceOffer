import * as React from 'react';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Header = () => {
    const [value, setValue] = useState<Dayjs | null>(dayjs(''));
    return (
        <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <Typography component={'h5'} variant='h5'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                        <DatePicker
                            label="Ներկայացման օր"
                            defaultValue={dayjs('')} />
                    </Typography>
                    <Typography component={'h5'} variant='h5'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                        <DatePicker
                            label="Առաջարկը գործում է ﬕնչև"
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                        />
                    </Typography>
                </DemoContainer>
            </LocalizationProvider>
        </Box>
    );
};
export default Header;