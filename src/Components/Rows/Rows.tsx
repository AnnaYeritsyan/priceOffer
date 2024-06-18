
import { Button, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Select, MenuItem, SelectChangeEvent, FormControl, Box, InputLabel, TableBody, Typography } from '@mui/material';
import { CountType, DataKV, DataSchema, DataType, DescriptionType, InvestmentType, LicenseType, NewObjType, PriceType, RowState } from '../dataType';
import { v4 } from 'uuid';
import data from '../data.json'
import { ChangeEvent, useState, useEffect, useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useRef } from 'react';
import { useTableContext } from '../Tables/Tables';
import { styles } from '../style';



const Rows = ({ defaultRecord, index, databaseData, recordsDataTable, headerData }:
    {
        defaultRecord: DataType | any,
        index: number,
        databaseData: any,
        recordsDataTable: any,
        headerData: any
    }) => {

    // const [records, setRecords] = useState<DataType[]>(data)
    const records = data
    const [value, setValue] = useState<string | undefined | number>(undefined)
    const [isFilterDescription, setIsFilterDescription] = useState<string[]>([])
    const [isFilterLicense, setIsFilterLicense] = useState<string[]>([])
    const [licenseState, setLicenseState] = useState<string[]>([])
    const [price, setPrice] = useState<any[]>([])
    const [onePrice, setOnePrice] = useState<any | undefined>()
    const [finallyPrice, setFinallyPrice] = useState<number | undefined>()
    const [finallyPriceInvestment, setFinallyPriceInvestment] = useState<any>({})
    const [showAddButton, setShowAddButton] = useState(false);
    const [investment, setInvestment] = useState<any | any[]>();
    const [updateValue, setUpdateValue] = useState<string | undefined>(undefined)
    const [otherRow, setOtherRow] = useState<any[]>([defaultRecord])
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string | undefined>(undefined)
    const [license, setLicense] = useState<string | undefined | any>(undefined)
    const [count, setCount] = useState<string | undefined | number>()
    const [countInvestment, setCountInvestment] = useState<any>({})
    const [disCount, setDisCount] = useState<string | undefined | any[]>()
    const [disCountInvestment, setDisCountInvestment] = useState<any>({})
    const [isPricing, setIsPricing] = useState<number | undefined>()

    const [updateCountInvetsment, setUpdateCountInvestment] = useState<any>()
    const [updatedisCountInvetsment, setUpdatedisCountInvestment] = useState<any>()
    const [updatefinallyPriceInvetsment, setupdatefinallyPriceInvetsment] = useState<any>()
    
    
  

    useEffect(() => {
        console.log(investment);

        if (investment) {
            otherRow[0].description = investment[0].description;
            otherRow[0].licenseType = investment[0].licenseType;
            otherRow[0].price = investment[0].price;
            otherRow[0].count = investment[0].count?.length > 0
                ? investment[0].count.map((a: any, index: number) => {
                    console.log(countInvestment[index])
                    if (countInvestment[index]) {
                        // const key = Object.keys(countInvestment[index])[0];
                        return {
                            ...a,
                            // type: key, 
                            type: countInvestment[index],
                            value: countInvestment[index]
                        };
                    } else {
                        if (a.type === undefined && a.value === undefined) {
                            return { ...a, type: 1, value: 1 };
                        } else {
                            return { ...a, type: a.type, value: a.value };
                        }
                    }
                })
                : Array.from(Array(investment[0].description.length)?.keys()).map(
                    () => ({ type: 1, value: 1 }),
                );

            otherRow[0].disCount = investment[0].disCount?.length > 0
                ? investment[0].disCount.map((a: any, index: number) => {
                    if (disCountInvestment[index]) {
                        // const key = Object.keys(disCountInvestment[index])[0];
                        return {
                            ...a,
                            //  type: key, 
                            type: disCountInvestment[index],
                            value: disCountInvestment[index]
                        };
                    } else {
                        if (a.type === undefined && a.value === undefined) {
                            return { ...a, type: 1, value: 1 };
                        } else {
                            return { ...a, type: a.type, value: a.value };
                        }
                    }
                })
                : 
                Array.from(Array(investment[0].description.length)?.keys()).map(
                    () => ({ type: 1, value: 1 }),
                );

            otherRow[0].finallyPrice =investment[0].count?.length > 0
            ? investment[0].count.map((item: any, index: number) => {
                const price = investment[0].price[index]?.value || 0;
                const count = item.value || 0;
                const totalPrice = price * count;

                const discount = investment[0].disCount[index]?.value || 0;
                const discountPercent = discount / 100;
                const discountedPrice = totalPrice * (1 - discountPercent);

                return discountedPrice;
            }):Array.from(Array(investment[0].description.length)?.keys()).map(
                () => ({ type: 1, value: 1 }),
            );
            setFinallyPrice(otherRow[0].finallyPrice)
        }

    }, [investment, countInvestment, disCountInvestment]);


    useEffect(() => {
        console.log( defaultRecord)

        setName(defaultRecord.name)
        if (typeof defaultRecord.description !== 'object') {
            ////console.log(defaultRecord.description)
            setDescription(defaultRecord.description);
            setLicense(defaultRecord.licenseType);
            const onFilterRecords = records.filter(f => f.name === defaultRecord.name);
            const getFilterDescription: any = onFilterRecords.map(f => f.description);
            const getFilterLicense: any = onFilterRecords.map(f => f.licenseType);
            const getFilterPrice = onFilterRecords.map(f => f.price);
            setIsFilterDescription(getFilterDescription);
            setIsFilterLicense(getFilterLicense);
            setPrice(getFilterPrice);
            setOnePrice(defaultRecord.price);
            setCount(otherRow[0].count)
            setDisCount(otherRow[0].disCount)
            setFinallyPrice(defaultRecord.disCountPrice)
            ////console.log(otherRow)
        }
        else {
            const onFilterRecords = otherRow.filter(f => f.name === defaultRecord.name);
            let newObj: NewObjType = {
                id: '',
                name: '',
                description: [],
                licenseType: [],
                price: [],
                count: [],
                disCount: [],
                finallyPrice: [],
            };
            onFilterRecords.forEach((f, idx) => {

                f.description.forEach((a: any) => {
                    newObj.id = f.id;
                    newObj.name = f.name;
                    newObj.description = f.description;
                    newObj.licenseType = f.licenseType;
                    newObj.price = f.price;
                    newObj.finallyPrice = f.price;
                   
                    if (disCountInvestment.length > 0) {
                        console.log(f.count)
                        newObj.count = f.count
                    }
                    else {
                        if (f.price && Array.isArray(f.price)) {
                            if (countInvestment !== undefined) {
                                newObj.count = f.price.map((d: any, idx: number) => {
                                    return {
                                        ...d,
                                        type: 1,
                                        value: 1
                                    };
                                });
                            }
                            else {
                                newObj.count = f.price.map((d: any, idx: number) => {
                                    return {
                                        ...d,
                                        type: countInvestment.type,
                                        value: countInvestment.value
                                    };
                                });
                            }

                        }


                    }
                    if (countInvestment.length > 0) {
                        newObj.count = f.disCount
                    }
                    else {
                        if (f.price && Array.isArray(f.price)) {
                            newObj.disCount = f.price.map((d: any) => {
                                return {
                                    ...d,
                                    type: countInvestment.type,
                                    value: countInvestment.value
                                };
                            });
                        }
                    }


                })
            })

            setInvestment(otherRow)


        }
    }, [recordsDataTable])





    const tableContext = useTableContext()
    const rowColor = index % 2 === 0 ? '#ffffff' : '#EBFAF1';

    const handleChange = (event: SelectChangeEvent<string>, columnType: 'name' | 'description' | 'licenseType' | 'price') => {
        setValue(event.target.value)

        switch (columnType) {
            case 'name':
                setName(event.target.value)
                const selectedRecords = records.filter(record => record.name === event.target.value);
                const descriptions: any = selectedRecords.map(record => record.description);
                setIsFilterDescription(descriptions);
                const licenses: any = selectedRecords.map(record => record.licenseType)
                setIsFilterLicense(licenses)
                const price: any = selectedRecords.map(record => record.price)
                setPrice(price)
                const selectedName = event.target.value;
                if (selectedName === 'LIS-A ներդնում') {

                    setInvestment(selectedRecords);
                    otherRow.map((e: any) => { e.name = selectedName })

                } else {
                    otherRow.map((e: any) => {
                        e.name = selectedName
                    })
                    setShowAddButton(false);
                }
                setShowAddButton(selectedName === 'LIS-A ներդնում');
                break;
            case 'description':
                setValue(event.target.value)
                if (name !== 'LIS-A ներդնում') {
                    // setDescription(event.target.value);
                    console.log(description)
                    setDescription(event.target.value);
                }
                otherRow.map((e: any) => {
                    e.description = event.target.value
                })

                break;
            case 'licenseType':
                setValue(event.target.value)
                if (name === 'LIS-A ներդնում') {
                    setLicenseState([event.target.value]);
                } else {
                    setLicense(event.target.value);
                }

                otherRow.map((e: any) => {
                    e.licenseType = event.target.value
                })
                break;
            case 'price':

                if (name === 'LIS-A ներդնում') {
                    // setLicenseState([event.target.value]);
                } else {
                    setIsPricing(+event.target.value)
                }
                otherRow.map((e: any) => {
                    e.price = +(event.target.value)
                })
                break;

            default:
                break;
        }


        tableContext.onChange && tableContext.onChange(otherRow[0])

    }



    // ==========================================================
    const handleInputs = (e: ChangeEvent<{ value: string }>, nameElement: 'count' | 'disCount', rowIndex: number) => {
        const newValue = e.target.value;

        if (name === 'LIS-A ներդնում') {
            if (nameElement === 'count') {
                setCountInvestment((prev: any) => {
                    const updatedCountInvestment = {
                        ...prev,
                        [rowIndex]: newValue
                    };
                    return updatedCountInvestment;


                });
            }
            if (nameElement === 'disCount') {
                setDisCountInvestment((prev: any) => {
                    const updatedDisCountInvestment = {
                        ...prev,
                        [rowIndex]: newValue
                    };
                    return updatedDisCountInvestment;
                });
            }

        }
        else {
            switch (nameElement) {
                case 'count':
                    setCount(e.target.value)
                    // setValue(e.target.value)
                    break;
                case 'disCount':
                    setDisCount(e.target.value)

                    break;
                default:
                    break;
            }

        }

    };

    useEffect(() => {
        if (investment) {

            const updatedInvestment = investment.map((e: InvestmentType) => ({
                ...e,

                count: e.count ? (e.count.map((change: any, idx: number) => {
                    if (countInvestment[idx] !== undefined) {

                        return {
                            ...change,
                            type: idx,
                            value: countInvestment[idx],
                        };
                    }
                    return change;
                })) :
                    (e.description.map((change: DescriptionType, idx: number) => {
                        if (countInvestment[idx] !== undefined) {

                            return {
                                ...change,
                                type: idx,
                                value: '1',
                            };
                        }
                        return change;
                    }))
            }));

            setUpdateCountInvestment(updatedInvestment)

        }
    }, [countInvestment]);


    useEffect(() => {
        if (investment) {

            const updatedInvestment = investment.map((e: InvestmentType) => ({
                ...e,

                disCount: e.disCount ? (e.disCount.map((change: any, idx: number) => {
                    if (disCountInvestment[idx] !== undefined) {
                        return {
                            ...change,
                            type: idx,
                            value: disCountInvestment[idx],
                        };
                    }
                    return change;
                })) :
                    (e.description.map((change: DescriptionType, idx: number) => {
                        if (disCountInvestment[idx] !== undefined) {

                            return {
                                ...change,
                                type: idx,
                                value: '1',
                            };
                        }
                        return change;
                    }))
            }));

            setUpdatedisCountInvestment(updatedInvestment)

        }
    }, [disCountInvestment]);



    useEffect(() => {
        if (investment) {
            const updatedInvestment = investment.map((e: InvestmentType) => ({
                ...e,

                finallyPrice: e.finallyPrice ? e.finallyPrice.map((change: CountType, idx: number) => {
                    if (finallyPriceInvestment[idx] !== undefined) {

                        return {
                            ...change,
                            type: idx,
                            value: finallyPriceInvestment[idx],
                        };
                    }
                    return change;
                }) :
                    e.description.map((change: DescriptionType, idx: number) => {
                        if (finallyPriceInvestment[idx] !== undefined) {

                            return {
                                ...change,
                                type: idx,
                                value: price[idx].value,
                            };
                        }
                        return change;
                    })


            }));

            // setInvestment(updatedInvestment);
        }
    }, [countInvestment, disCountInvestment, investment]);

   


    const addinRow = () => {                 //created lis-a investment  row
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
        const newCount: CountType = {
            value: '',
            type: ''
        };
        if (investment) {
            const newInvestment = investment?.map((item: InvestmentType) => {

                return ({
                    ...item,
                    description: [...item.description, newRow],
                    licenseType: [...item.licenseType, newLicense],
                    price: [...item.price, newPrice],
                    count: [...item.count, newCount],
                    disCount: [...item.disCount, newPrice],
                    finallyPrice: [...item.finallyPrice, newPrice]
                }
                )
            });
            setInvestment(newInvestment);

        }
    };

    const removeItem = (idToRemove: DescriptionType, idx: number) => {  //removed lis-a investment  row
        if (investment) {
            const updatedInvestment = investment.map((item: any) => ({
                ...item,
                description: item.description.filter((desc: DescriptionType, index: number) => index !== idx),
                licenseType: item.licenseType.filter((license: LicenseType, index: number) => index !== idx),
                price: item.price.filter((price: PriceType, index: number) => index !== idx),
                count: item.count.filter((count: any, index: number) => index !== idx),
                finallyPrice: item.finallyPrice?.filter((finallyPrice: any, index: number) => index !== idx),
            }));
            setInvestment(updatedInvestment);

        }
    };

    const DescriptionChange = (newValue: string, index: number) => {

        if (investment) {
            const updatedInvestment = investment.map((e: DataType) => ({
                ...e,
                description: e.description.map((change: DescriptionType, idx: number) => {
                    if (idx === index) {
                        return {
                            ...change,
                            value: newValue,
                            type: newValue,

                        };
                    }
                    return change;
                })
            }));
            setInvestment(updatedInvestment);
        }
    };


    const LicenseChange = (newValue: any, index: number) => {

        if (investment) {
            const updatedInvestment = investment.map((e: DataType) => ({
                ...e,
                licenseType: e.licenseType.map((change: LicenseType, idx: number) => {
                    if (idx === index) {
                        return {
                            ...change,
                            value: newValue,
                            type: newValue
                        };
                    }
                    return change;
                })
            }));
            setInvestment(updatedInvestment);

        }
    };

    const PriceChange = (newValue: string, index: number) => {
        const updatedInvestment = investment.map((e: DataType) => ({
            ...e,
            price: e.price.map((item: PriceType, idx: number) => (
                idx === index ? { ...item, value: newValue, type: newValue } : item
            ))
        }));
        setInvestment(updatedInvestment);
    };

    const removeAllRow = (event: React.MouseEvent<HTMLButtonElement>) => {
        const tableRow = event.currentTarget.closest('tr');
        if (tableRow && defaultRecord && 'id' in defaultRecord) {
            tableContext.onRemoved && tableContext.onRemoved(defaultRecord.id);
        } else {
            //console.error('Error: Unable to remove row. Default record is not defined or does not have an "id" property.');
        }
    };

    const DescriptionSelect = (
        { item, onRemove, id, index, onDescriptionChange }:
            {
                item: string, onRemove: () => void, id: number, index: number, onDescriptionChange:
                (newValue: string, index: number) => void
            }) => {


        const handleDescriptionChange = (event: SelectChangeEvent<string>, index: number) => {
            const newValue = event.target.value;
            onDescriptionChange(newValue, index);
        }
        return (
            <TableRow style={styles.tableRow}
                sx={{
                    display: "flex", alignItems: 'center', justifyContent: 'center',
                    height: '60px'
                }}>

                <FormControl fullWidth >

                    <Select
                        labelId="description"
                        id="description"
                        sx={{
                            width: '100%',
                            height: '54px',
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


                        {
                            records
                                .filter((description: any) => description.name === 'LIS-A ներդնում')
                                .flatMap((description: any) => description.description)
                                .map((e: DescriptionType, idx: number) => (
                                    <MenuItem key={idx} value={e.value}>
                                        {e.value}
                                    </MenuItem>
                                ))
                        }

                    </Select>
                </FormControl>

                <DeleteIcon onClick={onRemove} sx={{ color: '#a91f1f', cursor: 'pointer' }} />

            </TableRow>
        );
    };

    const LicenseSelect = ({ item, id, index, onLicenseChange }: { item: string, id: number, index: number, onLicenseChange: (newValue: string, index: number) => void }) => {

        const handleLicenseChange = (event: SelectChangeEvent<string>) => {
            const newValue = event.target.value;
            onLicenseChange(newValue, index);
        };

        return (
            <TableRow sx={{ borderBottom: 1, borderColor: '#828282', }}  >
                <TableCell style={styles.tableCell}>
                    <FormControl fullWidth sx={{
                        height: '54px',
                    }}>

                        <Select
                            labelId="licenseType"
                            id="licenseType"
                            sx={{
                                width: '100%',
                                height: '54px',
                                '& .MuiSeect-select': {
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
                            // value={item}
                            onChange={handleLicenseChange}
                            value={updateValue ?? item}
                        // onChange={(event) => handleLicenseChange(event, index)}
                        >
                            <MenuItem value={item} key={(new Date().getMilliseconds())}> {item}</MenuItem>

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
            const newValue = event.target.value;
            onPriceChange(newValue, index);
        };
        return (
            <TableRow sx={{ height: '54px' }}>
                <Select
                    labelId="price"
                    id="price"
                    // label="price"
                    sx={{
                        width: '100%',
                        height: '54px',
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
                    // value={item}
                    value={updateValue ?? item}
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
                        value={name}
                        onChange={(e) => handleChange(e as SelectChangeEvent, 'name')}
                    >
                        {
                            records.map((e: DataType, idx) =>
                                <MenuItem value={e.name} key={idx}>{e.name} </MenuItem>
                            )
                        }


                    </Select>
                </FormControl>
            </TableCell>

            {/* --------------------------- description */}

            <TableCell sx={{ padding: 0, }} >
                {
                    investment && investment.length > 0 ? (
                        investment.map((e: DataType, index: number) => {
                            return (
                                e.description.map((item: DescriptionType, idx: number) => {
                                    return (
                                        <TableHead>
                                            <DescriptionSelect
                                                key={idx}
                                                item={item.value}
                                                id={e.id}
                                                index={idx}
                                                onRemove={() => removeItem(item, idx)}
                                                onDescriptionChange={DescriptionChange}
                                            />
                                        </TableHead>
                                    )
                                })
                            )
                        })
                    ) :

                        <FormControl fullWidth>
                            {
                                description ? '' :
                                    <InputLabel id="demo-simple-select-label">Նկարագրություն</InputLabel>

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
                                value={description ?? name}
                                onChange={(e) => handleChange(e as SelectChangeEvent, 'description')}
                            >

                                {isFilterDescription.map((ds: any, index: number) => {
                                    return (
                                        ds.map((e: DescriptionType, idx:number) => (
                                            <MenuItem key={idx} value={e.value}>{e.value} </MenuItem>
                                        ))
                                    )
                                }
                                )}

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
            <TableCell sx={{ padding: 0, height: '54px' }} >
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
                                license ? null :
                                    <InputLabel id="demo-simple-select-label">Լիցենզիայի տեսակ </InputLabel>

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
                                value={license ?? name}
                                onChange={(e) => handleChange(e as SelectChangeEvent, 'licenseType')}
                            >

                                {isFilterLicense.map((li: any, index: number) => (
                                    li.map((e: LicenseType, idx:number) => (
                                        <MenuItem key={idx} value={e.value}>{e.value}</MenuItem>
                                    ))
                                ))}
                            </Select>
                        </FormControl>
                }
                {
                    investment ? <Button variant='contained' onClick={addinRow}
                        sx={{
                            bgcolor: '#0b4a0b',
                            visibility: 'hidden'
                        }}>
                        <AddBoxIcon />
                    </Button> : null
                }
            </TableCell>
            <TableCell sx={{ padding: 0 }} >
                {investment ? (
                    investment.map((e: any, index: number) => (
                        e.count && e.count.length !== 0 ? (
                            e.count.map((item: any, idx: number) => (
                                <TableRow key={idx}>
                                    <TextField
                                        key={idx}
                                        id="outlined-basic"
                                        variant="outlined"
                                        type='number'
                                        value={countInvestment[idx] !== undefined ? countInvestment[idx] : (item?.value)}
                                        name='count'
                                        onChange={(event) => handleInputs(event, 'count', idx)}
                                    />
                                </TableRow>
                            ))
                        ) : (
                            e.description.map((item: any, idx: number) => (
                                <TableRow key={idx}>
                                    <TextField
                                        key={idx}
                                        id="outlined-basic"
                                        variant="outlined"
                                        type='number'
                                        value={countInvestment[idx] !== undefined ? countInvestment[idx] : '1'}
                                        name='count'
                                        onChange={(event) => handleInputs(event, 'count', idx)}
                                    />

                                </TableRow>
                            ))
                        )
                    ))
                ) : (
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        type='number'
                        value={count ?? 1}
                        name='count'
                        onChange={(event) => handleInputs(event, 'count', 0)}
                    />
                )}
                {investment && (
                    <Button variant='contained' onClick={addinRow} sx={{ bgcolor: '#0b4a0b', visibility: 'hidden' }}>
                        <AddBoxIcon />
                    </Button>
                )}
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
                                onePrice ? '' :
                                    <InputLabel id="demo-simple-select-label">Գին</InputLabel>
                            }
                            <Select
                                labelId="price"
                                id="price"
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
                                value={onePrice ?? name}
                                onChange={(e) => handleChange(e as SelectChangeEvent, 'price')}
                            >
                                {price.map((price: any, index: number) => (
                                    price.map((e: PriceType) => (
                                        <MenuItem key={e.value} value={+e.value}>{+e.value}</MenuItem>
                                    ))
                                ))}

                            </Select>
                        </FormControl>
                }
                {
                    investment ? <Button variant='contained' onClick={addinRow}
                        sx={{
                            bgcolor: '#0b4a0b',
                            visibility: 'hidden'
                        }}>
                        <AddBoxIcon />
                    </Button> : null
                }
            </TableCell>

            {/* --------------------------- price */}

            <TableCell sx={{ padding: 0 }}>
                {investment ? (
                    investment.map((e: any, index: number) => {

                        return (
                            e.disCount && e.disCount.length !== 0 ? (
                                e.disCount.map((item: any, idx: number) => (
                                    <TableRow key={idx}>
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            value={disCountInvestment[idx] !== undefined ? disCountInvestment[idx] : (item?.value ?? '1')}
                                            name='disCount'
                                            type='number'
                                            onChange={(event) => handleInputs(event, 'disCount', idx)}
                                        />
                                    </TableRow>
                                ))
                            ) : (
                                e.description.map((item: any, idx: number) => (
                                    <TableRow key={idx}>
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            // value={disCount ?? 0}
                                            // value={disCountInvestment[idx] !== undefined ? disCountInvestment[idx] : '1'}
                                            name='disCount'
                                            type='number'
                                            onChange={(event) => handleInputs(event, 'disCount', idx)}
                                        />
                                    </TableRow>
                                ))
                            )
                        )
                    })
                ) : (
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        value={disCount}
                        type='number'
                        name='disCount'
                        onChange={(event) => handleInputs(event, 'disCount', 0)}
                    />
                )}
                {investment ? (
                    <Button
                        variant='contained'
                        onClick={addinRow}
                        sx={{
                            bgcolor: '#0b4a0b',
                            visibility: 'hidden'
                        }}
                    >
                        <AddBoxIcon />
                    </Button>
                ) : null}
            </TableCell>
            {/* ---------------------------- zexj */}
            {/* <TableCell sx={{ padding: 0, }}>
                {
                    investment ?
                        (
                            investment.map((e: any, index: number) => {
                                return (
                                    e.finallyPrice?.map((item: any, idx: number) => (
                                        <TableRow key={idx} sx={{
                                            height: '56px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                        }}>
                                            {item}
                                        </TableRow>

                                    ))
                                )
                            })
                        ) : <TableRow sx={{
                            height: '56px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {finallyPrice}
                        </TableRow>
                }
            </TableCell> */}
            {/* <TableCell sx={{ padding: 0 }}>
      {investment ? (
        investment.map((e: any, index: number) => (
          e.finallyPrice ? (
            e.finallyPrice.map((item:any, idx:number) => (
              <TableRow
                key={idx}
                sx={{
                  height: '56px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                {item}
              </TableRow>
            ))
          ) : null
        ))
      ) : (
        <TableRow
          sx={{
            height: '56px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {finallyPrice}
        </TableRow>
      )}
    </TableCell> */}
    <TableCell sx={{ padding: 0 }}>
          {investment ? (
            investment.map((e: any, index: number) => (
              e.finallyPrice ? (
                e.finallyPrice.map((item:any, idx:number) => (
                  <TableRow
                    key={idx}
                    sx={{
                      height: '56px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    {typeof item === 'string' || typeof item === 'number' ? (
                      item
                    ) : (
                      <span>Invalid Data</span>
                    )}
                  </TableRow>
                ))
              ) : null
            ))
          ) : (
            <TableRow
              sx={{
                height: '56px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {typeof finallyPrice === 'string' || typeof finallyPrice === 'number' ? (
                finallyPrice
              ) : (
                <span>Invalid Data</span>
              )}
            </TableRow>
          )}
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