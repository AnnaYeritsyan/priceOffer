import { Button, Table, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, SelectChangeEvent, FormControl, Box, InputLabel, TableBody } from '@mui/material';
import Rows from '../Rows/Rows';
import data from '../data.json';
import { useState } from 'react';
import { DataRow, DataSchema, DataType } from '../dataType';
import Header from '../Header/Header';


const Tables = () => {
    const [records, setRecords] = useState<DataType[]>([])
    const [newRow, setNewRow] = useState<boolean>(false)
    const [customer, setCustomer] = useState<string>()
    const [allData, setAllData] = useState<DataType[]>(data)
    const selectCustomerValue = (items:string)=>{
console.log(items)
setCustomer(items)
    }
    console.log(records)
    const handleAddRow = () => {
        const newRow = {

            name: '',
            description: '',
            type: '',
            price: 0
        };

        setRecords((prevRecords: any) => [...prevRecords, newRow]);
    }

    const getAllJson = ()=>{
        console.log('alldata')
    }
    const handleSave=()=>{
        console.log('click')
        console.log(records);

    }
    return (
        <Box >
            <Box sx={{display:'flex', alignItems:'center', margin:'25px 0px'}}>
            <Header selectCustomerValue={selectCustomerValue}/>
            <Button variant='contained' onClick={handleAddRow}>+</Button>
            </Box>
            
            <TableContainer component={Paper} sx={{ display: "flex", justifyContent: 'center', }} >
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell align='center'   
                            sx={{
                                fontWeight:'bold', 
                                borderRight:'1px solid  #DEDEDE',
                                padding:'0px'
                            }}
                            >Անվանում</TableCell>
                            <TableCell align='center'
                              sx={{
                                fontWeight:'bold', 
                                borderRight:'1px solid  #DEDEDE',
                                padding:'0px'
                            }}>Նկարագրություն</TableCell>
                            <TableCell align='center'
                              sx={{
                                fontWeight:'bold', 
                                borderRight:'1px solid  #DEDEDE',
                                padding:'0px'
                            }}>Լիցենզիայի տեսակ</TableCell>
                            <TableCell align='center'
                              sx={{
                                fontWeight:'bold', 
                                borderRight:'1px solid  #DEDEDE',
                                padding:'0px'
                            }}>Քանակ</TableCell>
                            <TableCell align='center'
                              sx={{
                                fontWeight:'bold', 
                                borderRight:'1px solid  #DEDEDE',
                                padding:'0px'
                            }}>Գին (ՀՀ Դրամ)</TableCell>
                            <TableCell align='center'
                              sx={{
                                fontWeight:'bold', 
                                borderRight:'1px solid #DEDEDE',
                            }}>Զեղչ</TableCell>
                            <TableCell align='center'
                              sx={{
                                fontWeight:'bold', 
                                borderRight:'1px solid #DEDEDE',
                                padding:'0px'
                            }}>Զեղչված գին (ՀՀ Դրամ)</TableCell>
                            <TableCell align='center'
                              sx={{
                                fontWeight:'bold', 
                                padding:'0px'
                            }}>Խմբագրել</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {records?.map((data, idx) =>
                            <Rows defaultRecord={data} key={idx} index={idx} getAllJson={getAllJson}/>
                        )}
                        
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant='contained' onClick={handleSave}>Պահպանել</Button>
        </Box>
    );
};
export default Tables;