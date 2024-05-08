import { Button, Table, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, SelectChangeEvent, FormControl, Box, InputLabel, TableBody } from '@mui/material';
import Rows from '../Rows/Rows';
import data from '../data.json';
import { useState, createContext, useContext } from 'react';
import { DataRow, DataSchema, DataType } from '../dataType';
import Header from '../Header/Header';
import axios from 'axios'
const TableContext = createContext<{
    onChange?: (value: any) => void;
    getAllJson?: () => void;
}>({})

export function useTableContext() {
    return useContext(TableContext)
}

const Tables = () => {
    const [records, setRecords] = useState<DataType[]>([])
    const [newRow, setNewRow] = useState<boolean>(false)
    const [customer, setCustomer] = useState<string>()
    const [allData, setAllData] = useState<DataType[]>(data)
    const [dates, setDates] = useState<any[]>([]);
    const [getValues, setGetValues] = useState<any[]>([])
    const [clientRecords, setClientRecords] = useState<{ client: string, version: number, record: DataType }[]>([]);

    const selectCustomerValue = (items: string) => {

        setCustomer(items)
    }

    const getAllJson = () => {

    }
    const handleAddRow = () => {
        const newRow = {
            id: Math.floor(new Date().getTime() * Math.random()),
            name: '',
            description: '',
            type: '',
            price: 0
        };

        setRecords((prevRecords: any) => [...prevRecords, newRow]);
        // console.log(getValues)

        setDates(prevDates => [...prevDates, getValues]);
        // console.log(dates)
    }



    const handleSave = async () => {
        console.log('click')
        console.log(customer)
        const newClientRecord = {
            client: customer, 
            version: 1, 
            record: records 
        };
       console.log(newClientRecord)
        console.log(records)
        try {

            // const response = await axios.post('http://localhost:3004/', { records });
            const response = await axios.post('http://localhost:3004/', { newClientRecord });

            console.log(response.data.message);
        } catch (error) {
            console.error('Failed to save data:', error);
        }

    }
    return (
        <TableContext.Provider value={{
            getAllJson,
            onChange: (value) => {
                console.log(value, records)
                const recordIndex = records.findIndex(record => record.id === value.id)
                if (recordIndex >= 0) {
                    records[recordIndex] = value
                    setRecords([...records])
                    console.log(records)

                }
                //setRecords((prevRecords: any) => [...prevRecords, value]);
                // Write something to update
            }
        }}>
            <Box >
                <Box sx={{ display: 'flex', alignItems: 'center', margin: '25px 0px' }}>
                    <Header selectCustomerValue={selectCustomerValue} />
                    <Button variant='contained' onClick={handleAddRow}>+</Button>
                </Box>

                <TableContainer component={Paper} sx={{ display: "flex", justifyContent: 'center', }} >
                    <Table>
                        <TableHead>
                            <TableRow >
                                <TableCell align='center'
                                    sx={{
                                        fontWeight: 'bold',
                                        borderRight: '1px solid  #DEDEDE',
                                        padding: '0px'
                                    }}
                                >Անվանում</TableCell>
                                <TableCell align='center'
                                    sx={{
                                        fontWeight: 'bold',
                                        borderRight: '1px solid  #DEDEDE',
                                        padding: '0px'
                                    }}>Նկարագրություն</TableCell>
                                <TableCell align='center'
                                    sx={{
                                        fontWeight: 'bold',
                                        borderRight: '1px solid  #DEDEDE',
                                        padding: '0px'
                                    }}>Լիցենզիայի տեսակ</TableCell>
                                <TableCell align='center'
                                    sx={{
                                        fontWeight: 'bold',
                                        borderRight: '1px solid  #DEDEDE',
                                        padding: '0px'
                                    }}>Քանակ</TableCell>
                                <TableCell align='center'
                                    sx={{
                                        fontWeight: 'bold',
                                        borderRight: '1px solid  #DEDEDE',
                                        padding: '0px'
                                    }}>Գին (ՀՀ Դրամ)</TableCell>
                                <TableCell align='center'
                                    sx={{
                                        fontWeight: 'bold',
                                        borderRight: '1px solid #DEDEDE',
                                    }}>Զեղչ</TableCell>
                                <TableCell align='center'
                                    sx={{
                                        fontWeight: 'bold',
                                        borderRight: '1px solid #DEDEDE',
                                        padding: '0px'
                                    }}>Զեղչված գին (ՀՀ Դրամ)</TableCell>
                                <TableCell align='center'
                                    sx={{
                                        fontWeight: 'bold',
                                        padding: '0px'
                                    }}>Խմբագրել</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>

                            {records?.map((data, idx) =>
                                <Rows
                                    defaultRecord={data}
                                    key={idx}
                                    index={idx}
                                    getAllJson={getAllJson} />
                            )}

                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant='contained' onClick={handleSave}>Պահպանել</Button>
            </Box>
        </TableContext.Provider>
    );
};
export default Tables;