import { Table, TableCell, TableContainer, TableHead, TableRow, Paper, TableBody } from '@mui/material';
import BlankRow from '../BlankRow/BlankRow';

const tableCellStyle = {
  fontSize: '11px',
  fontWeight: 'bold',
  border: '1px solid black',
  borderLeft:'0',
  borderTop:'0',
  padding: '0px'
};

const tableHeadStyle = {
  bgcolor: '#C5D9F0'
};

const tableContainerStyle = {
  border: '1px solid black'
};

const BlankTable = ({ tableData, headerData }: { tableData: any, headerData:any }) => {
  return (
    <div>
      <TableContainer component={Paper} sx={{ border: 'none', boxShadow: 'none' }} >
        <Table sx={tableContainerStyle}>
          <TableHead>
            <TableRow sx={tableHeadStyle}>
              <TableCell align='center' sx={tableCellStyle}>Անվանում</TableCell>
              <TableCell align='center' sx={tableCellStyle}>Նկարագրություն</TableCell>
              <TableCell align='center' sx={tableCellStyle}>Լիցենզիայի տեսակ</TableCell>
              <TableCell align='center' sx={{ ...tableCellStyle, borderRight: 'none' }}>Գին (ՀՀ Դրամ)</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <BlankRow tableData={tableData} headerData={headerData}/>
          
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlankTable;
