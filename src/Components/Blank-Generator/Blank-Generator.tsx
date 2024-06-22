import { Box, Button, Typography } from "@mui/material";
import logo from '../../accets/img/amas.png'
import building from '../../accets/img/building.png'
import mail from '../../accets/img/letter.png'
import location from '../../accets/img/location.png'
import call from '../../accets/img/call.png'



import BlankTable from "./BlankTable/BlankTable";
import { DataType, HeaderDataType } from "../dataType";
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';


interface ApiResponse {
  data: any[];
}
const Blank_Generator = ({ headerData }: { headerData: HeaderDataType }) => {
  const [records, setRecords] = useState<any[]>([]);
  const [dataTime, setDataTime] = useState<{ start: string, end: string }>()
  const [tableData, setTableData] = useState<any>()


  const fetchData = async () => {
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get('http://localhost:3004/');
      const responseData = response.data;
      setRecords(responseData.data);
      console.log(responseData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    if (records.length !== 0) {
      for (const key in records) {
        if (key === headerData.customer) {
          records[key].versions.map((e: any) => {
            if (e.version === headerData.version) {
              setTableData(e.records);
              setDataTime({
                start: formatDate(e.date.start),
                end: formatDate(e.date.end)
              });
            }
          });
          break;
        }
      }
    }
  }, [headerData, records]);

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
  };




  return (
    <Box sx={{ margin: '70px' }}>
      <Box>
        <Box sx={{ display: 'flex', width: '100%', }}>

          <Typography component={'div'}>
            <img src={logo} width={'60px'} height={'92px'} />
          </Typography>
          <Box sx={{ display: "flex", width: '100%', justifyContent: "space-between", flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: "flex", alignItems: 'center' }}>
                  <img src={building} />
                  <Typography component={'span'} color={'#2C3F54'}>  «ԱՄԱՍ» ՍՊԸ</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: 'center', mt: '5px' }}>
                  <img src={mail} />
                  <Typography component={'span'} color={'#2C3F54'} >info@amas.am</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                <Box sx={{ display: "flex", alignItems: 'center', mt: '5px' }}>
                  <img src={location} />
                  <Typography component={'span'} color={'#2C3F54'}> Տիչինայի փ․ 98, ք․ Երևան, ՀՀ</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: 'center' }}>
                  <img src={call} />
                  <Typography component={'span'} color={'#2C3F54'}>+374 91 423 037</Typography>
                </Box>
              </Box>

            </Box>
            <Box sx={{ border: '2px solid #2C3F54' }}></Box>
          </Box>
        </Box>
        <Typography component={'p'} sx={{ width: '100%', textAlign: 'center', fontSize: '24px' }}>
          Գնային առաջարկ
        </Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Typography component={'span'}>
            Պատվիրատու: {headerData.customer}
          </Typography>
          <Typography component={'span'} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component={'span'}>Ներկայացման օր:{dataTime?.start}</Typography>
            <Typography component={'span'}>Առաջարկը գործում է ﬕնչև:{dataTime?.end} </Typography>
          </Typography>
        </Box>

      </Box>
<Box sx={{display: "flex", flexDirection: 'column', justifyContent: 'space-between', }}>


      <BlankTable tableData={tableData} />
      <Box sx={{mt:'1cm'}}>


        <Box fontSize={'13px'} >
          <b> Ներդրման աշխատանքների տևողություն՝</b>առավելագույնը 2 աﬕս:  </Box>
        <Box fontSize={'13px'}>
          <b>Սույն գնային առաջարկի ﬔջ ներառված չեն՝</b> անխափան սնուցման սարքեր, համակարգիչներ, տպիչներ, սերվեր, բարկոդ սկաներներ:
        </Box>

      </Box>
      <Box sx={{ position: 'absolute', top: '90%', width: '83%', }}>
        <Box sx={{
          border: '2px solid #2C3F54', display: 'flex',
          justifyContent: 'center'
        }}>
        </Box>
        <Typography color={'#2C3F54'}>www.amas.am </Typography>
      </Box>
      </Box>
    </Box>
  );
};
export default Blank_Generator;