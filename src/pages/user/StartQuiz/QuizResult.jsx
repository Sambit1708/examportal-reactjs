import { Button, Card, CardContent, Divider, CardActions, Box, Grid } from '@mui/material'
import * as React from 'react'
import ResultService from '../../../services/ResultService'
import Swal from 'sweetalert2'
import UserService from '../../../services/UserService'
import NavBar from '../../../components/NavBar'
import { useNavigate } from 'react-router-dom'

const QuizResult = () => {

  const [quizResult, setQuizResult] = React.useState({

  })
  const navigate = useNavigate()
  const [progressValue, setProgressValue] = React.useState(0)
  const [progressEndValue, setProgressEndValue] = React.useState(100)
  const [name, setName] = React.useState()
  const [quiz, setQuiz] = React.useState()
  //const [dataLoading, setDataLoading] = React.useState
  let speed = 1
  let progress = React.useRef();

  const fetchResultById = async (id) => {
    try {
        const User = await UserService.getCurrentUser();
        const userId = User.data.id
        const QuizResult = {
            user: {
                id: userId
            },
            quiz: {
                qid: id
            }
        }
        const result = await ResultService.getResultByUserAndQuiz(QuizResult);
        const mark = result.data.mark
        setProgressEndValue(Math.floor((mark / 200) * 100))
        setName(`${result.data.user.firstName} ${result.data.user.lastName} `)
        setQuiz(`${result.data.quiz.title}`)
        setQuizResult(result.data)
        
    } catch(error) {
        Swal.fire("Some thing went wrong!!", `${error}`, "error");
    }
  }

  React.useEffect(() => {
    var href = window.location.href
    let progressBar = document.querySelector(".circular-progressbar")
    fetchResultById(href.slice(href.lastIndexOf('/')+1, href.length));
    
    progress.current = setInterval(() => {
        setProgressValue(progressVal => progressVal + 1)
        progressBar.style.background = `conic-gradient(
            #0099ff ${progressValue * 3.7}deg,
            #cadcff ${progressValue * 3.7}deg
        )`
    }, speed)
    return () => clearInterval(progress.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressValue])

  React.useEffect(() => {

    if(progressValue === progressEndValue) {
        clearInterval(progress.current)
    }
    if(progressValue > 100) {
        setProgressValue(0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressValue])

  React.useEffect(() => {
    if(quizResult == null) {
        window.location.reload()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>
      
      <NavBar />
      <Box sx={{marginTop: '70px', backgroundColor: '#E2E5DE'}}>
        <Card sx={{minHeight: '300px',width:'600px', margin: 'auto'}}>
            <Divider />
            <CardContent>
            <div style={{textAlign: 'center'}}>
                <img style={{width: '100px' }} src='https://drive.google.com/uc?export=view&id=1vh9bsku6g3l2UbDFod6JhLyeIXl6bmxT' alt='quizResult'/>
            </div>
            <div style={{margin: 'auto', marginTop:'50px'}}>
                <Grid container>
                    <Grid item xs={6}>
                        <div className='d-flex text-change'>
                            <h5>Name:</h5><div style={{marginLeft: 5}}>{name}</div>
                        </div>
                    </Grid>
                    <Grid sx={{ marginTop:'-20px'}} item xs={6}>
                        <div className='circular-progressbar' style={{marginLeft:'50px'}}>
                            <div className='value-container'>{progressValue}%</div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='d-flex text-change ' style={{ marginTop:'-40px'}}>
                            <h5>Quiz:</h5><div style={{marginLeft: 5}}>{quiz}</div>
                        </div>
                    </Grid>
                    <Grid sx={{marginTop:'30px'}} item xs={6}>
                        <div className='d-flex text-change'>
                            <h5>Mark:</h5><div style={{marginLeft: 5}}>{quizResult.mark}</div>
                        </div>
                    </Grid>
                    <Grid sx={{marginTop:'30px'}} item xs={6}>
                        <div className='d-flex text-change'>
                            <h5>Max mark:</h5><div style={{marginLeft: 5}}>200</div>
                        </div>
                    </Grid>
                    <Grid sx={{marginTop:'20px'}} item xs={6}>
                        <div className='d-flex text-change'>
                            <h5>Attempted:</h5><div style={{marginLeft: 5}}>{quizResult.attempted}</div>
                        </div>
                    </Grid>
                    <Grid sx={{marginTop:'20px'}} item xs={6}>
                        <div className='d-flex text-change'>
                            <h5>Correct:</h5><div style={{marginLeft: 5}}>{quizResult.correct}</div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            </CardContent>
            <CardActions>
                <div style={{margin:'auto'}}>
                    <Button sx={{marginRight:'5px'}} variant='contained' color='success'>Print</Button>
                    <Button variant='contained' color='error' onClick={() => {navigate('/User/')}}>Back</Button>
                </div>
            </CardActions>
        </Card>
      </Box>
    </React.Fragment>
  )
}

export default QuizResult