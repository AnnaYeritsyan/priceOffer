// import * as React from 'react';
// import { useState } from 'react';
// import { Box, Typography } from '@mui/material';
// import Customer from './Customer/Customer';
// import DateSelect from './DateSelect/DateSelect';
// import Version from './Version/Version';

// interface CustomerSelectHeader {
//     selectCustomerValue: (items: { client: string; version: string }) => void;
//     // selectCustomerValue: (data: { client: string; version: string , }) => void;
//     onDate:(dateTime:{start:string, end:string})=>void
// }


// const Header: React.FC<CustomerSelectHeader> = ({selectCustomerValue, onDate}) => {
    
//     const [selection, setSelection] = React.useState<{ client: string;
//          version: string }>({ client: '', version: '' });

//     const onCustomerSelect = (item: string) => {
//         setSelection(prevState => ({
//             ...prevState,
//             client: item
//         }));
//         selectCustomerValue({ ...selection, client: item });
//     };

//     const onVersionSelect = (item: string) => {
//         setSelection(prevState => ({
//             ...prevState,
//             version: item
//         }));
//         selectCustomerValue({ ...selection, version: item });
//     };
//     const onDateTime = (item:any)=>{
//         onDate(item)
        
//     }

//     return (
//         <Box width={'90%'} sx={{
//             display:'flex',
//             flexDirection:'row', 
//             justifyContent:'center'
//         }}> 

        
//         <Box sx={{
//             width:'90%',
//             display:'flex', 
//             justifyContent:'space-between',
//             alignItems:'center' 
//         }}>
//             <Customer onCustomerSelect={onCustomerSelect} />
//             {/* <Version onVersionSelect={onVersionSelect} /> */}
//             <Version onVersionSelect={onVersionSelect} selectedCustomer={selection?.client} />
//             <DateSelect onDateTime = {onDateTime}/>
            
//         </Box>
//         </Box>
//     );
// };
// export default Header;
import * as React from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';
import Customer from './Customer/Customer';
import DateSelect from './DateSelect/DateSelect';
import Version from './Version/Version';

interface CustomerSelectHeader {
  selectCustomerValue: (items: { client: string; version: string }) => void;
  onDate: (dateTime: { start: string; end: string }) => void;
}

const Header: React.FC<CustomerSelectHeader> = ({ selectCustomerValue, onDate }) => {
  const [selection, setSelection] = useState<{ client: string; version: string }>({ client: '', version: '' });

  const onCustomerSelect = (item: string) => {
    setSelection(prevState => ({
      ...prevState,
      client: item,
      version: '' // Reset version when customer changes
    }));
    selectCustomerValue({ client: item, version: '' });
  };

  const onVersionSelect = (item: string) => {
    setSelection(prevState => ({
      ...prevState,
      version: item
    }));
    selectCustomerValue({ client: selection.client, version: item });
  };

  const onDateTime = (item: any) => {
    onDate(item);
  };

  return (
    <Box width={'90%'} sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    }}>
      <Box sx={{
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Customer onCustomerSelect={onCustomerSelect} />
        <Version onVersionSelect={onVersionSelect} selectedCustomer={selection.client} />
        <DateSelect onDateTime={onDateTime} />
      </Box>
    </Box>
  );
};

export default Header;
