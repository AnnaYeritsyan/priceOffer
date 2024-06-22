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

interface VersionProps {
    onVersionSelect: (selectedItem: string) => void;
    selectedCustomer: string;
}

const Version: React.FC<VersionProps> = ({ onVersionSelect, selectedCustomer }) => {
    const [changeName, setChangeName] = useState('');
    const [open, setOpen] = useState<boolean>(false);
    const [newItem, setNewItem] = useState<string>('');
    const [menuItem, setMenuItem] = useState<MenuItems[]>([]);

    useEffect(() => {
        const fetchVersions = async () => {
            const data = await getFiltersCustomerVersion();
            console.log(data.data, );
// data.data.map((a:any)=>{
//   console.log(a)
// })
            if (selectedCustomer) {
                const versions = data.data[selectedCustomer]?.versions || [];
                console.log(versions)

            //     const uniqueNames = new Set<string>();

                const uniqueItems = versions.filter((version: string) => {
                    console.log(versions)
                    return versions
                }).map((a:any)=>{
                  console.log(a.version)
                  setMenuItem((prev:any)=>
                  [{
                    ...prev,
                    id:v4(),
                    item:a.version
                  }])
                })

            //     setMenuItem(uniqueItems);
            // } else {
            //     setMenuItem([]);
            }
        };

        fetchVersions();
    }, [selectedCustomer]);

    const modalTextInformation: ModalTextInformation = {
        title: 'Ստեղծել նոր տարբերակ',
        content: 'Եթե ցանկանում եք ստեղծել նոր տարբերակ, ապա մուտքագրեք տարբերակը',
    };

    const handleChange = (event: SelectChangeEvent) => {
        setChangeName(event.target.value as string);
        onVersionSelect(event.target.value as string);
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
            onVersionSelect(name);
            setChangeName(name);
        }
        closeModal();
    };

    return (
        <Box sx={{ minWidth: 230, display: 'flex' }}>
            <FormControl fullWidth size='small'>
                <InputLabel>Տարբերակ</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    value={changeName}
                    label="Տարբերակ"
                    onChange={handleChange}
                    sx={{ borderRadius: '8px 0px 0px 8px' }}
                >
                    {menuItem.map((e: any) =>
                    // {
                      // console.log(e)
                    //   return (
                    //     <MenuItem></MenuItem>
                    //   )
                    // }
                     (
                        <MenuItem value={e.item} key={e.id}>{e.item}</MenuItem>
                    )
                    )
                    }
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

export default Version;
