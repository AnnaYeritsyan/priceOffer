import { Button, Table, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, SelectChangeEvent, FormControl, Box, InputLabel, TableBody } from '@mui/material';
import Rows from '../Rows/Rows';
import data from '../data.json';
import { useState } from 'react';
import { DataRow, DataSchema, DataType } from '../dataType';


const Tables = () => {
    const [records, setRecords] = useState<DataType[]>([])
    const [newRow, setNewRow] = useState<boolean>(false)
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
    return (
        <Box>
            <Button variant='contained' onClick={handleAddRow}>+</Button>
            <TableContainer component={Paper} sx={{ display: "flex", justifyContent: 'center', }} >
                <Table sx={{ maxWidth: '297mm' }} >
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#C6D9F1' }}>
                            <TableCell align='center'>Անվանում</TableCell>
                            <TableCell align='center'>Նկարագրություն</TableCell>
                            <TableCell align='center'>լիցենզիայի տեսակ</TableCell>
                            <TableCell align='center'>Քանակ</TableCell>
                            <TableCell align='center'>Գին (ՀՀ Դրամ)</TableCell>
                            <TableCell align='center'>Զեղչ</TableCell>
                            <TableCell align='center'>Զեղչված գին (ՀՀ Դրամ)</TableCell>
                            <TableCell align='center'>Խմբագրել</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {records?.map((data, idx) =>
                            <Rows defaultRecord={data} key={idx}/>
                        )}
                        {/* {records.map((data, idx) =>
                <Row
                key={data.id}
                  index={idx}
                  defaultRecord={data}
                  onChange={handleRowChange}
                  schema={schemaList.find(sl => sl.id === data.schemaId)!}
                  onRemoveItem={handleRemoveItem}
                  onRemoveAllRow={() => handleRemoveAllRow(idx)}
                  
                />)
              } */}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
export default Tables;