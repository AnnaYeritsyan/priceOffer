
import { Button, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Select, MenuItem, SelectChangeEvent, FormControl, Box, InputLabel, TableBody } from '@mui/material';
import { DataKV, DataType, DescriptionType, LicenseType } from '../dataType';
import { v4 } from 'uuid';
import data from '../data.json'
import { ChangeEvent, useState } from 'react';

const Rows = ({ defaultRecord }: { defaultRecord: DataType }) => {
    const [records, setRecords] = useState<DataType[]>(data)
    const [value, setValue] = useState<string | undefined>(undefined)
    const [isFilterDescription, setIsFilterDescription] = useState<string[]>([])
    const [licenseState, setLicenseState] = useState<string[]>([])
    const [price, setPrice] = useState<string[]>([])
    const [count, setCount] = useState<string>()
    const [disCount, setDisCount] = useState<string>()

    const handleChange = (event: SelectChangeEvent<string>, columnType: 'name' | 'description' | 'licenseType' | 'price',) => {
        setValue(event.target.value)
        switch (columnType) {
            case 'name':

                const selectedRecords = records.filter(record => record.name === event.target.value);
                console.log(selectedRecords)
                const descriptions: any = selectedRecords.map(record => record.description);
                setIsFilterDescription(descriptions);
                console.log(isFilterDescription)
                const license: any = selectedRecords.map(record => record.licenseType)
                setLicenseState(license)
                const price: any = selectedRecords.map(record => record.price)
                setPrice(price)
                break;
            default:
                break;


        }


    }

    const handleInputs = (e: any) => {
        console.log(e.target.value)
        if(e.target.name === 'count'){
            setCount(e.target.value)
        }
        else{
            setDisCount(e.target.value)
        }

    }
    console.log(records)
    console.log(licenseState);

    return (

        <TableRow >
            {/* --------------------------- name */}
            <TableCell sx={{ padding: 0, border: '1px solid gray' }} >
                <Select
                    labelId="name"
                    id="name"
                    label="name"
                    sx={{
                        width: '70%',
                        '& .MuiSelect-select': {
                            whiteSpace: 'wrap',
                            width: '220px'
                        }
                    }}
                    name='name'
                    value={value}
                    //   onChange={handleSelectChange}
                    onChange={(e) => handleChange(e as SelectChangeEvent, 'name')}


                >
                    {
                        records.map((e: DataType, idx) =>
                            <MenuItem value={e.name} key={idx}>{e.name}</MenuItem>
                        )
                    }


                </Select>
            </TableCell>

            {/* --------------------------- description */}

            <TableCell sx={{ padding: 0, border: 1, }} >
                <Select
                    labelId="description"
                    id="description"
                    label="description"
                    sx={{
                        width: '100%',
                        '& .MuiSelect-select': {
                            whiteSpace: 'wrap',
                        }
                    }}
                    name='description'
                    value={value}
                    //   onChange={handleSelectChange}
                    onChange={(e) => handleChange(e as SelectChangeEvent, 'description')}


                >


                    {isFilterDescription.map((description: any, index: number) => (
                        description.map((e: DescriptionType) => (
                            <MenuItem key={e.value} value={e.value}>{e.value}</MenuItem>
                        ))
                    ))}



                </Select>
            </TableCell>
            {/* --------------------------- license type */}
            <TableCell sx={{ padding: 0, border: 1, }} >
                <Select
                    labelId="licenseType"
                    id="licenseType"
                    label="licenseType"
                    sx={{
                        width: '100%',
                        '& .MuiSelect-select': {
                            whiteSpace: 'wrap',
                        }
                    }}
                    name='licenseType'
                    value={value}
                    //   onChange={handleSelectChange}
                    onChange={(e) => handleChange(e as SelectChangeEvent, 'licenseType')}


                >

                    {licenseState.map((li: any, index: number) => (
                        li.map((e: LicenseType) => (
                            <MenuItem key={e.value} value={e.value}>{e.value}</MenuItem>
                        ))
                    ))}
                </Select>
            </TableCell>

            <TableCell sx={{ padding: 0, border: 1, }} >
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    value={count}
                    name='count'
                    onChange={handleInputs}
                />
            </TableCell>
            <TableCell sx={{ padding: 0, border: 1, }} >

                <Select
                    labelId="description"
                    id="description"
                    label="count"
                    sx={{
                        width: '100%',
                        '& .MuiSelect-select': {
                            whiteSpace: 'wrap',
                        }
                    }}
                    name='count'
                    value={value}
                    //   onChange={handleSelectChange}
                    onChange={(e) => handleChange(e as SelectChangeEvent, 'licenseType')}


                >


                    {price.map((description: any, index: number) => (
                        description.map((e: DescriptionType) => (
                            <MenuItem key={e.value} value={e.value}>{e.value}</MenuItem>
                        ))
                    ))}



                </Select>

            </TableCell>

            {/* --------------------------- price */}

            <TableCell sx={{ padding: 0, border: 1 }}>
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    value={disCount}
                    name='disCount'
                    onChange={handleInputs}
                />

            </TableCell>
            {/* ---------------------------- zexj */}
            <TableCell sx={{ padding: 0, border: 1, }}>


            </TableCell>


            {/* --------------------------- price */}

            <TableCell sx={{ padding: 0, border: 1, }}>
                <Button variant='contained'>remove all row</Button>

            </TableCell>

        </TableRow>

    );
};
export default Rows;