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
    const [start, setStart] = useState<any>('')
    const [end, setEnd] = useState<any>('')
    //console.log(records)

    const selectCustomerValue = (items: any) => {
        setCustomer(items.client)
        setVersion(items.version)
    }
    const onDate = (items: any) => {
        setStart(items.startDate)
        setEnd(items.endDate)

    }



    const onRemoved = (tablerow: number) => {
        //amboxj datan avelacvac- idin stugel ete havasar e durs hanel datan toxel miayn
        // nranq vory vor havasar chi 
        const remainingRecords = records.filter((e: any) => e.id !== tablerow);
        setRecords(remainingRecords);
    };
// //console.log(remain)
const handleAddRow = () => {

    const newRow = {
        id: Math.floor(new Date().getTime() * Math.random()),
        name: '',
        description: '',
        type: '',
        price: 0,
        disCount: 0,
        count: 0,
        disCountPrice: 0
    };

    setRecords((prevRecords: any) => [...prevRecords, newRow]);
    setDates(prevDates => [...prevDates, getValues]);
}



const handleSave = async () => {
    if (customer && version) {
        const newClientRecord = {
            name: customer,
            versiondata: {
                version,
                date: {
                    start: start,
                    end: end
                },
                records
            }
        };
        try {
            const response = await axios.post('http://localhost:3004/', { newClientRecord });
            console.log(response.data);
        } catch (error) {
            console.error('Failed to save data:', error);
        }
    }
};

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3004/');
            const clientsData = response.data.data;
// stanum em {sgl:{},kean:{}}
            if (customer && version) {
                const clientData = clientsData[customer];
                for (let i in clientsData) {
                    console.log(i)
                    if (i === customer) {
                        console.log(clientData.versiondata)
                        const versionData = clientData.versions.find((v: any) => v.version === version);
                        setRecords(versionData.records);
                        console.log(versionData.records)
                        let versionDataDescription = versionData.records
                        versionDataDescription.map((e:any)=>{
                            console.log(e)
                            setOtherRow(e.description)
                        })
                    }
                }
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };
    fetchData();
}, [customer, version]);

return (
    <TableContext.Provider value={{
        onRemoved,
        onChange: (value) => {

            // //console.log(value, records)
            if (!value) {
                //console.error('Value is undefined.');
                return;
            }

            // //console.log(value, records)

            const recordIndex = records.findIndex(record => record.id === value.id)
            if (recordIndex >= 0) {

                records[recordIndex] = value
                setRecords([...records])
                // //console.log(records)
            }
            //setRecords((prevRecords: any) => [...prevRecords, value]);
            // Write something to update
        }
    }}>
        <Box >
            <Box sx={{ display: 'flex', alignItems: 'center', margin: '25px 0px' }}>
                <Header selectCustomerValue={selectCustomerValue} onDate={onDate} />
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
                            records.map((data, idx) => {
                                //console.log(records)


                                return (
                                    <Rows
                                        defaultRecord={data}
                                        key={idx}
                                        index={idx}
                                        databaseData={otherRow}
                                        recordsDataTable={records}

                                    />
                                )

                            }
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
