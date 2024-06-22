import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '@mui/material';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import { MenuItems, ModalTextInformation } from '../../dataType';
import { getFiltersCustomerVersion } from '../../API/Api';

interface CustomerProps {
  onCustomerSelect: (selectedItem: string) => void;
}

const Customer: React.FC<CustomerProps> = ({ onCustomerSelect }) => {
  const [changeName, setChangeName] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<string>('');
  const [menuItem, setMenuItem] = useState<MenuItems[]>([]);

  useEffect(() => {
    const fetchCustomer = async () => {
      const data = await getFiltersCustomerVersion();
      console.log(data.data);

      const uniqueNames = new Set<string>();

      const uniqueItems = Object.keys(data.data).filter(key => {
        if (!uniqueNames.has(key)) {
          uniqueNames.add(key);
          return true;
        }
        return false;
      }).map(key => ({ id: v4(), item: key }));

      setMenuItem(uniqueItems);
    };

    fetchCustomer();
  }, []);

  const modalTextInformation: ModalTextInformation = {
    title: 'Ստեղծել նոր պատվիրատու',
    content: 'Եթե ցանկանում եք ստեղծել նոր պատվիրատու, ապա մուտքագրեք անվանում',
  };

  const handleChange = (event: SelectChangeEvent) => {
    setChangeName(event.target.value as string);
    onCustomerSelect(event.target.value as string);
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const addItem = (name: string) => {
    if (name.trim() !== '' && !menuItem.some(item => item.item === name)) {
      const newItem = { id: v4(), item: name };
      setMenuItem(prevItems => [...prevItems, newItem]);
      onCustomerSelect(name);
      setChangeName(name);
    }
    closeModal();
  };

  return (
    <Box sx={{ minWidth: 230, display: 'flex' }}>
      <FormControl fullWidth size='small'>
        <InputLabel>Պատվիրատու</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={changeName}
          label="Պատվիրատու"
          onChange={handleChange}
          sx={{ borderRadius: '8px 0px 0px 8px' }}
        >
          {menuItem.map((e: any) => (
            <MenuItem value={e.item} key={e.id}>{e.item}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        sx={{
          border: 1,
          borderColor: 'rgba(0, 0, 0, 0.54);',
          borderRadius: '0px 8px 8px 0px',
          height: 40,
          color: 'rgba(0,0,0,0.54)',
          minWidth: '40px',
        }}
        onClick={openModal}
      >+</Button>
      {open && <ModalWindow
        open={open}
        closeModal={closeModal}
        setNewItem={setNewItem}
        addItem={addItem}
        modalTextInformation={modalTextInformation}
      />}
    </Box>
  );
}

export default Customer;
