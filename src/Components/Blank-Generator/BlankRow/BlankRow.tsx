import { TableRow, TableCell, Box } from "@mui/material";

interface Props {
  tableData: any[];
}

const cellStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxSizing: 'border-box',
  width: '100%',
  padding: '8px',
  fontSize: '13px',
};

const tableCellStyle = {
  padding: 0,
  border: '1px solid black',
};

const BlankRow: React.FC<Props> = ({ tableData }) => {
  return (
    <>
      {tableData?.map((data, index) => (
        <TableRow key={index} sx={{ border: '1px solid black' }}>
          <TableCell sx={{ ...tableCellStyle, textAlign: 'center' }}>{data.name}</TableCell>
          <TableCell sx={tableCellStyle}>
            {Array.isArray(data.description) ? (
              data.description.map((desc: any, idx: number) => (
                <Box
                  key={idx}
                  sx={{
                    ...cellStyle,
                    borderBottom: idx === data.description.length - 1 ? 'none' : '1px solid black',
                  }}
                >
                  {desc.value}
                </Box>
              ))
            ) : (
              <Box>{data.description}</Box>
            )}
          </TableCell>

          <TableCell sx={tableCellStyle}>
            {Array.isArray(data.licenseType) ? (
              data.licenseType.map((license: any, idx: number) => (
                <Box
                  key={idx}
                  sx={{
                    ...cellStyle,
                    textAlign: 'center',
                    borderBottom: idx === data.licenseType.length - 1 ? 'none' : '1px solid black',
                  }}
                >
                  {license.value}
                </Box>
              ))
            ) : (
              <Box sx={{ textAlign: 'center' }}>{data.licenseType + " " + data.count} սարքի համար</Box>
            )}
          </TableCell>

          <TableCell sx={tableCellStyle}>
            {Array.isArray(data.disCountPrice) ? (
              data.disCountPrice.map((price: any, idx: number) => (
                <Box
                  key={idx}
                  sx={{
                    ...cellStyle,
                    textAlign: 'center',
                    borderBottom: idx === data.disCountPrice.length - 1 ? 'none' : '1px solid black',
                  }}
                >
                  {price}
                </Box>
              ))
            ) : (
              <Box textAlign={"center"}>{data.disCountPrice}</Box>
            )}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default BlankRow;
