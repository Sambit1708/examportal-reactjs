import * as React from 'react';
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, FormControl } from '@mui/material';
import { FormControlLabel, Grid, Radio, RadioGroup, Typography, Divider, useMediaQuery } from '@mui/material';
import QuestionService from '../../../services/QuestionService';
import Swal from 'sweetalert2';
import ResultService from '../../../services/ResultService';
import { useNavigate } from 'react-router-dom';


//TODO: Need to add some interesting component for Quiz Result.
export default function StartQuiz() {

  const isMatches = useMediaQuery('(max-width:600px)');
  const [questions, setQuestions] = React.useState([]);
  const [resultData, setResultData] = React.useState({
    quizId: parseInt(window.location.href.slice(window.location.href.lastIndexOf('/')+1, window.location.href.length)),
    questionAnswer: []
  });
  const [isSubmit, setIsSubmit] = React.useState(false)
  const [second, setSecond] = React.useState(100);
  const time = React.useRef()
  const navigate = useNavigate()

  const fetchResultByUserAndQuiz = async (id) => {
    try {
      const resultResponse = await ResultService.getResultByQuiz(id);
      if(resultResponse.status === 200) {
        Swal.fire('Alredy Appeared', "You have already appeared this examination.", 'warning')
        navigate(`/User/Quiz/Result/${id}`)
      }
    } 
    catch(error) {
      if(error.response.status !== 404) {
        Swal.fire("Some thing went wrong!!", `${error}`, "error");
      }
    }
  }

  const fetchQuestionByQuiz = async (quizId) => {
    try {
      const questionResponse = await QuestionService.getQuestionByQuiz(quizId);
      if(questionResponse.status === 200) {
        var newData = questionResponse.data
        if(questions.length === 0) {
          setSecond(newData.length * 2 * 60)
        }
        var k=questionResponse.data.length
        var rslt = {...resultData}
        for(let j=0; j<k; j++) {
          var datax = {
            questionId: newData[j].id,
            choosedOption: "None"
          }
          rslt.questionAnswer.push(datax)
        }
        setQuestions(newData)
        setResultData(rslt)
      }
    }
    catch(error) {
      Swal.fire("Some thing went wrong!!", `${error}`, "error")
    }
  }

  React.useEffect(() => {
    var href = window.location.href
    var quizId = href.slice(href.lastIndexOf('/')+1, href.length)
    fetchResultByUserAndQuiz(quizId)
    fetchQuestionByQuiz(quizId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    time.current = setInterval(() => {
      setSecond(prev => prev - 1)
    }, 1000)
    return () => clearInterval(time.current)
  }, [])

  React.useEffect(() => {
    if(second <= 0) {
      clearInterval(time.current)
      // submitQuiz();
    }
  }, [second])
  
  const getFormatedTime = () => {
    let mm = Math.floor(second / 60);
    let ss = Math.floor(second - (mm*60))
    return `${mm} min ${ss} sec`
  }

  const QuizTimer = () => (
    <React.Fragment>
      <Card sx={{ position:'fixed', right:'0', width: [100, 150, 200, 300, 300]}}>
        <CardContent>
          <Typography variant='h6' component='div'>
            Progress
          </Typography>
          <Typography color='text.secondary' paragraph>
              This quiz is automatically submitted when the timer will be 0:0
            </Typography>
          <Box textAlign='center'>
            <Typography variant='h5' component='div'>
              {getFormatedTime()}
            </Typography>
            <CircularProgress variant="determinate" sx={{ color: (theme) =>
                                theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                                marginRight: '-60px'
                              }} size={60} thickness={5} value={100} 
            />
            <CircularProgress  variant="determinate" size={60} thickness={5} value={(second / (questions.length * 2 * 60) * 100)} 
                color={Math.floor(second / (questions.length * 2 * 60) * 100) > 60 ? 'success' : Math.floor(second / (questions.length * 2 * 60) * 100) > 30 ? 'warning' : 'error'} 
            />
          </Box>
          
        </CardContent>
      </Card>
    </React.Fragment>
  )

  const handleAnswerChange = (event, id) => {
    var newData = {...resultData};
    for(let i=0; i<newData.questionAnswer.length; i++) {
      
      if(newData.questionAnswer[i].questionId === id) {
        newData.questionAnswer[i].choosedOption = event.target.value;
        break;
      }
    }
    setResultData(newData)
  }

  const submitQuiz = async () => {
    try {
      const resultResponse = await ResultService.evaluateQuiz(resultData);
      if(resultResponse.status === 201) {

        setIsSubmit(true);
        setSecond(0)
        navigate(`/User/Quiz/Result/${window.location.href.slice(window.location.href.lastIndexOf('/')+1, window.location.href.length)}`)
      }
    } catch(error) {
      Swal.fire("Some thing went wrong", `${error}`, "error")
    }
  }

  const formSubmit = (event) => {
    event.preventDefault();
    if(isSubmit) {
      return
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit it!'
    }).then((result) => {
      if (result.isConfirmed) {
        submitQuiz();
        navigate(`/User/Quiz/Result/${window.location.href.slice(window.location.href.lastIndexOf('/')+1, window.location.href.length)}`)
      }
    })
  }

  return (
    <div style={{backgroundColor: '#E5E7E9'}}>
      <Box sx={{ p: 2}}>
        {!isSubmit ? <QuizTimer /> : (<React.Fragment></React.Fragment>)}
        <Box sx={{ margin:'auto' ,  width: [300, 400, 500, 700, 1000],}}>
          <form onSubmit={(event) => formSubmit(event) }>
            {questions.map((item, index) => (
              <Card key={index} sx={{marginBottom: '20px'}}>
                <CardHeader 
                  title={<h5>{`Q${index+1}) `}<div dangerouslySetInnerHTML={{__html: item.content}}></div></h5>}
                />
                <Divider />
                <CardContent>
                  <FormControl sx={{width: '100%'}}>
                    <RadioGroup
                      aria-labelledby="quiz-radio-buttons-group-label"
                      name={`Q${index+1}`}
                      onChange={(event, id) => handleAnswerChange(event, item.id)}
                    >
                      <Grid container >
                        <Grid item xs={5}>
                          <FormControlLabel
                                  value="option1" 
                                  control={<Radio />} 
                                  label={item.option1}
                                  sx={isMatches ? {'& .MuiSvgIcon-root': {
                                                      fontSize: 20,
                                                  },
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: 15,
                                                  }} : {}
                                  }
                          />
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={5}>
                          <FormControlLabel 
                                  value="option2" 
                                  control={<Radio />} 
                                  label={item.option2}
                                  sx={isMatches ? { '& .MuiSvgIcon-root': {
                                                        fontSize: 20,
                                                  },
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: 15,
                                                  }} : {}
                                  } 
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <FormControlLabel 
                                  value="option3"  
                                  control={<Radio />} 
                                  label={item.option3}
                                  sx={isMatches ? { '& .MuiSvgIcon-root': {
                                                        fontSize: 20,
                                                  },
                                                      '& .MuiFormControlLabel-label': {
                                                          fontSize: 15,
                                                  }} : {}
                                  } 
                          />
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={5}>
                          <FormControlLabel 
                                  value="option4" 
                                  control={<Radio />} 
                                  label={item.option4} 
                                  sx={isMatches ? { '& .MuiSvgIcon-root': {
                                                        fontSize: 20,
                                                  },
                                                      '& .MuiFormControlLabel-label': {
                                                          fontSize: 15,
                                                  }} : {}
                                  }
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
            )) }
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <Button variant='contained' type='submit'>Submit</Button>
            </div>
          </form>
        </Box>
      </Box>
    </div>
  )
}
