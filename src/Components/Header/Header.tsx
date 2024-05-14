import * as React from 'react';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Customer from './Customer/Customer';
import DateSelect from './DateSelect/DateSelect';
import Version from './Version/Version';

interface CustomerSelectHeader {
    selectCustomerValue: (data: { client: string; version: string }) => void;
}

const Header: React.FC<CustomerSelectHeader> = ({selectCustomerValue}) => {
    // const onCustomerSelect = (item:string) =>{
    //     console.log(item)
    //     selectCustomerValue(item)
    // }
    const [selection, setSelection] = React.useState<{ client: string; version: string }>({ client: '', version: '' });

    const onCustomerSelect = (item: string) => {
        setSelection(prevState => ({
            ...prevState,
            client: item
        }));
        selectCustomerValue({ ...selection, client: item });
    };

    const onVersionSelect = (item: string) => {
        setSelection(prevState => ({
            ...prevState,
            version: item
        }));
        selectCustomerValue({ ...selection, version: item });
    };

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
            <Customer onCustomerSelect={onCustomerSelect} />
            <Version onVersionSelect={onVersionSelect} />
            <DateSelect/>
            
        </Box>
        </Box>
    );
};
export default Header;