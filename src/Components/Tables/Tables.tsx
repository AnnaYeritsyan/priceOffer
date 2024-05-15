import { Button, Table, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, SelectChangeEvent, FormControl, Box, InputLabel, TableBody } from '@mui/material';
import Rows from '../Rows/Rows';
import data from '../data.json';
import { useState, createContext, useContext, useEffect } from 'react';
import { DataRow, DataSchema, DataType } from '../dataType';
import Header from '../Header/Header';
import axios from 'axios'
const TableContext = createContext<{
    onChange?: (value: any) => void;
    onRemoved?: (tablerow: any) => void;
}>({})

export function useTableContext() {
    return useContext(TableContext)
}

const Tables = () => {
    const [records, setRecords] = useState<DataType[]>([])
    const [customer, setCustomer] = useState<any>()
    const [version, setVersion] = useState<any>()
    const [dates, setDates] = useState<any[]>([]);
    const [getValues, setGetValues] = useState<any[]>([])
    const [remain, setRemain] = useState<any[]>([])
    const [otherRow, setOtherRow] = useState<DataType[]>([]);

    const selectCustomerValue = (items: any) => {
        // console.log(items)
        setCustomer(items.client)
        setVersion(items.version)
    }
    const onRemoved = (tablerow: number) => {
        // console.log('Removed', tablerow);
        // console.log(records)

        //amboxj datan avelacvac- idin stugel ete havasar e durs hanel datan toxel miayn
        // nranq vory vor havasar chi 

        const remainingRecords = records.filter((e: any) => e.id !== tablerow);
        // console.log('=======A Remaining Records:', remainingRecords);

        setRecords(remainingRecords);

    };
    // console.log(remain)
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
        console.log(records);
        

        setDates(prevDates => [...prevDates, getValues]);
        // console.log(dates)
    }


    const handleSave = async () => {

        if (records.length > 0) {
            const newClientRecord = {
                client: customer,
                version: version,
                records
            };
            try {
                const response = await axios.post('http://localhost:3004/', { newClientRecord });
                console.log(response.data.message);
            } catch (error) {
                console.error('Failed to save data:', error);
            }
        }
        else {
            console.log('else ', records);

        }


    };

    useEffect(() => {
        // console.log('======C', records)
    }, [records])

    useEffect(() => {
 // TODO: Call API to get current saved JSON data, and update records state as initial state.
        // ...
        setRecords([])
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3004/');
                console.log(response.data.data)
                setRecords(response.data.data.records);
                console.log(records)
                setOtherRow([response.data.data.defaultRecord]);

                console.log(otherRow, 'get')
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();

        // Clean up function to cancel any pending requests if the component unmounts
        // return () => { };
       
    }, [])
    // console.log(otherRow)
    return (
        <TableContext.Provider value={{
            onRemoved: onRemoved,
            onChange: (value) => {

                // console.log(value, records)
                if (!value) {
                    console.error('Value is undefined.');
                    return;
                }

                // console.log(value, records)

                const recordIndex = records.findIndex(record => record.id === value.id)
                if (recordIndex >= 0) {
                    records[recordIndex] = value
                    setRecords([...records])
                    // console.log(records)
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

                            {
                               
                            records?.map((data, idx) =>{
                                // console.log(data)
                                return (
                                  <Rows
                                    defaultRecord={data}
                                    key={idx}
                                    index={idx}
                                    databaseData={setOtherRow}
     

                                    />
                            )  
                                
                            }
                              )  }

                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant='contained' onClick={handleSave}>Պահպանել</Button>
            </Box>
        </TableContext.Provider>
    );
};
export default Tables;