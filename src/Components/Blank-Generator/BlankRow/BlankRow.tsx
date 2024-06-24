import { TableRow, TableCell, Box } from "@mui/material";
import { DescriptionType, HeaderDataType, LicenseType } from "../../dataType";
import { useState, useEffect } from "react";

interface Props {
  tableData:  any[];
  headerData:any
}

const cellStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxSizing: 'border-box',
  width: '100%',
  padding: '6px',
  // fontSize: '13px',
  fontSize:'3mm'
};

const tableCellStyle = {
  padding: 0,
  border: '1px solid black',
};

const BlankRow: React.FC<Props> = ({ tableData , headerData}) => {

const [vuidPrice, setVuidPrice] = useState<number | null>(null);

  useEffect(() => {
    setVuidPrice(null)
    const vuidItem = tableData?.find((e: any) => e.name === 'VUID');
    if (vuidItem) {
      setVuidPrice(parseFloat(vuidItem.disCountPrice));
    }
  }, [tableData, headerData]);

  const totalPriceSum = tableData?.reduce((acc, data) => {
    const prices = Array.isArray(data.disCountPrice) ? data.disCountPrice : [data.disCountPrice];
    const sum = prices.reduce((sumAcc: number, price: any) => sumAcc + parseFloat(price), 0);
    return acc + sum;
  }, 0);

  const isOnlyVUID = tableData?.every(data => data.name === 'VUID');
  const formattedFinalTotalPrice = new Intl.NumberFormat().format(isOnlyVUID ? vuidPrice || 0 : (totalPriceSum - (vuidPrice || 0)));

  return (
    <>
      {tableData?.map((data, index) => (
        <TableRow key={index} sx={{ border: '1px solid black' }}>
          <TableCell sx={{ ...tableCellStyle, textAlign: 'center' }}>{data.name}</TableCell>
          <TableCell sx={tableCellStyle}>
            {Array.isArray(data.description) ? (
              data.description.map((desc:DescriptionType, idx: number) => (
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
              data.licenseType.map((license: LicenseType, idx: number) => (
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
  
      {
        vuidPrice !== null ?
         <TableRow sx={{ border: '1px solid black' }}>
        <TableCell colSpan={3} sx={{ border: '1px solid black',textAlign:'end',padding:0 , pr:'5px'  }}>(Օգտագործման լիցենզիա) Տարեկան լիցենզիայի վճարը՝</TableCell>
       <TableCell sx={{ border: '1px solid black',padding:0, textAlign:'center'  }}>{vuidPrice}</TableCell> 
      </TableRow> :null
      } 
      <TableRow sx={{ border: '1px solid black',  }}>
        <TableCell colSpan={3}sx={{ border: '1px solid black', textAlign:'end',padding:0 , pr:'5px'}}>(Ներդրման պայմանագիր) Միանվագ վճարը՝</TableCell>
        <TableCell sx={{ border: '1px solid black',padding:0 , textAlign:'center' }} >{formattedFinalTotalPrice}</TableCell>
      </TableRow>
    </>
  );
};

export default BlankRow;
