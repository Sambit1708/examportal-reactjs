import * as React from 'react';
import Box from '@mui/material/Box';
import SideBar from '../../components/SideBar';
import { Card, CardActions, CardContent, CardHeader, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from '@mui/material';
import './assets/AdminStyle.css'
import ResultService from '../../services/ResultService';
import Swal from 'sweetalert2';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import QuizIcon from '@mui/icons-material/Quiz';
import CategoryIcon from '@mui/icons-material/Category';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Chart from 'react-apexcharts'
import ApexCharts from 'apexcharts'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function AdminDashboard() {

  var options = {
    series: [{
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61]
  }, {
    name: 'Revenue',
    data: [76, 85, 101, 98, 87]
  }, {
    name: 'Free Cash Flow',
    data: [35, 41, 36, 26, 45]
  }],
    chart: {
    type: 'bar',
    height: 300
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '70%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },
  
  fill: {
    opacity: 1
  },
 
};

  

  const [results, setResults] = React.useState([])

  const fecthRecentResult = () => {
    ResultService.getRecentResult().then((result) => {
      const newData = result.data;
      setResults(newData)
    }).catch((error) => {
      Swal.fire("Something went wrong!", `${error}`, "error");
    })
  }

  React.useEffect(() => {
    fecthRecentResult();
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  //FIXME: Need to adjust these with responsive.
  return (
    <React.Fragment>
      <Box height={30} />
      <Box sx={{display: 'flex'}}>
        <SideBar />
          <Box className='flex-dashboard-component' component="main">
            <div className=' d-flex justify-content-between' style={{ width:'850px'}}>
              <Card sx={{ maxHeight: '150px', width: '250px', background: 'linear-gradient(to right, #eb3349, #f45c43)'}}>
                <CardHeader title={(<div style={{color:'#fff', fontSize:'1.2em', fontWeight:'bold', textTransform:'uppercase'}}>150+</div>)} />
                  <CardContent>
                    <Typography sx={{color:'#fff', textTransform:'uppercase', letterSpacing:'1px' }} >User</Typography>
                    <div style={{margin:'-80px 0 0 120px', color: 'rgba(0, 0, 0, 0.2)'}}>
                      <PersonAddAlt1Icon sx={{fontSize:'6em'}} />
                    </div>
                  </CardContent>
                  <CardActions sx={{ height: '25px',marginTop: '-17px', background:'rgba(0,0,0, 0.1)'}}>
                    <Typography sx={{color:'#fff', fontSize:'13px', margin:'auto',marginTop: '-5px'}} component='div' >
                      <div style={{cursor:'pointer'}}>
                        More Info<ArrowCircleRightIcon sx={{fontSize:'1.5em', marginLeft:'1px'}} />
                      </div>
                    </Typography>
                </CardActions>
              </Card>
              <Card sx={{ maxHeight: '150px', width: '250px', backgroundColor: '#32de84' }}>
                <CardHeader title={(<div style={{color:'#fff', fontSize:'1.2em', textTransform:'uppercase', fontWeight:'bold' }}>150+</div>)} />
                <CardContent>
                  <Typography sx={{color:'#fff', textTransform:'uppercase', letterSpacing:'1px' }} >Category</Typography>
                  <div style={{margin:'-80px 0 0 120px', color: 'rgba(0, 0, 0, 0.2)'}}>
                    <CategoryIcon sx={{fontSize:'6em'}} />
                  </div>
                </CardContent>
                <CardActions sx={{ height: '25px',marginTop: '-17px', background:'rgba(0,0,0, 0.1)'}}>
                    <Typography sx={{color:'#fff', fontSize:'13px', margin:'auto',marginTop: '-5px'}} component='div' >
                      <div style={{cursor:'pointer'}}>
                        More Info<ArrowCircleRightIcon sx={{fontSize:'1.5em', marginLeft:'1px'}} />
                      </div>
                    </Typography>
                </CardActions>
              </Card>
              <Card sx={{ maxHeight: '150px', width: '250px', background: 'linear-gradient(to right, #36d1dc , #5b86e5)' }}>
                <CardHeader title={(<div style={{color:'#fff', fontSize:'1.2em', textTransform:'uppercase', fontWeight:'bold' }}>150+</div>)} />
                <CardContent>
                  <Typography sx={{color:'#fff', textTransform:'uppercase', letterSpacing:'1px' }} >Quiz</Typography>
                  <div style={{margin:'-80px 0 0 120px', color: 'rgba(0, 0, 0, 0.2)'}}>
                    <QuizIcon sx={{fontSize:'6em'}} />
                  </div>
                </CardContent>
                <CardActions sx={{ height: '25px',marginTop: '-17px', background:'rgba(0,0,0, 0.1)'}}>
                    <Typography sx={{color:'#fff', fontSize:'13px', margin:'auto',marginTop: '-5px'}} component='div' >
                      <div style={{cursor:'pointer'}}>
                        More Info<ArrowCircleRightIcon sx={{fontSize:'1.5em', marginLeft:'1px'}} />
                      </div> 
                    </Typography>
                </CardActions>
              </Card>
            </div>
            <div className=''>
              <Card sx={{ height: '550px',width: '350px', background: '#fff'}}>
                <CardHeader title=<b>{'ANALYTICS'}</b> />
                <CardContent>
                  <Chart
                    type='donut'
                    width={300}
                    height={300}
                    series={[45, 67, 89, 34, 43]}
                    options={{
                      labels:['USA', 'China', 'Russia', 'India', 'UK'],
                      dataLabels: {
                        enabled:false
                      }
                    }}
                  />
                <div id='chart'></div>
                </CardContent>
              </Card>
            </div>

            <Container sx={{ margin:'-360px 0 0 -20px'}}>
              <Typography variant='h5' component='div' sx={{ fontWeight:'bold', marginBottom:'5px '}}>Recent&nbsp;Quiz Results</Typography>
              <TableContainer sx={{ width: 800 }} component={Paper}>
                <Table sx={{ width: 800 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Quiz Title</StyledTableCell>
                      <StyledTableCell align="right">UserName</StyledTableCell>
                      <StyledTableCell align="right">Total Question</StyledTableCell>
                      <StyledTableCell align="right">Attempted</StyledTableCell>
                      <StyledTableCell align="right">Correct</StyledTableCell>
                      <StyledTableCell align="right">Total Mark</StyledTableCell>
                      <StyledTableCell align="right">Maximum mark</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.map((row) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                          {row.quiz.title}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.user.userName}</StyledTableCell>
                        <StyledTableCell align="right">{row.quiz.noOfQuestions}</StyledTableCell>
                        <StyledTableCell align="right">{row.attempted}</StyledTableCell>
                        <StyledTableCell align="right">{row.correct}</StyledTableCell>
                        <StyledTableCell align="right">{Number(row.mark).toFixed(2)}</StyledTableCell>
                        <StyledTableCell align="right">{row.quiz.maxMark}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Box>
      </Box>

    </React.Fragment>      
    
  );
}
