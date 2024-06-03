import { Button, Table, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, SelectChangeEvent, FormControl, Box, InputLabel, TableBody, Alert } from '@mui/material';
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
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [headerData, setHeaderDate] = useState<any>(
        {
            customer:'',
            version:''
        }
    )
    //////////console.log(records)

    const selectCustomerValue = (items: any) => {
        setCustomer(items.client)
        setVersion(items.version)
    }
    const onDate = (items: any) => {
        setStart(items.startDate)
        setEnd(items.endDate)

    }

useEffect(()=>{
    setHeaderDate({customer:customer, version:version})

},[customer, version])

    const onRemoved = (tablerow: number) => {
        //amboxj datan avelacvac- idin stugel ete havasar e durs hanel datan toxel miayn
        // nranq vory vor havasar chi 
        const remainingRecords = records.filter((e: any) => e.id !== tablerow);
        setRecords(remainingRecords);
    };
// //////////console.log(remain)
const handleAddRow = () => {

    const newRow = {
        id: Math.floor(new Date().getTime() * Math.random()),
        name: '',
        description: '',
        licenseType: '',
        price: 0,
        disCount: 0,
        count: 1,
        disCountPrice: 0
    };

    setRecords((prevRecords: any) => [...prevRecords, newRow]);
    //console.log(records)
    setDates(prevDates => [...prevDates, getValues]);
}



const handleSave = async () => {
    //console.log(records)
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
        //console.log(newClientRecord)
        try {
            const response = await axios.post('http://localhost:3004/', { newClientRecord });
         ////console.log(response.data);
            setShowAlert(true); 
            setTimeout(() => setShowAlert(false), 2000);
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

            if (customer && version) {
                const clientData = clientsData[customer];
                for (let i in clientsData) {
                    //////console.log(i)
                    if (i === customer) {
                        const versionData = clientData.versions.find((v: any) => v.version === version);
                        setRecords(versionData.records);
                        let versionDataDescription = versionData.records
                        versionDataDescription.map((e:any)=>{
                            setOtherRow(e.description)
                            //console.log(e.licenseType)
                        })
                        //console.log(otherRow, versionData)

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
            if (!value) {
                return;
            }
            
            const recordIndex = records.findIndex(record => record.id === value.id)
            if (recordIndex >= 0) {
                // //console.log(records, 'onchange records')
                records[recordIndex] = value
                setRecords([...records])
            }
            //setRecords((prevRecords: any) => [...prevRecords, value]);
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
                                //////////console.log(records)


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
            <Box sx={{marginTop:'25px'}}>
            <Button variant='contained' onClick={handleSave} sx={{marginLeft:'90%', bgcolor:'green'}}>Պահպանել</Button>
            </Box>
        </Box>
        {showAlert && (
                    <Alert variant="filled" severity="success"
                     sx={{ width: '20%', 
                     position: 'absolute', 
                     bottom: 0,
                     left: 0,
                     animation: showAlert ? 'slideIn 1s forwards' : 'slideOut 1s forwards'
                     }}>
                        Փոփոխությունը պահպանված է
                    </Alert>
                )}
    </TableContext.Provider>
);
};
export default Tables;
