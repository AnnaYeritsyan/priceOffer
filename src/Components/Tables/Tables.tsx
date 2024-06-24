import { Button, Table, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, SelectChangeEvent, FormControl, Box, InputLabel, TableBody, Alert } from '@mui/material';
import Rows from '../Rows/Rows';
import data from '../data.json';
import { useState, createContext, useContext, useEffect } from 'react';
import {  DataType } from '../dataType';
import Header from '../Header/Header';
import axios from 'axios'
import Alerts from './Alerts';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import Blank_Generator from '../Blank-Generator/Blank-Generator';
import TextField from '@mui/material/TextField';

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
    const [isPrinting, setIsPrinting] = useState<boolean>(false);
    const [commentValue, setCommentValue] = useState<string>('')
    const [headerData, setHeaderDate] = useState<any>(
        {
            customer: '',
            version: ''
        }
    )

    const selectCustomerValue = (items: any) => {
        setCustomer(items.client)
        setVersion(items.version)
    }
    const onDate = (items: any) => {
        setStart(items.startDate)
        setEnd(items.endDate)
    }

    useEffect(() => {
        setHeaderDate({ customer: customer, version: version })
        setRecords([])
    }, [customer, version])

    const onRemoved = (tablerow: number) => {
        //amboxj datan avelacvac- idin stugel ete havasar e durs hanel datan toxel miayn
        // nranq vory vor havasar chi 
        const remainingRecords = records.filter((e: any) => e.id !== tablerow);
        setRecords([]);
        setTimeout(() => {
            setRecords(remainingRecords);
        }, 0);

    };

    const handleAddRow = () => {

        const newRow = {
            id: Math.floor(new Date().getTime() * Math.random()),
            name: '',
            description: '',
            licenseType: '',
            price: 0,
            disCount: 0,
            count: 1,
            disCountPrice: 0,
            
        };

        setRecords((prevRecords: any) => [...prevRecords, newRow]);

        setDates(prevDates => [...prevDates, getValues]);
    }



    const handleSave = async () => {

        if ((customer && version) || customer) {
            const newClientRecord = {
                name: customer,
                versiondata: {
                    version,
                    date: {
                        start: start,
                        end: end
                    },
                    comment:commentValue,
                    records
                }
            };
         
            try {
                await axios.post('http://localhost:3004/', { newClientRecord });
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
                    if (clientData) {
                        const versionData = clientData.versions.find((v: any) => v.version === version);
                        if (versionData) {
                            setRecords(versionData.records);
                            setOtherRow(versionData.records.map((e: any) => e.description));
                            setCommentValue(versionData.comment)
                        } else {
                            setRecords([]);
                            setCommentValue('')
                        }
                    } else {
                        setRecords([]);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, [customer, version]);

 
    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentValue(event.target.value);
    };
    const componentRef = useRef(null);

    return (
        <TableContext.Provider value={{
            onRemoved,
            onChange: (value) => {
                if (!value) {
                    return;
                }

                const recordIndex = records.findIndex(record => record.id === value.id)
                if (recordIndex >= 0) {
                    records[recordIndex] = value
                    setRecords([...records])
                }
            }
        }}>
            <Box >
                <Box sx={{ display: 'flex', alignItems: 'center', margin: '25px 0px' }}>
                    <Header selectCustomerValue={selectCustomerValue} onDate={onDate} />

                    <ReactToPrint
                        trigger={() => <Button variant='contained'><PictureAsPdfIcon /></Button>}
                        content={() => componentRef.current}
                    />

                </Box>
                <Box sx={{ display: 'none' }}>
                    <Box ref={componentRef} >
                        <Blank_Generator headerData={headerData} commentValue={commentValue} />
                    </Box>
                </Box>

                <TableContainer component={Paper} sx={{ display: "flex", justifyContent: 'center', }} >
                    <Table>
                        <TableHead>
                            <TableRow >
                                <TableCell align='center'
                                    sx={{
                                        fontWeight: 'bold',
                                        padding: '0px'
                                    }}></TableCell>
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

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                records.map((data, idx) => {

                                    return (
                                        <Rows
                                            defaultRecord={data}
                                            key={idx}
                                            index={idx}
                                            recordsDataTable={records}

                                        />
                                    )
                                }
                                )}


                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{ marginTop: '25px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='outlined' onClick={handleAddRow} sx={{ mr: '5px' }} >Ստեղծել նորը</Button>
                <Button variant='contained' onClick={handleSave} >Պահպանել</Button>
            </Box>

            {showAlert && (
                <Alerts showAlert={showAlert} />
            )}
            <TextField
                id="standard-multiline-static"
                label="Լրացուցիչ տեղեկատվություն"
                multiline
                sx={{ width: '50%' }}
                variant="standard"
                value={commentValue}
                onChange={handleCommentChange}
            />
        </TableContext.Provider>
    );
};
export default Tables;
