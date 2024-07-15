import { Button, Card, CardContent, CardActions, Box, Grid, CircularProgress, Typography } from '@mui/material'
import * as React from 'react'
import ResultService from '../../../services/ResultService'
import Swal from 'sweetalert2'
import NavBar from '../../../components/NavBar'
import { useNavigate } from 'react-router-dom'
import PreLoading from '../../../components/PreLoading'


function AppLogo() {
    return (
        <React.Fragment>
            <b>e<span style={{color:'blue', fontSize:'1.5em'}}>X</span>am</b>portal
        </React.Fragment>
    );
}

const QuizResult = () => {

  const [quizResult, setQuizResult] = React.useState({})
  const navigate = useNavigate()
  const [progressValue, setProgressValue] = React.useState(10)
  const [progressEndValue, setProgressEndValue] = React.useState(100)
  const [name, setName] = React.useState()
  const [quiz, setQuiz] = React.useState()
  const [ preLoading, setPreLoading ] = React.useState(true);

  const fetchResultById = async (id) => {
    try {
        const resultResponse = await ResultService.getResultByQuiz(id);
        if(resultResponse.status === 200) {
            const mark = resultResponse.data.mark
            setProgressEndValue(Math.floor((mark / parseInt(resultResponse.data.quiz.maxMark)) * 100))
            setName(`${resultResponse.data.user.firstName} ${resultResponse.data.user.lastName} `)
            setQuiz(`${resultResponse.data.quiz.title}`)
            setQuizResult(resultResponse.data)
            setPreLoading(false);
        }
        
    } catch(error) {
        Swal.fire("Some thing went wrong!!", `${error}`, "error");
    }
  }

  React.useEffect(() => {
    var href = window.location.href
    fetchResultById(href.slice(href.lastIndexOf('/')+1, href.length));
  }, [])

  React.useEffect(() => {
    if(Object.keys(quizResult).length > 0) {
        const timer = setInterval(() => {
            setProgressValue((prevProgress) => 
                (prevProgress >= progressEndValue ? progressEndValue : prevProgress + 5)
            );
        }, 100);
        return () => {
            clearInterval(timer);
        };
    }
  }, [progressEndValue, quizResult])

  if(preLoading) {
    return (
      <Box>
        <Box sx={{ bgcolor: '#f7f7ff', minHeight: 580 }}>
          <PreLoading />
        </Box>
      </Box>
    )    
  }

  return (
    Object.keys(quizResult).length > 0 &&
    <Box>
      <NavBar />
      <Box sx={{ marginTop: '70px', backgroundColor: '#eee', minHeight: "576px"}}>
        <Card sx={{minHeight: '300px',width:'700px', margin: 'auto'}}>
            <Box sx={{ borderRadius: "5px", m: 1, bgcolor: "#EEEEEE" }}>
                <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Box 
                        component="img"
                        title="Quiz"
                        src="https://res.cloudinary.com/djgwfxhqp/image/upload/v1721063955/ejtapqisgx0bxvwsfga0.png"
                        sx={{ width: "70px" }}
                    />
                    <Box sx={{ ml: 8 }}>
                        <Box>{AppLogo()} Quiz App</Box>
                    </Box>
                </Box>
            </Box>
            <CardContent>
                <Box sx={{textAlign: 'center'}}>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress size="7em" thickness={6} 
                                            className="bottom-circle" variant="determinate" value={100}
                                            sx={{
                                                position: "absolute",
                                                color: (theme) =>
                                                theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                                            }}                    
                        />
                        <CircularProgress size="7em" thickness={6} 
                                            className="top-circle" variant="determinate" value={progressValue}
                            
                        />
                        <Box
                            sx={{
                                top: -9, left: -2, bottom: 0, right: 0,
                                position: 'absolute', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                height: "130px", width: "130px"
                            }}
                        >
                            <Typography variant="caption" component="div" color="text.secondary" fontSize="20px" fontWeight="600">
                                {`${Math.round(progressValue)}%`}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{margin: 'auto', marginTop:'30px', border: "1px solid black", width: "580px", p: 2}}>
                    <Grid container>
                        <Grid item xs={6}>
                            <div className='d-flex text-change'>
                                <span style={{ fontSize: "16px", fontWeight: "bold" }}>Name:</span>
                                <div style={{ marginLeft: 5, fontSize: "16px" }}>{name}</div>
                            </div>
                        </Grid>
                        <Grid item xs={1} sx={{ borderLeft: "1px solid black" }}></Grid>
                        <Grid item xs={5}>
                            <div className='d-flex text-change'>
                                <span style={{ fontSize: "16px", fontWeight: "bold" }}>Quiz:</span>
                                <div style={{ marginLeft: 5, fontSize: "16px" }}>{quiz}</div>
                            </div>
                        </Grid>
                        <Grid sx={{marginTop:'30px'}} item xs={6}>
                            <div className='d-flex text-change'>
                                <span style={{ fontSize: "16px", fontWeight: "bold" }}>Max mark:</span>
                                <div style={{ marginLeft: 5, fontSize: "16px" }}>{quizResult.quiz.maxMark}</div>
                            </div>
                        </Grid>
                        <Grid item xs={1} sx={{ borderLeft: "1px solid black" }}></Grid>
                        <Grid sx={{marginTop:'30px'}} item xs={5}>
                            <div className='d-flex text-change'>
                                <span style={{ fontSize: "16px", fontWeight: "bold" }}>Mark:</span>
                                <div style={{ marginLeft: 5, fontSize: "16px" }}>{quizResult.mark}</div>
                            </div>
                        </Grid>
                        <Grid sx={{marginTop:'20px'}} item xs={6}>
                            <div className='d-flex text-change'>
                                <span style={{ fontSize: "16px", fontWeight: "bold" }}>Attempted:</span>
                                <div style={{ marginLeft: 5, fontSize: "16px" }}>{quizResult.attempted}</div>
                            </div>
                        </Grid>
                        <Grid item xs={1} sx={{ borderLeft: "1px solid black" }}></Grid>
                        <Grid sx={{marginTop:'20px'}} item xs={5}>
                            <div className='d-flex text-change'>
                                <span style={{ fontSize: "16px", fontWeight: "bold" }}>Correct:</span>
                                <div style={{ marginLeft: 5, fontSize: "16px" }}>{quizResult.correct}</div>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
            <CardActions>
                <Box sx={{margin:'auto'}}>
                    <Button sx={{marginRight:'5px'}} variant='contained' color='success'>Print</Button>
                    <Button variant='contained' color='error' onClick={() => {navigate('/User/')}}>Back</Button>
                </Box>
            </CardActions>
        </Card>
      </Box>
    </Box>
  )
}

export default QuizResult