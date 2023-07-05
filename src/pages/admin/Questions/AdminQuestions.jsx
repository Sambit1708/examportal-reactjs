import React, { useEffect } from 'react'
import { Box, Card, CardActions, CardContent, Typography, Divider, Button } from '@mui/material'
import SideBar from '../../../components/SideBar'
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import QuestionService from '../../../services/QuestionService';
import swal from 'sweetalert';
import Swal from 'sweetalert2'

const deleteQuestion = async (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // eslint-disable-next-line no-unused-vars
        const result = await QuestionService.deleteQuestion(id);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      } catch(error) {
        Swal.fire(
          'Error!',
          `${error}`,
          'error'
        )
      }
      
    }
  })
}

const card = ({...options}, navigator, parser) => (
  <React.Fragment>
    <CardContent>
      <Typography variant="h6" component="div">
        <b>Q{`${options.qNo})`}</b>&nbsp; <div dangerouslySetInnerHTML={{__html: options.description}}></div>
      </Typography>
      <Typography sx={{ mb: 2 }}>
      </Typography>
      <Typography component={'span'} variant="body2" sx={{marginLeft:'10px'}}>
        <div className='option-class p-1'>
          <Grid container spacing={2}>
            <Grid className='border' item xs={6} md={6}>
              <h6><b>1{')'}</b>&nbsp;{options.option1}</h6>
            </Grid>
            <Grid className='border' item xs={6} md={6}>
              <h6><b>2{')'}</b>&nbsp;{options.option2}</h6>
            </Grid>
            <Grid className='border' item xs={6} md={6}>
              <h6><b>3{')'}</b>&nbsp;{options.option3}</h6>
            </Grid>
            <Grid className='border' item xs={6} md={6}>
              <h6><b>4{')'}</b>&nbsp;{options.option4}</h6>
            </Grid>
          </Grid>
        </div>
      </Typography>
      <Divider  sx={{marginTop:'10px'}}></Divider>
      <p style={{marginTop:'5px'}}><b>Correct Answer:</b> {options[`${options.answer}`]}</p>
      <Divider sx={{marginTop:'-5px'}}></Divider>
    </CardContent>
    <CardActions>
      <div style={{ margin:'auto',marginTop:'-5px'}}>
        <Button sx={{marginRight: '10px'}} onClick={(event) => {deleteQuestion(options.qid)}} variant='contained' color='error'>Delete</Button>
        <Button onClick={() => {navigator(`/Admin/Quiz/Question/Update/${options.qid}`)}} variant='contained' color='success'>Update</Button>
      </div>
    </CardActions>
  </React.Fragment>
);

export default function AdminQuestion() {

  const [questions, setQuestions] = React.useState([])
  const [quizId, setQuizId] = React.useState('')
  const parser = new DOMParser();

  const fetchQuestionByQuiz = async (data) => {
    try {
        const result = await QuestionService.getAdminQuestionByQuiz(data);
        setQuestions(result.data)
    } catch(error) {
        swal("Something Went Wrong!!",`${error}`, "error");
    }
  }

  useEffect(()=> {
    var href = window.location.href;
    setQuizId(href.slice(href.lastIndexOf('/')+1, href.length));
    fetchQuestionByQuiz(href.slice(href.lastIndexOf('/')+1, href.length));
  }, [])

  const navigator  = useNavigate();
  return (
    <div>
        <Box height={30} />
        <Box sx={{display: 'flex', backgroundColor: '#f5f5f5'}}>
            <SideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop:'20px'}}>
              <div className='text-center mb-2'>
                <Button onClick={() => {navigator(`/Admin/Quiz/Question/Add/${quizId}`)}} variant='contained' color='error'>ADD Question</Button>
              </div>
              <Grid container spacing={2}>
                  {questions.map((item, index) => (
                    <Grid key={item.quesid} item xs={12}>
                      <Card sx={{boxShadow: '5px 10px 8px #888888'}}
                        variant="contained">{card({ qid:`${item.quesid}`,
                                                    description:`${item.content}`,
                                                    option1:`${item.option1}`,
                                                    option2:`${item.option2}`,
                                                    option3:`${item.option3}`,
                                                    option4:`${item.option4}`,
                                                    answer:`${item.answer}`,
                                                    qNo:`${index+1}`}, navigator, parser)}
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Box>
        </Box>
    </div>
  )
}
