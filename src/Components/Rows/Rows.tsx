
import { Button, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Select, MenuItem, SelectChangeEvent, FormControl, Box, InputLabel, TableBody, Typography } from '@mui/material';
import { DataKV, DataSchema, DataType, DescriptionType, LicenseType, NewObjType, PriceType, RowState } from '../dataType';
import { v4 } from 'uuid';
import data from '../data.json'
import { ChangeEvent, useState, useEffect, useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useRef } from 'react';
import { useTableContext } from '../Tables/Tables';
import { styles } from '../style';



const Rows = ({ defaultRecord, index, databaseData, recordsDataTable, }:
    {
        defaultRecord: DataType,
        index: number,
        databaseData: any,
        recordsDataTable: any,

    }) => {

    const [records, setRecords] = useState<DataType[]>(data)
    const [value, setValue] = useState<string | undefined | number>(undefined)
    const [isFilterDescription, setIsFilterDescription] = useState<string[]>([])
    const [isFilterLicense, setIsFilterLicense] = useState<string[]>([])
    const [licenseState, setLicenseState] = useState<string[]>([])
    const [price, setPrice] = useState<any[]>([])
    const [onePrice, setOnePrice] = useState<any | undefined>()
    const [finalyPrice, setFinalyPrice] = useState<number | undefined>()
    const [showAddButton, setShowAddButton] = useState(false);
    const [investment, setInvestment] = useState<any | any[]>();
    //   const [investment, setInvestment] = useState<NewObjType[]>([]);
    const [updateValue, setUpdateValue] = useState<string | undefined>(undefined)
    const [rowsState, setRowsState] = useState<RowState[]>([{
        count: undefined,
        disCount: undefined,
    }]);
    const selectRef = useRef<HTMLSelectElement>(null);
    const [selectHeight, setSelectHeight] = useState<number>(0);
    const [otherRow, setOtherRow] = useState<any[]>([defaultRecord])
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string | undefined>(undefined)
    const [isInvestmentDescription, setIsInvesmentDescription] = useState<boolean>(false)
    const [keepFilterObject, setKeepFilterObject] = useState<NewObjType | null>(null)   // when select get customer and version
    const [license, setLicense] = useState<any>()
    const [count, setCount] = useState<number | undefined>()
    const [disCount, setDisCount] = useState<number | undefined>()
    const [isPricing, setIsPricing] = useState<number | undefined>()

    //console.log(recordsDataTable, licenseState)
    useEffect(() => {
        // it created description object , if commented lis-A investment also be string 
        if (investment) {
            otherRow[0].description = investment[0].description
            otherRow[0].licenseType = investment[0].licenseType
            otherRow[0].price = investment[0].price
            otherRow[0].count = investment[0].count
            otherRow[0].disCountPrice= investment[0].finallyPrice
            otherRow[0].disCount= investment[0].discount
            console.log(recordsDataTable)
            tableContext.onChange && tableContext.onChange(otherRow[0])
            // const initialRowsState = investment.map(() => ({
            //     count: undefined,
            //     disCount: undefined,
            // }));

            // setRowsState(initialRowsState);
            setShowAddButton(true);
        }
    }, [investment]);

    useEffect(() => {

        setName(defaultRecord.name);
        //console.log(recordsDataTable, 'useeffecti mej================')
        if (typeof defaultRecord.description !== 'object') {
            // console.log(recordsDataTable)
            setDescription(defaultRecord.description);
            const onFilterRecords = records.filter(f => f.name === name);
            const getFilterDescription: any = onFilterRecords.map(f => f.description);
            setIsFilterDescription(getFilterDescription);
            const getFileterLicense:any = onFilterRecords.map(f => f.licenseType);
            setLicense(defaultRecord.licenseType)
            setLicenseState(getFileterLicense)
            const getFilterPrice = onFilterRecords.map(f => f.price);
            // console.log(getFilterPrice)
            setPrice(getFilterPrice)
            setOnePrice(defaultRecord.price)
            
        }
        else {
            const onFilterRecords = records.filter(f => f.name === defaultRecord.name);
            let newObj: NewObjType = {
                id: '',
                name: '',
                description: [],
                licenseType: [],
                price: [],
                count: [],
                discount: [],
                finallyPrice: [],
            };

if(databaseData.length <1){

    onFilterRecords.forEach((f) => {

        f.description.forEach((a) => {
            newObj.id = f.id;
            newObj.name = f.name;
            newObj.description = f.description;
            newObj.licenseType = f.licenseType;
            newObj.price = f.price;
            newObj.finallyPrice = f.price;
            setDescription(databaseData);
            setLicense(databaseData)
           
        });
    });

}
else{
    
    onFilterRecords.forEach((f) => {
        const correspondingRecord = recordsDataTable.find((record:any) => record.name === f.name);

        if (correspondingRecord) {
            newObj.id = f.id;
            newObj.name = f.name;
            newObj.description = correspondingRecord.description;
            newObj.licenseType = correspondingRecord.licenseType;
            newObj.price = correspondingRecord.price;
            newObj.finallyPrice = correspondingRecord.finallyPrice;
            setDescription(correspondingRecord.description);
            setLicense(correspondingRecord.licenseType);
        }
    });

}
            // console.log(onFilterRecords)
            recordsDataTable.forEach((e: any) => {
        
                if (e.name !== 'LIS-A ներդնում') {
            
            
                    setDescription(e.description);
                    setLicense(e.licenseType);
                    setOnePrice((e.price));
                    setCount(e.count);
                    setDisCount(e.disCount);
                    setFinalyPrice(e.disCountPrice);
                
                }
                else{
                    setLicense([])
                 
                }
               
            });

            if (JSON.stringify(keepFilterObject) !== JSON.stringify(newObj)) {
                setKeepFilterObject(newObj);
            }

            const getFilterDescription: any = onFilterRecords.map(f => f.description);
            setIsFilterDescription(getFilterDescription);
          
        }
    }, [recordsDataTable]);


    useEffect(() => {
      
        if (keepFilterObject && Array.isArray(keepFilterObject.description)) {

            setInvestment((prevInvestment: any) => {
                if (JSON.stringify(prevInvestment) !== JSON.stringify([keepFilterObject])) {
                    return [keepFilterObject];
                }
                return prevInvestment;
            });
        }
        else {
       
        }
    }, [keepFilterObject]);

    const tableContext = useTableContext()
    const rowColor = index % 2 === 0 ? '#ffffff' : '#EBFAF1';

    const handleChange = (event: SelectChangeEvent<string>, columnType: 'name' | 'description' | 'licenseType' | 'price' | 'disCount') => {
        setValue(event.target.value)

        switch (columnType) {
            case 'name':
                setName(event.target.value)
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
                setIsPricing(+event.target.value)
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
    const handleInputs = (e: any, nameElemnt: 'count' | 'disCount', rowIndex: number) => {
        const newValue = e.target.value;
        console.log(newValue, count)
       setCount(newValue)
       
       
        if (name === 'LIS-A ներդնում') {
       console.log(count)
    //    otherRow.map((e:any)=>{
    //                 if(rowsState[0].count){
    //       e.count.push(rowsState)
    //     }
            setRowsState(prevState => {
                const newState = [...prevState];
                newState[rowIndex] = {
                    ...newState[rowIndex],
                    [nameElemnt]: newValue,
                };
                return newState;
            });
         console.log(rowsState)
         otherRow.map((e:any)=>{
            if(rowsState[0].count){
  e.count.push(rowsState)
            }
          
         })   

            // setOtherRow((prev:any) => {

            //     const updatedOtherRow = [...prev];
            //     console.log(prev )
                // updatedOtherRow = {
            //         ...updatedOtherRow[rowIndex],
            //         [nameElemnt]: newValue,
                // };
            //     return prev;
            // });    
     
        }
        else{
            console.log('vochinch');
            
        }
    };
    console.log(otherRow)
    useEffect(() => {
        const updatedRows = otherRow.map(e => {
            const prices = Number(e.price);
            const count = Number(e.count);
            const disCount = Number(e.disCount);
            const discountPercent = disCount / 100;

            if (disCount === 0) {
                e.disCountPrice = (prices * count);
            }
            else {
                e.disCountPrice = (prices * count) * (1 - discountPercent);
            }
            return e;
        });

        if (updatedRows.length > 0) {
            setFinalyPrice(updatedRows[0].disCountPrice);
        }
    }, [otherRow]);


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
        if (investment) {
            const newInvestment = investment?.map((item: DataType) => {
                return ({
                    ...item,
                    description: [...item.description, newRow],
                    licenseType: [...item.licenseType, newLicense],
                    price: [...item.price, newPrice],
                }
                )
            });
            setInvestment(newInvestment);
            setRowsState(prevState => [...prevState, { count: undefined, disCount: undefined }]);
        }
    };

// console.log(onePrice, price, isPricing)
    const removeItem = (idToRemove: DescriptionType, idx: number) => {  //created lis-a investment  row
        if (investment) {
            const updatedInvestment = investment.map((item: DataType) => ({
                ...item,
                description: item.description.filter((desc: DescriptionType, index: number) => index !== idx),
                licenseType: item.licenseType.filter((license: LicenseType, index: number) => index !== idx),
                price: item.price.filter((price: PriceType, index: number) => index !== idx),
                count: count,
                disCount:disCount
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

    const DescriptionChange = (newValue: string, index: number) => {

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
     
        if (investment) {
            //console.log(investment)
            const updatedInvestment = investment.map((e: DataType) => ({
                ...e,
                licenseType: e.licenseType.map((change: LicenseType, idx: number) => {
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
                    {/* {
                        value ? '' :
                            <InputLabel id={`license-select-label-${index}`}>Նկարագրություն</InputLabel>

                    } */}
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

                            isFilterDescription.map((description: any, index: number) => (
                                description.map((e: DescriptionType, idx: number) => (
                                    <MenuItem key={idx} value={e.value}>{e.value}</MenuItem>
                                ))
                            ))
                        }
                    </Select>
                </FormControl>
                {/* <Button variant='contained' 
                    sx={{ bgcolor: "#a91f1f" }}> */}
                <DeleteIcon onClick={onRemove} sx={{ color: '#a91f1f', cursor: 'pointer' }} />
                {/* </Button> */}

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
                        {/* {
                            value ? '' :
                                <InputLabel id={`license-select-label-${index}`}>Լիցենզիայի տեսակ</InputLabel>

                        } */}
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
                        investment.map((e: DataType, index: number) => {
                            return (
                                e.description.map((item: DescriptionType, idx: number) => {

                                    return (
                                        <DescriptionSelect
                                            key={idx}
                                            item={item.value}
                                            id={e.id}
                                            index={idx}
                                            onRemove={() => removeItem(item, idx)}
                                            onDescriptionChange={DescriptionChange}
                                        />
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
                                // value={value}
                                value={description ?? name}
                                //   onChange={handleSelectChange}
                                onChange={(e) => handleChange(e as SelectChangeEvent, 'description')}
                            >

                                {isFilterDescription.map((ds: any, index: number) => {
                                    return (
                                        ds.map((e: DescriptionType) => (
                                            <MenuItem key={e.value} value={e.value}>{e.value} </MenuItem>
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
                                license ? '' :
                                    <InputLabel id="demo-simple-select-label">Լիցենզիայի տեսակ </InputLabel>

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
                                value={ license ?? name}
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

            <TableCell sx={{ padding: 0, }} >
                {
                    investment ?
                        (
                            investment?.map((e: DataType, index: number) => {
                                return (
                                    e.description.map((item: DescriptionType, idx: number) => {
                                        return (
                                            <TableRow key={idx}>
                                                <TextField
                                                    key={idx}
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    value={rowsState[idx]?.count || ''}
                                                    name='count'
                                                    onChange={(e) => handleInputs(e, 'count', idx)}
                                                />

                                            </TableRow>
                                        )
                                    })
                                )
                            }
                            )
                        )
                        : <TextField
                            id="outlined-basic"
                            // label="Outlined"
                            variant="outlined"
                            value={rowsState[index]?.count}
                            name='count'
                            onChange={(e) => handleInputs(e, 'count', 0)}
                        />
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
                                // label="գին"
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
                                value={  onePrice ??name}
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
            {/* ---------------------------- zexj */}
            <TableCell sx={{ padding: 0, }}>
                {
                    investment ?
                        (
                            investment.map((e: DataType, index: number) => (
                                e.description.map((item: DescriptionType, idx: number) => (
                                    <TableRow key={idx} sx={{
                                        height: '56px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}>
                                        {finalyPrice}
                                    </TableRow>

                                ))
                            ))
                        ) : <TableRow sx={{
                            height: '56px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {finalyPrice}
                        </TableRow>
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