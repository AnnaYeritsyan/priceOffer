import * as React from 'react';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Customer from './Customer/Customer';
import DateSelect from './DateSelect/DateSelect';
import Version from './Version/Version';

interface CustomerSelectHeader {
    selectCustomerValue: (item: string) => void;

}
const Header: React.FC<CustomerSelectHeader> = ({selectCustomerValue}) => {
    const onCustomerSelect = (item:string) =>{
        console.log(item)
        selectCustomerValue(item)
    }
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
            <Customer onCustomerSelect={onCustomerSelect}/>
            <Version/>
            <DateSelect/>
            
        </Box>
        </Box>
    );
};
export default Header;