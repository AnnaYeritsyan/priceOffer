
import { Button, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Select, MenuItem, SelectChangeEvent, FormControl, Box, InputLabel, TableBody, Typography } from '@mui/material';
import { DataKV, DataSchema, DataType, DescriptionType, LicenseType, PriceType, RowState } from '../dataType';
import { v4 } from 'uuid';
import data from '../data.json'
import { ChangeEvent, useState, useEffect, useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useRef } from 'react';
import { useTableContext } from '../Tables/Tables';
const styles = {
    tableCell: {
        padding: 0,
        height: 'auto',
        borderBottom: '1px solid #828282'
    },
    tableRow: {
        height: 'auto',
        borderBottom: '1px solid #828282'
    }
};

const Rows = ({ defaultRecord, index, getRemoved }:
    {
        defaultRecord: DataType,
        index: number,
        getRemoved: any
    }) => {
    const [records, setRecords] = useState<DataType[]>(data)
    const [value, setValue] = useState<string | undefined>(undefined)
    const [isFilterDescription, setIsFilterDescription] = useState<string[]>([])
    const [licenseState, setLicenseState] = useState<string[]>([])
    const [price, setPrice] = useState<string[]>([])
    const [isPricing, setIsPricing] = useState<number | undefined>()
    const [finalyPrice, setFinalyPrice] = useState<number | undefined>()
    const [showAddButton, setShowAddButton] = useState(false);
    const [investment, setInvestment] = useState<any>()
    const [updateValue, setUpdateValue] = useState<string | undefined>(undefined)
    const [rowsState, setRowsState] = useState<RowState[]>(data.map(() => ({
        count: undefined,
        disCount: undefined,
    })));
    const [removeUpdate, setRemoveUpdate] = useState<boolean>(false)
    const selectRef = useRef<HTMLSelectElement>(null);
    const [selectHeight, setSelectHeight] = useState<number>(0);
    const [otherRow, setOtherRow] = useState<any[]>([defaultRecord])


    const tableContext = useTableContext()

    const rowColor = index % 2 === 0 ? '#ffffff' : '#EBFAF1';

    const handleChange = (event: SelectChangeEvent<string>, columnType: 'name' | 'description' | 'licenseType' | 'price' | 'disCount',) => {
        setValue(event.target.value)
        switch (columnType) {
            case 'name':
                const selectedRecords = records.filter(record => record.name === event.target.value);
                const descriptions: any = selectedRecords.map(record => record.description);
                setIsFilterDescription(descriptions);
                const license: any = selectedRecords.map(record => record.licenseType)
                setLicenseState(license)
                const price: any = selectedRecords.map(record => record.price)
                setPrice(price)
                const selectedName = event.target.value;
                if (selectedName === 'LIS-A ներդնում') {
                    setInvestment(selectedRecords);
                    otherRow.map((e: any) => {
                        e.name = selectedName
                    })

                } else {
                    setInvestment(null);

                    otherRow.map((e: any) => {
                        e.name = selectedName
                    })
                    setShowAddButton(false);
                }

                setShowAddButton(selectedName === 'LIS-A ներդնում');
                break;
            case 'description':
                setValue(event.target.value)
                otherRow.map((e: any) => {
                    e.description = event.target.value
                })

                break;
            case 'licenseType':
                setValue(event.target.value)
                otherRow.map((e: any) => {
                    e.licenseType = event.target.value
                })
                break;
            case 'price':
                setIsPricing(+event.target.value)
                otherRow.map((e: any) => {
                    e.price = event.target.value
                })
                // 
                break;
            default:
                break;
        }
        console.log(otherRow)
        tableContext.onChange && tableContext.onChange(otherRow[0])

    }
    console.log(otherRow)
    useEffect(() => {
        // tableContext.onChange && tableContext.onChange(otherRow)
        tableContext.getRemoved && tableContext.getRemoved(otherRow[0]);

        console.log(otherRow)
    }, [otherRow])


    useEffect(() => {
        if (investment) {
            console.log(investment)
            otherRow[0].description = investment[0].description
            console.log(otherRow, '=================')
            tableContext.onChange && tableContext.onChange(otherRow[0])
            const initialRowsState = investment.map(() => ({
                count: undefined,
                disCount: undefined,
            }));
            setRowsState(initialRowsState);
            setShowAddButton(true);


        }
    }, [investment]);

    // ==========================================================

    // ============================

    const handleInputs = (e: any, nameElemnt: 'count' | 'disCount', rowIndex: number) => {

        const newValue = e.target.value;

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
            setRowsState(prevState => [...prevState, { count: undefined, disCount: undefined }]);

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

            setRowsState(prevState => {
                const newState = [...prevState];
                newState[idx] = {
                    count: undefined,
                    disCount: undefined,
                };
                return newState;
            });
        }
    };


    // console.log(investment)


    const DescriptionChange = (newValue: string, index: number) => {
        // console.log(newValue, index);

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
        // console.log(newValue, index);
        if (investment) {
            const updatedInvestment = investment.map((e: DataType) => ({
                ...e,
                licenseType: e.licenseType.map((change: LicenseType, idx: number) => {
                    // console.log(e)
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
        // console.log(newValue, index);
        const updatedInvestment = investment.map((e: DataType) => ({
            ...e,
            price: e.price.map((item: PriceType, idx: number) => (
                idx === index ? { ...item, value: newValue } : item
            ))
        }));
        setInvestment(updatedInvestment);
    };


    // const removeAllRow = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     const tableRow = event.currentTarget.closest('tr');
    //     if (tableRow) {
    //         tableRow.remove();

    //     }
    // };

    //     const removeAllRow = (event: React.MouseEvent<HTMLButtonElement>) => {
    //         const tableRow = event.currentTarget.closest('tr');

    //         if (tableRow && defaultRecord && 'id' in defaultRecord) { // Check if defaultRecord is defined and has an 'id' property
    //             const updatedOtherRow:any = otherRow.filter((row:any) => row.id !== defaultRecord.id);
    //             setOtherRow(updatedOtherRow);
    //             console.log(updatedOtherRow)
    //             tableRow.remove();
    //             setRemoveUpdate(true);
    // console.log(tableContext)
    //             // Call context onChange with the updated data
    //             tableContext.getRemoved && tableContext.getRemoved(updatedOtherRow[0]);
    //         } 
    //              console.log(defaultRecord)
    //     };
    console.log(defaultRecord, otherRow, records)

    const removeAllRow = (event: React.MouseEvent<HTMLButtonElement>) => {
        const tableRow = event.currentTarget.closest('tr');

        if (tableRow && defaultRecord && 'id' in defaultRecord) {
            const idToRemove = defaultRecord.id;

            const updatedOtherRow = otherRow.filter((row: any) => row.id !== idToRemove);

            setOtherRow(updatedOtherRow);
            console.log(idToRemove)
console.log( tableContext.onChange && tableContext.onChange(idToRemove));
            tableContext.getRemoved && tableContext.getRemoved(idToRemove);

            tableRow.remove();

            setRemoveUpdate(true);
        } else {
            console.error('Error: Unable to remove row. Default record is not defined or does not have an "id" property.');
        }
    };






    const DescriptionSelect = ({ item, onRemove, id, index, onDescriptionChange }: { item: string, onRemove: () => void, id: number, index: number, onDescriptionChange: (newValue: string, index: number) => void }) => {
        // console.log(rowsState)

        useEffect(() => {
            if (selectRef.current) {
                const height = selectRef.current.offsetHeight;
                setSelectHeight(height);
            }
        }, []);
        const handleDescriptionChange = (event: SelectChangeEvent<string>, index: number) => {
            // console.log(event, index)
            const newValue = event.target.value;
            onDescriptionChange(newValue, index);
        }
        return (
            <TableRow style={styles.tableRow} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center', }}>

                <FormControl fullWidth>
                    {
                        value ? '' :
                            <InputLabel id={`license-select-label-${index}`}>Նկարագրություն</InputLabel>

                    }
                    <Select
                        labelId="description"
                        id="description"
                        sx={{
                            width: '100%',
                            '& .MuiSelect-select': {
                                whiteSpace: 'wrap',
                            },
                            ".MuiOutlinedInput-notchedOutline": { border: 0 },
                            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                            {
                                border: 0,
                            },
                            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                                border: 0,
                            },
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
                </FormControl>
                {/* <Button variant='contained' 
                    sx={{ bgcolor: "#a91f1f" }}> */}
                <DeleteIcon onClick={onRemove} sx={{ color: '#a91f1f' }} />
                {/* </Button> */}

            </TableRow>
        );
    };

    const LicenseSelect = ({ item, id, index, onLicenseChange }: { item: string, id: number, index: number, onLicenseChange: (newValue: string, index: number) => void }) => {
        useEffect(() => {
            const height = document.getElementById(`license-select-${index}`)?.clientHeight;
            if (height) {
                setSelectHeight(height);
            }
        }, [index]);

        const handleLicenseChange = (event: SelectChangeEvent<string>) => {
            const newValue = event.target.value;
            onLicenseChange(newValue, index);
        };

        return (
            <TableRow sx={{ borderBottom: 1, borderColor: '#828282', height: selectHeight }}  >
                <TableCell style={styles.tableCell}>
                    <FormControl fullWidth>
                        {
                            value ? '' :
                                <InputLabel id={`license-select-label-${index}`}>Լիցենզիայի տեսակ</InputLabel>

                        }
                        <Select
                            labelId="licenseType"
                            id="licenseType"
                            sx={{
                                width: '100%',
                                '& .MuiSelect-select': {
                                    whiteSpace: 'wrap',
                                },
                                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                {
                                    border: 0,
                                },
                                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                    border: 0,
                                },
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
                    </FormControl></TableCell>
            </TableRow>

        );
    };
    const PriceSelect = ({ item, id, index, onPriceChange }: { item: string, id: number, index: number, onPriceChange: (newValue: string, index: number) => void }) => {

        const handlePriceChange = (event: SelectChangeEvent<string>) => {
            // console.log(index)
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
                        },
                        ".MuiOutlinedInput-notchedOutline": { border: 0 },
                        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                        {
                            border: 0,
                        },
                        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                            border: 0,
                        },
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
            <TableCell sx={{ padding: 0, }} >
                <FormControl fullWidth>
                    {
                        value ? '' :
                            <InputLabel id="demo-simple-select-label">Անվանում</InputLabel>

                    }
                    <Select
                        labelId="name"
                        id="name"
                        label="name"
                        sx={{
                            width: '70%',
                            '& .MuiSelect-select': {
                                whiteSpace: 'wrap',
                                width: '220px'
                            },
                            ".MuiOutlinedInput-notchedOutline": { border: 0 },
                            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                            {
                                border: 0,
                            },
                            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                                border: 0,
                            },
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
                </FormControl>
            </TableCell>

            {/* --------------------------- description */}

            <TableCell sx={{ padding: 0, }} >
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
                    ) :
                        <FormControl fullWidth>
                            {
                                value ? '' :
                                    <InputLabel id="demo-simple-select-label">Նկարագրություն</InputLabel>

                            }
                            <Select
                                labelId="description"
                                id="description"
                                // label="description" 

                                sx={{
                                    width: '100%',
                                    '& .MuiSelect-select': {
                                        whiteSpace: 'wrap',
                                    },
                                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                                    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                    {
                                        border: 0,
                                    },
                                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        border: 0,
                                    },
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
                        </FormControl>
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
            <TableCell sx={{ padding: 0, }} >
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
                        <FormControl fullWidth>
                            {
                                value ? '' :
                                    <InputLabel id="demo-simple-select-label">Լիցենզիայի տեսակ</InputLabel>

                            }
                            <Select
                                labelId="licenseType"
                                id="licenseType"
                                // label="licenseType"
                                sx={{
                                    width: '100%',
                                    '& .MuiSelect-select': {
                                        whiteSpace: 'wrap',
                                    },
                                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                                    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                    {
                                        border: 0,
                                    },
                                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        border: 0,
                                    },
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
                        </FormControl>
                }
            </TableCell>

            <TableCell sx={{ padding: 0, }} >
                {
                    investment ?
                        (
                            investment.map((e: DataType, index: number) => (

                                e.description.map((item: DescriptionType, idx: number) => {
                                    // console.log(idx)
                                    return (
                                        <TableRow key={idx}>
                                            <TextField
                                                key={idx}
                                                id="outlined-basic"
                                                variant="outlined"
                                                value={rowsState[idx]?.count}
                                                name='count'
                                                onChange={(e) => handleInputs(e, 'count', idx)}
                                            />

                                        </TableRow>
                                    )
                                })
                            )
                            )
                        ) : <TextField
                            id="outlined-basic"
                            // label="Outlined"
                            variant="outlined"
                            value={rowsState[index]?.count}
                            name='count'
                            onChange={(e) => handleInputs(e, 'count', 0)}
                        />
                }

            </TableCell>
            <TableCell sx={{ padding: 0, }} >
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
                        <FormControl fullWidth>
                            {
                                value ? '' :
                                    <InputLabel id="demo-simple-select-label">Գին</InputLabel>

                            }
                            <Select
                                labelId="price"
                                id="price"
                                label="գին"
                                sx={{

                                    width: '100%',
                                    '& .MuiSelect-select': {
                                        whiteSpace: 'wrap',
                                    },
                                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                                    "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                    {
                                        border: 0,
                                    },
                                    "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        border: 0,
                                    },
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
                        </FormControl>
                }

            </TableCell>

            {/* --------------------------- price */}

            <TableCell sx={{ padding: 0, }}>

                {
                    investment ?
                        (
                            investment.map((e: DataType, index: number) => (
                                e.description.map((item: DescriptionType, idx: number) => (
                                    <TableRow>
                                        {/* <TextField
                                            key={idx}
                                            id="outlined-basic"
                                            // label="Outlined"
                                            variant="outlined"
                                            value={disCount}
                                            name='disCount'
                                        // onChange={(e: any) => handleInputs(e, 'disCount')} 
                                        /> */}
                                        <TextField
                                            key={idx}
                                            id="outlined-basic"
                                            variant="outlined"
                                            value={rowsState[idx]?.disCount ?? 0}
                                            name='disCount'
                                            onChange={(e) => handleInputs(e, 'disCount', idx)}
                                        />
                                    </TableRow>
                                ))
                            ))
                        ) : <TextField
                            id="outlined-basic"
                            // label="discount"
                            variant="outlined"
                            value={rowsState[index]?.disCount}
                            name='disCount'
                            onChange={(e) => handleInputs(e, 'disCount', 0)}
                        />
                }
            </TableCell>
            {/* ---------------------------- zexj */}
            <TableCell sx={{ padding: 0, }}>
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

            <TableCell sx={{ padding: 0 }}>
                <Button onClick={removeAllRow}><DeleteIcon sx={{ color: 'black' }} /></Button>

            </TableCell>

        </TableRow>

    );
};
export default Rows;