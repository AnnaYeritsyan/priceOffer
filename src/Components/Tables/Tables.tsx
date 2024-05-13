import { Button, Table, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, SelectChangeEvent, FormControl, Box, InputLabel, TableBody } from '@mui/material';
import Rows from '../Rows/Rows';
import data from '../data.json';
import { useState, createContext, useContext, useEffect } from 'react';
import { DataRow, DataSchema, DataType } from '../dataType';
import Header from '../Header/Header';
import axios from 'axios'
const TableContext = createContext<{
    onChange?: (value: any) => void;
    getRemoved?: (tablerow: any) => void;
}>({})

export function useTableContext() {
    return useContext(TableContext)
}

const Tables = () => {
    const [records, setRecords] = useState<DataType[]>([])
    const [customer, setCustomer] = useState<string>()
    const [dates, setDates] = useState<any[]>([]);
    const [getValues, setGetValues] = useState<any[]>([])
    const [remain, setRemain] = useState<any[]>([])
    const selectCustomerValue = (items: string) => {

        setCustomer(items)
    }
    const getRemoved = (tablerow: number) => {
        console.log('Removed', tablerow);
        console.log(records)

        //amboxj datan avelacvac- idin stugel ete havasar e durs hanel datan toxel miayn
        // nranq vory vor havasar chi 
       
        const remainingRecords = records.filter((e: any) => e.id !== tablerow); 
        console.log('=======A Remaining Records:', remainingRecords); 
    
        setRecords(remainingRecords);
      
    };
  console.log(remain)
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
        console.log('click');
        console.log(remain);
    
        if (records.length > 0) {
            console.log(records)
            console.log('=======B', remain)
            const newClientRecord = {
            client: customer,
            version: 1,
            records
        };
        console.log(newClientRecord);
        try {
            const response = await axios.post('http://localhost:3004/', { newClientRecord });
            console.log(response.data.message);
        } catch (error) {
            console.error('Failed to save data:', error);
        }
        }
        else{
            console.log('else ', records);
            
        }
    
      
        console.log(records);
    
        
    };

    useEffect(() => {
        console.log('======C', records)
    }, [records])

    useEffect(() => {
        // Temporary code, you have to call API to get saved JSON data from API.
        setRecords([])
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3004/');
                console.log(response.data.data)
                setRecords(response.data.data.records);
                console.log(records, 'get')
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();

        // Clean up function to cancel any pending requests if the component unmounts
        return () => {};
        // TODO: Call API to get current saved JSON data, and update records state as initial state.
        // ...
    }, [])
    
    return (
        <TableContext.Provider value={{
            getRemoved: getRemoved
            // (tablerow)=>{
            //     console.log(tablerow)
            //     // petq e uxarkel jnjvac elementi id 
            //    if(tablerow) {
            //     const recordIndex = records.findIndex(record => record.id !== tablerow)
            //     if (recordIndex >= 0) {
            //         records[recordIndex] = tablerow
            //         setRecords([...records])
            //         console.log(records)
            //     }
            //    }

            // }
            ,
            onChange: (value) => {

                console.log(value, records)

                // const recordIndex = records.findIndex(record => record.id === value.id)
                // if (recordIndex >= 0) {
                //     records[recordIndex] = value
                //     setRecords([...records])
                //     console.log(records)

                // }
                if (!value) {
                    console.error('Value is undefined.');
                    return;
                }

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
                                    getRemoved={getRemoved} />
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