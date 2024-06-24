
import { Button, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Select, MenuItem, SelectChangeEvent, FormControl, Box, InputLabel, TableBody, Typography } from '@mui/material';
import { CountType, DataKV, DataSchema, DataType, DescriptionType, HeaderDataType, HeaderDataTypeInvestment, InvestmentType, LicenseType, NewObjType, PriceType, } from '../dataType';
import { v4 } from 'uuid';
import data from '../data.json'
import { ChangeEvent, useState, useEffect, useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useRef } from 'react';
import { useTableContext } from '../Tables/Tables';
import { styles } from '../style';

const ButtonAdds = () => {
    return (
        <Button variant='contained'
            sx={{
                bgcolor: '#0b4a0b',
                visibility: 'hidden'
            }}>
            <AddBoxIcon />
        </Button>
    )
}


const Rows = ({ defaultRecord, index, recordsDataTable, }:
    {
        defaultRecord: DataType | any,
        index: number,

        recordsDataTable: any,

    }) => {

    const [records] = useState<DataType[]>(data)
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


    useEffect(() => {
        if (otherRow.length === 0) {
            setOtherRow(recordsDataTable)
        }
        if (investment) {
            otherRow[0].description = investment[0].description;
            otherRow[0].licenseType = investment[0].licenseType;
            otherRow[0].price = investment[0].price;
            otherRow[0].count = investment[0].count?.length > 0
                ? investment[0].count.map((a: CountType, index: number) => {

                    if (countInvestment[index]) {
                        return {
                            ...a,
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
                ? investment[0].disCount.map((a: CountType, index: number) => {
                    if (disCountInvestment[index]) {
                        return {
                            ...a,
                            type: disCountInvestment[index],
                            value: disCountInvestment[index]

                        };
                    } else {
                        if (a.type === undefined && a.value === undefined) {
                            return { ...a, type: 0, value: 0 };
                        } else {
                            return { ...a, type: 0, value: 0 };
                        }
                    }
                })
                :
                Array.from(Array(investment[0].description.length)?.keys()).map(
                    () => ({ type: 1, value: 1 }),
                );

            otherRow[0].disCountPrice = investment[0].count?.length > 0
                ? investment[0].count.map((item: any, index: number) => {
                    const price = investment[0].price[index]?.value || 0;
                    const count = item.value || 0;
                    const totalPrice = price * count;
                    const discount = investment[0].disCount[index]?.value || 0;
                    const discountPercent = discount / 100;
                    const discountedPrice = totalPrice * (1 - discountPercent);
                    return discountedPrice;
                }) : Array.from(Array(investment[0].description.length)?.keys()).map(
                    () => ({ type: 1, value: 0 }),
                );
            setFinallyPrice(otherRow[0].discountPrice)
            setShowAddButton(true)
        }
    }, [investment, countInvestment, disCountInvestment, otherRow, name, recordsDataTable]);


    useEffect(() => {
        setName(defaultRecord.name)
        if (typeof defaultRecord.description !== 'object') {
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
            setCount(defaultRecord.count)
            setDisCount(defaultRecord.disCount)
            setFinallyPrice(defaultRecord.disCountPrice)

        }
        else {

            otherRow.map((a: any) => {
                if (typeof a.description === 'object') {
                    const onFilterRecords = otherRow.filter(f => f.name === defaultRecord.name);
                    let newObj: NewObjType = {
                        id: '',
                        name: '',
                        description: [],
                        licenseType: [],
                        price: [],
                        count: [],
                        disCount: [],
                        disCountPrice: [],
                    };
                    onFilterRecords.forEach((f, idx) => {
                        f.description.forEach((a: any) => {
                            newObj.id = f.id;
                            newObj.name = f.name;
                            newObj.description = f.description;
                            newObj.licenseType = f.licenseType;
                            newObj.price = f.price;
                            newObj.disCountPrice = f.price;
                            if (count) {
                                newObj.count = f.count
                            }
                            else {
                                if (f.price && Array.isArray(f.price)) {
                                    if (countInvestment !== undefined) {
                                        newObj.count = f.price.map((d: CountType, idx: number) => {
                                            return {
                                                ...d,
                                                type: 1,
                                                value: 1
                                            };
                                        });
                                    }
                                    else {
                                        newObj.count = f.price.map((d: CountType, idx: number) => {
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
                                    newObj.disCount = f.price.map((d: PriceType) => {
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
                else {
                }
            })



        }
    }, [recordsDataTable, otherRow, investment, name])


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
                    otherRow.map((e: HeaderDataTypeInvestment) => { e.name = selectedName })

                } else {
                    selectedRecords.map((e: any) => {
                        e.description.map((a: any) => {
                            setDescription(a.value)
                        })
                    })
                    otherRow.map((e: HeaderDataTypeInvestment) => {
                        e.name = selectedName
                        e.description = description
                        e.licenseType = selectedRecords.map(record => record.licenseType)[0]
                        e.price = selectedRecords.map(record => record.price)[0]
                        e.count = price
                        e.disCount = '0'
                        e.disCountPrice = price
                    })
                    setInvestment(null)
                    setShowAddButton(false);
                }
                setShowAddButton(selectedName === 'LIS-A ներդնում');
                break;
            case 'description':
                setValue(event.target.value)

                if (name !== 'LIS-A ներդնում') {
                    setDescription(event.target.value);
                }

                otherRow.map((e: HeaderDataTypeInvestment) => {
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

                otherRow.map((e: HeaderDataTypeInvestment) => {
                    e.licenseType = event.target.value
                })
                break;
            case 'price':

                if (name !== 'LIS-A ներդնում') {
                    setIsPricing(+event.target.value)
                }
                otherRow.map((e: HeaderDataTypeInvestment) => {
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
                    otherRow.map((e: HeaderDataTypeInvestment) => {
                        e.count = newValue
                    })
                    break;
                case 'disCount':
                    setDisCount(e.target.value)
                    otherRow.map((e: HeaderDataTypeInvestment) => {
                        e.disCount = newValue
                    })
                    break;
                default:
                    break;
            }

        }
    };

    useEffect(() => {
        otherRow.map((e: any) => {
            const counts = e.count
            const prices = e.price
            const discounts = e.disCount
            const totalPrices = prices * counts
            const discountPercent = discounts / 100
            const discountedPrice = totalPrices * (1 - discountPercent)
            setFinallyPrice(discountedPrice)
            e.disCountPrice = discountedPrice
        })
    }, [otherRow, count, disCount, price])


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

                disCountPrice: e.disCountPrice ? e.disCountPrice.map((change: CountType, idx: number) => {
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
        }
    }, [countInvestment, disCountInvestment, investment, otherRow]);


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
                    count: [...item.count, newPrice],
                    disCount: [...item.disCount, newPrice],
                    disCountPrice: [...item.disCountPrice, 0]
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
                disCount: item.count.filter((count: any, index: number) => index !== idx),
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

    const removeRowById = (id: number,) => {
        setOtherRow((prevRows) => prevRows.filter((_, i) => i !== index));
        tableContext.onRemoved && tableContext.onRemoved(otherRow[0].id)
    };
    const removeAllRow = (event: React.MouseEvent<HTMLButtonElement>) => {
        const rowIndex = Number(event.currentTarget.getAttribute('data-index'));
        removeRowById(rowIndex);
    }

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

                {/* <DeleteIcon onClick={onRemove} sx={{ color: '#a91f1f', cursor: 'pointer' }} /> */}

            </TableRow>
        );
    };

    const LicenseSelect = ({ item, id, index, onLicenseChange }: { item: string, id: number, index: number, onLicenseChange: (newValue: string, index: number) => void }) => {

        const handleLicenseChange = (event: SelectChangeEvent<string>) => {
            const newValue = event.target.value;
            onLicenseChange(newValue, index);
        };

        return (
            <TableRow style={styles.tableRow} sx={{ display: 'flex', }}  >
                <TableCell style={styles.tableCell} sx={{ border: 0 }}>
                    <FormControl fullWidth sx={{
                        height: '54px',
                    }}>

                        <Select
                            labelId="licenseType"
                            id="licenseType"
                            sx={{
                                width: '100%',
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
                            onChange={handleLicenseChange}
                            value={updateValue ?? item}
                        >
                            <MenuItem value={item} key={(new Date().getMilliseconds())}> {item}</MenuItem>
                            {records
                                .filter((license: any) => license.name === 'LIS-A ներդնում')
                                .flatMap((license: any) => license.licenseType)
                                .map((e: DescriptionType, idx: number) => (
                                    <MenuItem key={idx} value={e.value}>
                                        {e.value}
                                    </MenuItem>
                                ))}
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
            <TableRow sx={{ height: '54px' }} style={styles.tableRow}>
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
                    value={updateValue ?? item}
                    placeholder={item}
                    onChange={handlePriceChange}
                >
                    <MenuItem value={item}> {item}</MenuItem>

                    {
                        records
                            .filter((price: any) => price.name === 'LIS-A ներդնում')
                            .flatMap((prices: any) => prices.price)
                            .map((e: DescriptionType, idx: number) => (
                                <MenuItem key={idx} value={e.value}>
                                    {e.value}
                                </MenuItem>
                            ))
                    }
                </Select>
            </TableRow>


        );
    };

    return (

        <TableRow sx={{ bgcolor: rowColor }}>
            {/* delete checkbox */}

            <TableCell sx={{ padding: 0 }}>
                <Button onClick={removeAllRow}
                    data-index={index}

                >
                    <DeleteIcon sx={{ color: 'red' }} /></Button>

            </TableCell>


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
                        investment?.map((e: any, index: number) => {
                            return (
                                e?.description.map((item: DescriptionType, idx: number) => {
                                    return (
                                        <TableHead sx={{ width: '100%', display: 'flex' }}>
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
                                        ds.map((e: DescriptionType, idx: number) => (
                                            <MenuItem key={idx} value={e.value}>{e.value} </MenuItem>
                                        ))
                                    )
                                }
                                )}

                            </Select>
                        </FormControl>
                }


                {
                    showAddButton && (
                        <Button variant='contained' onClick={addinRow}
                            sx={{
                                bgcolor: 'primary.main',
                                ':hover': {
                                    bgcolor: 'green'
                                }
                            }}>
                            <AddBoxIcon />
                        </Button>
                    )
                }
            </TableCell>

            {/* --------------------------- license type */}
            <TableCell sx={{ padding: 0, }} >
                {
                    investment ?
                        (
                            investment.map((e: DataType, index: number) => (
                                e.licenseType.map((item: LicenseType, idx: number) => (
                                    <TableHead sx={{ width: '100%', display: 'flex', border: 0, }}>
                                        <LicenseSelect
                                            key={idx}
                                            item={item.value}
                                            id={e.id}
                                            index={idx}
                                            onLicenseChange={LicenseChange}
                                        />
                                    </TableHead>
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

                                {isFilterLicense.map((li: any, index: number) => {
                                    return (
                                        li.map((e: LicenseType, idx: number) => (
                                            <MenuItem key={idx} value={e.value}>{e.value}</MenuItem>
                                        )))
                                }
                                )}
                            </Select>
                        </FormControl>
                }
                {
                    investment ? <ButtonAdds /> : null
                }
            </TableCell>
            <TableCell sx={{ padding: 0 }} >
                {investment ? (
                    investment.map((e: any, index: number) => (
                        e.count && e.count.length !== 0 ? (
                            e.count.map((item: any, idx: number) => (
                                <TableRow key={idx} style={styles.tableRow} sx={{}}>
                                    <TextField
                                        key={idx}
                                        id="outlined-basic"
                                        variant="outlined"
                                        type='number'
                                        value={countInvestment[idx] !== undefined ? countInvestment[idx] : (item?.value)}
                                        name='count'
                                        onChange={(event) => handleInputs(event, 'count', idx)}
                                        sx={{
                                            border: 'none',
                                            "& fieldset": { border: 'none' },
                                            height: '54px'
                                        }}
                                    />
                                </TableRow>
                            ))
                        ) : (
                            e.description.map((item: any, idx: number) => (
                                <TableRow key={idx} style={styles.tableRow}>
                                    <TextField
                                        key={idx}
                                        id="outlined-basic"
                                        variant="outlined"
                                        type='number'
                                        value={countInvestment[idx] !== undefined ? countInvestment[idx] : '1'}
                                        name='count'
                                        onChange={(event) => handleInputs(event, 'count', idx)}
                                        sx={{
                                            border: 'none',
                                            "& fieldset": { border: 'none' },
                                            height: '54px'
                                        }}
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
                        sx={{
                            border: 'none',
                            "& fieldset": { border: 'none' },
                            height: '54px'
                        }}
                    />
                )}
                {investment && (
                    <ButtonAdds />
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
                    investment ? <ButtonAdds /> : null
                }
            </TableCell>

            {/* --------------------------- price */}

            <TableCell sx={{ padding: 0 }}>
                {investment ? (
                    investment.map((e: any, index: number) => {

                        return (
                            e.disCount && e.disCount.length !== 0 ? (
                                e.disCount.map((item: any, idx: number) => (
                                    <TableRow key={idx} style={styles.tableRow}>
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            value={disCountInvestment[idx] !== undefined ? disCountInvestment[idx] : (item?.value ?? '0')}
                                            name='disCount'
                                            type='number'
                                            onChange={(event) => handleInputs(event, 'disCount', idx)}
                                            sx={{
                                                border: 'none',
                                                "& fieldset": { border: 'none' },
                                                height: '54px'
                                            }}
                                        />
                                    </TableRow>
                                ))
                            ) : (
                                e.description.map((item: any, idx: number) => (
                                    <TableRow key={idx}>
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            value={disCountInvestment[idx] !== undefined ? disCountInvestment[idx] : '0'}
                                            name='disCount'
                                            type='number'
                                            onChange={(event) => handleInputs(event, 'disCount', idx)}
                                            sx={{
                                                border: 'none',
                                                "& fieldset": { border: 'none' },
                                                height: '54px'
                                            }}
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
                        sx={{
                            border: 'none',
                            "& fieldset": { border: 'none' },
                            height: '54px'
                        }}
                    />
                )}
                {investment ? (
                    <ButtonAdds />
                ) : null}
            </TableCell>
            {/* ---------------------------- zexj */}

            <TableCell sx={{ padding: 0 }}>
                {investment ? (
                    investment.map((e: any, index: number) => (
                        e.disCountPrice ? (
                            e.disCountPrice.map((item: any, idx: number) => (
                                <TableRow
                                    sx={{ display: 'flex', alignItems: 'center', }}
                                    key={idx}
                                    style={styles.tableRow}>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        value={typeof item === 'string' || typeof item === 'number' ? (
                                            item
                                        ) : (
                                            <span>Invalid Data</span>
                                        )}



                                        sx={{
                                            border: 'none',
                                            "& fieldset": { border: 'none' },
                                            height: '54px'
                                        }}
                                    />
                                    <DeleteIcon onClick={() => removeItem(item, idx)}
                                        sx={{ color: 'black', cursor: 'pointer' }} />
                                </TableRow>
                            ))
                        ) : 0))
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
                {investment ? (
                    <ButtonAdds />
                ) : null}
            </TableCell>
            {/* --------------------------- price */}



        </TableRow>

    );
};
export default Rows;