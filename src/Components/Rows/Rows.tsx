
import { Button, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Select, MenuItem, SelectChangeEvent, FormControl, Box, InputLabel, TableBody, Typography } from '@mui/material';
import { DataKV, DataSchema, DataType, DescriptionType, LicenseType, PriceType } from '../dataType';
import { v4 } from 'uuid';
import data from '../data.json'
import { ChangeEvent, useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';

const Rows = ({ defaultRecord }: { defaultRecord: DataType }) => {
    const [records, setRecords] = useState<DataType[]>(data)
    const [value, setValue] = useState<string | undefined>(undefined)
    const [isFilterDescription, setIsFilterDescription] = useState<string[]>([])
    const [licenseState, setLicenseState] = useState<string[]>([])
    const [price, setPrice] = useState<string[]>([])
    const [count, setCount] = useState<number | undefined>()
    const [disCount, setDisCount] = useState<number | undefined>()
    const [isPricing, setIsPricing] = useState<number | undefined>()
    const [finalyPrice, setFinalyPrice] = useState<number | undefined>()
    const [showAddButton, setShowAddButton] = useState(false);
    const [investment, setInvestment] = useState<any>()
    const [updateValue, setUpdateValue] = useState<any>()


    const handleChange = (event: SelectChangeEvent<string>, columnType: 'name' | 'description' | 'licenseType' | 'price' | 'disCount',) => {
        setValue(event.target.value)
        switch (columnType) {
            case 'name':

                const selectedRecords = records.filter(record => record.name === event.target.value);
                // console.log(selectedRecords)

                const descriptions: any = selectedRecords.map(record => record.description);
                setIsFilterDescription(descriptions);
                // console.log(isFilterDescription)
                const license: any = selectedRecords.map(record => record.licenseType)
                setLicenseState(license)
                const price: any = selectedRecords.map(record => record.price)
                setPrice(price)
                const selectedName = event.target.value;
                if (selectedName === 'LIS-A ներդնում') {
                    setInvestment(selectedRecords);
                } else {
                    setInvestment(null);
                    setShowAddButton(false);
                }
                // console.log("Investment state:", investment);
                setShowAddButton(selectedName === 'LIS-A ներդնում');
                break;
            case 'price':
                setIsPricing(+event.target.value)
                break;

            // case 'disCount':
            //     if (event.target.value && count && disCount) {

            //         const calculation = ((+event.target.value * (+count)) * (+disCount)) / 100
            //         setIsPricing(calculation)
            //         console.log(typeof count)
            //     }

            default:
                break;


        }


    }

    const handleInputs = (e: ChangeEvent<HTMLInputElement>, nameElemnt: 'count' | 'disCount') => {
        console.log(e.target.value)
        switch (nameElemnt) {
            case 'count':
                setCount(+e.target.value)
                break;

            case 'disCount':
                setDisCount(+e.target.value)

                // console.log(disCount)
                if (count === undefined) {
                    setCount(1)
                }

                break;
            default:


                break;
        }

    }
    useEffect(() => {

        const countValue = count ?? 1;
        const disCountValue = disCount ?? 0;
        const isPricingValue = isPricing ?? 0;


        setFinalyPrice((isPricingValue - (countValue * isPricingValue) * (disCountValue / 100)));

    }, [count, disCount, isPricing]);


    const addinRow = () => {
        const newRow: DescriptionType = {
            value: '',
            type: ''
        };
        const newLicense: LicenseType = {
            value: '',
            type: ''
        };
        const newPrice: LicenseType = {
            value: '',
            type: ''
        };
    

        if (investment) {
            const newInvestment = investment.map((item: DataType) => ({
                ...item,
                description: [...item.description, newRow],
                licenseType: [...item.licenseType, newLicense],
                price: [...item.price, newPrice],
                
            }));
            setInvestment(newInvestment);
        }
    };

    // console.log(investment)
    useEffect(() => {
        if (investment) {
            setShowAddButton(true);
        }
    }, [investment]);
    const removeItem = (idToRemove: DescriptionType, idx: number) => {
        if (investment) {
            const updatedInvestment = investment.map((item: DataType) => ({
                ...item,
                description: item.description.filter((desc: DescriptionType, index: number) => index !== idx),
                licenseType: item.licenseType.filter((license: LicenseType, index: number) => index !== idx),
                price: item.price.filter((price: PriceType, index: number) => index !== idx),
              

            }));
            setInvestment(updatedInvestment);
        }
    };


    const removeAllRow = (event: React.MouseEvent<HTMLButtonElement>) => {
        const tableRow = event.currentTarget.closest('tr');
        if (tableRow) {
            tableRow.remove();
        }
    };

    const DescriptionSelect = ({ item, onRemove, id }: { item: string, onRemove: () => void, id: number }) => {
        const [selectedItem, setSelectedItem] = useState<string>(item);
        const [val, setVal] = useState<string>()
        const handleItemChange = (event: SelectChangeEvent<string>) => {
            const newItemValue = event.target.value;
            console.log(event)
            // setSelectedItem(newItemValue);
            setVal(event.target.value)
            console.log(val)
        };



        return (
            <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
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
                    value={selectedItem}
                    onChange={handleItemChange}
                >
                    {isFilterDescription.map((description: any, index: number) => (
                        description.map((e: DescriptionType) => (
                            <MenuItem key={e.value} value={e.value}>{e.value}</MenuItem>
                        ))
                    ))}
                </Select>
                <Button variant='contained' onClick={onRemove} 
                sx={{bgcolor:"#a91f1f"}}>
                    <DeleteIcon />
                </Button>
            </Box>
        );
    };

    const LicenseSelect = ({ item, id }: { item: string, id: number }) => {
        return (

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
                value={item}
                placeholder={item}
                onChange={(e) => handleChange(e as SelectChangeEvent, 'licenseType')}
            >
                <MenuItem value={item}> {item}</MenuItem>

                {licenseState.map((e: any) => {
                    return (
                        <span key={e.type}>
                            {e.map((a: LicenseType) => (
                                <MenuItem key={a.value} value={a.value}>{a.value}</MenuItem>
                            ))}
                        </span>
                    );
                })}
            </Select>


        );
    };
    const PriceSelect = ({ item, id }: { item: string, id: number }) => {
        return (

            <Select
                labelId="price"
                id="price"
                label="price"
                sx={{
                    width: '100%',
                    '& .MuiSelect-select': {
                        whiteSpace: 'wrap',
                    }
                }}
                name='price'
                value={item}
                placeholder={item}
                onChange={(e) => handleChange(e as SelectChangeEvent, 'price')}
            >
                <MenuItem value={item}> {item}</MenuItem>

                {price.map((e: any) => {
                    return (
                        <Typography key={e.type}>
                            {e.map((a: PriceType) => (
                                <MenuItem key={a.value} value={a.value}>{a.value}</MenuItem>
                            ))}
                        </Typography>
                    );
                })}
            </Select>


        );
    };

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
                {
                    investment ? (
                        investment.map((e: DataType, index: number) => (
                            e.description.map((item: DescriptionType, idx: number) => (
                                <DescriptionSelect
                                    key={idx}
                                    item={item.value}
                                    id={e.id}
                                    onRemove={() => removeItem(item, idx)}
                                />
                            ))
                        ))
                    ) : <Select
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
                }



                {showAddButton && (
                    <Button variant='contained' onClick={addinRow}
                    sx={{
                        bgcolor:'#0b4a0b',
                    }}>
                        <AddBoxIcon/>
                        </Button>
                )}

            </TableCell>
            {/* --------------------------- license type */}
            <TableCell sx={{ padding: 0, border: 1, }} >
                {
                    investment ?
                        (
                            investment.map((e: DataType, index: number) => (
                                e.licenseType.map((item: LicenseType, idx: number) => (
                                    <LicenseSelect
                                        key={idx}
                                        item={item.value}
                                        id={e.id}
                                    />
                                ))
                            ))
                        ) :

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
                }
            </TableCell>

            <TableCell sx={{ padding: 0, border: 1, }} >
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    value={count}
                    name='count'
                    // onChange={handleInputs}
                    onChange={(e: any) => handleInputs(e, 'count')}
                />
            </TableCell>
            <TableCell sx={{ padding: 0, border: 1, }} >
            {
                    investment ?
                        (
                            investment.map((e: DataType, index: number) => (
                                e.price.map((item: PriceType, idx: number) => (
                                    <PriceSelect
                                        key={idx}
                                        item={item.value}
                                        id={e.id}
                                    />
                                ))
                            ))
                        ) :
                        <Select
                    labelId="price"
                    id="price"
                    label="price"
                    sx={{
                        width: '100%',
                        '& .MuiSelect-select': {
                            whiteSpace: 'wrap',
                        }
                    }}
                    name='count'
                    value={value}
                    //   onChange={handleSelectChange}
                    onChange={(e) => handleChange(e as SelectChangeEvent, 'price')}


                >


                    {price.map((price: any, index: number) => (
                        price.map((e: PriceType) => (
                            <MenuItem key={e.value} value={+e.value}>{(+e.value)}</MenuItem>
                        ))
                    ))}



                </Select> 

                        
                }
                {/* <Select
                    labelId="price"
                    id="price"
                    label="price"
                    sx={{
                        width: '100%',
                        '& .MuiSelect-select': {
                            whiteSpace: 'wrap',
                        }
                    }}
                    name='count'
                    value={value}
                    //   onChange={handleSelectChange}
                    onChange={(e) => handleChange(e as SelectChangeEvent, 'price')}


                >


                    {price.map((price: any, index: number) => (
                        price.map((e: DescriptionType) => (
                            <MenuItem key={e.value} value={+e.value}>{(+e.value)}</MenuItem>
                        ))
                    ))}



                </Select> */}

            </TableCell>

            {/* --------------------------- price */}

            {/* <TableCell sx={{ padding: 0, border: 1 }}>
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    value={disCount}
                    name='disCount'
                    onChange={(e: any) => handleInputs(e, 'disCount')} />

            </TableCell> */}
            {/* ---------------------------- zexj */}
            <TableCell sx={{ padding: 0, border: 1, }}>
                {finalyPrice}

            </TableCell>
            {/* -----------zexchvac gin */}

            {/* --------------------------- price */}

            <TableCell sx={{ padding: 0, border: 1, }}>
                <Button variant='contained' onClick={removeAllRow}>remove all row</Button>

            </TableCell>

        </TableRow>

    );
};
export default Rows;