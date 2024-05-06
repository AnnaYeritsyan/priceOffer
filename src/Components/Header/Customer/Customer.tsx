import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '@mui/material';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useState } from 'react';
import { v4 } from 'uuid';
import { CustomerSelect, MenuItems } from '../../dataType';

interface CustomerProps {
  onCustomerSelect: (selectedItem: string) => void;
}

const Customer: React.FC<CustomerProps> = ({ onCustomerSelect }) => {
  const [changeName, setChangeName] =useState('');
  const [open, setOpen]= useState<boolean>(false)
  const [newItem, setNewItem] = useState<string>('')
  const [menuItem, setMenuItem] =useState<MenuItems[]>([
    {
      id:v4(),
      item:'SGL'
    },
    {
      id:v4(),
      item:'Kean'
    }
  ])
  const handleChange = (event: SelectChangeEvent) => {
    setChangeName(event.target.value as string);
    onCustomerSelect(event.target.value as string)
  };
const openModal = ()=>{
  console.log('open')
  setOpen(true)
}

const closeModal = () => {
  setOpen(false);

};
const addItem=(name:any)=>{
   console.log(name)
   

   if (name.trim() !== '') {

    const newItem = ({
      id:v4(),
     item:name
   })
   setMenuItem(prevItems => [...prevItems, newItem]);
  }
  closeModal()
}
console.log(newItem)
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
          value={changeName}
          label="Պատվիրատու"
          onChange={handleChange}
          sx={{
            borderRadius:'8px 0px 0px 8px ',

          }}
        >

         {
          menuItem.map((e:any)=>(
            <MenuItem value={e.item}>{e.item}</MenuItem>
          ))
         }

        </Select>
      </FormControl>
      <Button 
      sx={{
        border:1,
        borderColor:'rgba(0, 0, 0, 0.54);',
        borderRadius:'0px 8px 8px 0px',
        height:40,
        color:'rgba(0,0,0,0.54)',
       minWidth:'40px',
      }} 
      onClick={openModal}
      >+</Button>
      {
        open && <ModalWindow open={open} closeModal={closeModal} setNewItem={setNewItem} addItem={addItem}/>
      }
    </Box>
  );
}
export default Customer;