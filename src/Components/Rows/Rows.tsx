
import { Button, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Select, MenuItem, SelectChangeEvent, FormControl, Box, InputLabel, TableBody, Typography } from '@mui/material';
import { DataKV, DataSchema, DataType, DescriptionType, LicenseType, PriceType, RowState } from '../dataType';
import { v4 } from 'uuid';
import data from '../data.json'
import { ChangeEvent, useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';

const Rows = ({ defaultRecord, index }: { defaultRecord: DataType, index: number }) => {
    const [records, setRecords] = useState<DataType[]>(data)
    const [value, setValue] = useState<string | undefined>(undefined)
    const [isFilterDescription, setIsFilterDescription] = useState<string[]>([])
    const [licenseState, setLicenseState] = useState<string[]>([])
    const [price, setPrice] = useState<string[]>([])
    // const [count, setCount] = useState<any>()
    // const [disCount, setDisCount] = useState<number | undefined>()
    const [count, setCount] = useState<(number | undefined)[]>([]);
    const [disCount, setDisCount] = useState<(number | undefined)[]>([]);

    const [isPricing, setIsPricing] = useState<number | undefined>()
    const [finalyPrice, setFinalyPrice] = useState<number | undefined>()
    const [showAddButton, setShowAddButton] = useState(false);
    const [investment, setInvestment] = useState<any>()
    const [updateValue, setUpdateValue] = useState<string | undefined>(undefined)
    const [currentBool, setCurrentBool] = useState<boolean>(false)
    const [rowsState, setRowsState] = useState<RowState[]>(data.map(() => ({
        count: undefined,
        disCount: undefined,
    })));

    const rowColor = index % 2 === 0 ? '#ffffff' : '#EBFAF1';

    const handleChange = (event: SelectChangeEvent<string>, columnType: 'name' | 'description' | 'licenseType' | 'price' | 'disCount',) => {
        setValue(event.target.value)
        console.log(event)
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
            case 'description':
                console.log(event)
                setValue(event.target.value)
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


    // const handleInputs = (e:any, nameElemnt: 'count' | 'disCount', idx: number) => {
    //     console.log(idx)
    //     console.log(e)
    //     switch (nameElemnt) {
    //         case 'count':
    //             setCount((prevCounts: (number | undefined)[]) => {
    //                 const newCounts = [...prevCounts];
    //                 newCounts[idx] = +e.target.value;
    //                 return newCounts;
    //             });

    //             break;
    //         case 'disCount':
    //             setDisCount(+e.target.value)
    //             if (count === undefined) {
    //                 setCount(1)
    //             }
    //             break;
    //         default:
    //             break;
    //     }

    // }
    // useEffect(() => {
    //     const countValue = count ?? 1;
    //     const disCountValue = disCount ?? 0;
    //     const isPricingValue = isPricing ?? 0;
    //     setFinalyPrice((isPricingValue - (countValue * isPricingValue) * (disCountValue / 100)));

    // }, [count, disCount, isPricing]);

    const handleInputs = (e: any, nameElemnt: 'count' | 'disCount', rowIndex: number) => {
        const newValue = +e.target.value;
        console.log(rowIndex)
        console.log(rowsState)
        setRowsState(prevState => {
            const newState = [...prevState];
            newState[rowIndex] = {
                ...newState[rowIndex],
                [nameElemnt]: newValue,
            };
            return newState;
        });
    };

    const addinRow = () => {
        const newRow: DescriptionType = {
            value: '',
            type: ''
        };
        const newLicense: LicenseType = {
            value: '',
            type: ''
        };
        const newPrice: PriceType = {
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

    const DescriptionChange = (newValue: string, index: number) => {
        console.log(newValue, index);
        setCurrentBool(true)
        if (investment) {
            const updatedInvestment = investment.map((e: DataType) => ({
                ...e,
                description: e.description.map((change: DescriptionType, idx: number) => {
                    if (idx === index) {
                        return {
                            ...change,
                            value: newValue
                        };
                    }
                    return change;
                })
            }));
            setInvestment(updatedInvestment);
        }
    };


    const LicenseChange = (newValue: any, index: number) => {
        console.log(newValue, index);
        if (investment) {
            const updatedInvestment = investment.map((e: DataType) => ({
                ...e,
                licenseType: e.licenseType.map((change: LicenseType, idx: number) => {
                    console.log(e)
                    if (idx === index) {
                        return {
                            ...change,
                            value: newValue
                        };
                    }
                    return change;
                })
            }));
            setInvestment(updatedInvestment);
        }
    };

    const PriceChange = (newValue: string, index: number) => {
        console.log(newValue, index);
        const updatedInvestment = investment.map((e: DataType) => ({
            ...e,
            price: e.price.map((item: PriceType, idx: number) => (
                idx === index ? { ...item, value: newValue } : item
            ))
        }));
        setInvestment(updatedInvestment);
    };


    const removeAllRow = (event: React.MouseEvent<HTMLButtonElement>) => {
        const tableRow = event.currentTarget.closest('tr');
        if (tableRow) {
            tableRow.remove();
        }
    };

    const DescriptionSelect = ({ item, onRemove, id, index, onDescriptionChange }: { item: string, onRemove: () => void, id: number, index: number, onDescriptionChange: (newValue: string, index: number) => void }) => {

        const handleDescriptionChange = (event: SelectChangeEvent<string>, index: number) => {
            console.log(event, index)
            const newValue = event.target.value;
            onDescriptionChange(newValue, index);
        }
        return (
            <TableRow sx={{ display: "flex", alignItems: 'center', justifyContent: 'center', }}>
                <Select
                    labelId="description"
                    id="description"
                    sx={{
                        width: '100%',
                        '& .MuiSelect-select': {
                            whiteSpace: 'wrap',
                        }
                    }}
                    name='description'
                    value={updateValue ?? item}
                    onChange={(event) => handleDescriptionChange(event, index)}
                >
                    {isFilterDescription.map((description: any, index: number) => (
                        description.map((e: DescriptionType, idx: number) => (
                            <MenuItem key={idx} value={e.value}>{e.value}</MenuItem>
                        ))
                    ))}
                </Select>
                <Button variant='contained' onClick={onRemove}
                    sx={{ bgcolor: "#a91f1f" }}>
                    <DeleteIcon />
                </Button>
            </TableRow>
        );
    };

    const LicenseSelect = ({ item, id, index, onLicenseChange }: { item: string, id: number, index: number, onLicenseChange: (newValue: string, index: number) => void }) => {

        const handleLicenseChange = (event: SelectChangeEvent<string>) => {
            const newValue = event.target.value;
            onLicenseChange(newValue, index);
        };

        return (
            <TableRow>
                <Select
                    labelId="licenseType"
                    id="licenseType"
                    sx={{
                        width: '100%',
                        '& .MuiSelect-select': {
                            whiteSpace: 'wrap',
                        }
                    }}
                    name='licenseType'
                    value={item}
                    onChange={handleLicenseChange}
                >
                    <MenuItem value={item} key={id}> {item}</MenuItem>

                    {licenseState.map((e: any) =>
                        e.map((a: LicenseType, idx: number) => (
                            <MenuItem key={idx} value={a.value} >{a.value}</MenuItem>
                        ))


                    )}
                </Select>
            </TableRow>

        );
    };
    const PriceSelect = ({ item, id, index, onPriceChange }: { item: string, id: number, index: number, onPriceChange: (newValue: string, index: number) => void }) => {

        const handlePriceChange = (event: SelectChangeEvent<string>) => {
            console.log(index)
            const newValue = event.target.value;
            onPriceChange(newValue, index);
        };
        return (
            <TableRow>
                <Select
                    labelId="price"
                    id="price"
                    // label="price"
                    sx={{
                        width: '100%',
                        '& .MuiSelect-select': {
                            whiteSpace: 'wrap',
                        }
                    }}
                    name='price'
                    value={item}
                    placeholder={item}
                    // onChange={(e) => handleChange(e as SelectChangeEvent, 'price')}
                    onChange={handlePriceChange}
                >
                    <MenuItem value={item}> {item}</MenuItem>

                    {price.map((e: any) =>

                        e.map((a: PriceType, idx: number) => (
                            <MenuItem key={idx} value={a.value}>{a.value}</MenuItem>
                        ))

                    )}
                </Select>
            </TableRow>


        );
    };

    return (

        <TableRow sx={{ bgcolor: rowColor }}>
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
                                    index={idx}
                                    onRemove={() => removeItem(item, idx)}
                                    onDescriptionChange={DescriptionChange}
                                />
                            ))
                        ))
                    ) : <Select
                        labelId="description"
                        id="description"
                        // label="description"
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
                            bgcolor: '#0b4a0b',
                        }}>
                        <AddBoxIcon />
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
                                        index={idx}
                                        onLicenseChange={LicenseChange}
                                    />
                                ))
                            ))
                        ) :

                        <Select
                            labelId="licenseType"
                            id="licenseType"
                            // label="licenseType"
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
                {
                    investment ?
                        (
                            investment.map((e: DataType, index: number) => (
                                e.description.map((item: DescriptionType, idx: number) => (
                                    <TableRow key={idx}>
                                        <TextField
                                            key={idx}
                                            id="outlined-basic"
                                            variant="outlined"
                                            value={rowsState[index].count }
                                            name='count'
                                            onChange={(e) => handleInputs(e, 'count', idx)}
                                        />

                                    </TableRow>
                                ))
                            ))
                        ) : <TextField
                            id="outlined-basic"
                            // label="Outlined"
                            variant="outlined"
                            value={count}
                            name='count'
                            // onChange={handleInputs}
                            // onChange={(e: any) => handleInputs(e, 'count')}
                            // onChange={(e) => handleInputs(e, 'count', idx)}
                            // onChange={(e) => handleInputs(e, 'count', 0, 0)} // Assuming index 0 for simplicity
                        />
                }

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
                                        index={idx}
                                        onPriceChange={PriceChange}

                                    />
                                ))
                            ))
                        ) :
                        <Select
                            labelId="price"
                            id="price"
                            // label="price"
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

            </TableCell>

            {/* --------------------------- price */}

            <TableCell sx={{ padding: 0, border: 1 }}>

                {
                    investment ?
                        (
                            investment.map((e: DataType, index: number) => (
                                e.description.map((item: DescriptionType, idx: number) => (
                                    <TableRow>
                                        <TextField
                                            key={idx}
                                            id="outlined-basic"
                                            // label="Outlined"
                                            variant="outlined"
                                            value={disCount}
                                            name='disCount'
                                        // onChange={(e: any) => handleInputs(e, 'disCount')} 
                                        />
                                    </TableRow>
                                ))
                            ))
                        ) : <TextField
                            id="outlined-basic"
                            // label="discount"
                            variant="outlined"
                            value={disCount}
                            name='disCount'
                        // onChange={(e) => handleInputs(e, 'disCount')} 
                        />
                }
            </TableCell>
            {/* ---------------------------- zexj */}
            <TableCell sx={{ padding: 0, border: 1, }}>
                {
                    investment ?
                        (
                            investment.map((e: DataType, index: number) => (
                                e.description.map((item: DescriptionType, idx: number) => (
                                    <TableRow key={idx}>
                                        {finalyPrice}
                                    </TableRow>

                                ))
                            ))
                        ) : <> {finalyPrice}
                        </>
                }
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