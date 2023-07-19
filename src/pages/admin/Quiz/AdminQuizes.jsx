import * as React from 'react';
import { Avatar, Box, CardHeader } from '@mui/material'
import SideBar from '../../../components/SideBar'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import QuizService from '../../../services/QuizService';
import swal from 'sweetalert';
import { styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const deleteQuiz = async (id) => {
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
        const result = await QuizService.deleteQuiz(id);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
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

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(pink[500]),
  backgroundColor: pink[500],
  '&:hover': {
    backgroundColor: pink[700],
  },
}));

const card = ({...options}, navigator) => (
  <React.Fragment>
    <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img src='https://drive.google.com/uc?export=view&id=1e21MnVNt0isYhby0YwmW3OYcHwZxFVPc' alt="quiz" style={{width: '40px'}} />
          </Avatar>
        }
        title={options.title}
        subheader={options.category}
    />
    <CardContent>
      <Typography variant="body2">
        {options.description}
      </Typography>
    </CardContent>
    <CardActions>
      <ColorButton onClick={() => {navigator(`/Admin/Quiz/Question/${options.qid}`)}} variant="contained" size="small">Questions</ColorButton>
      <Button variant="outlined" size="small" color='success' >Max Marks: {options.maxMark}</Button>
      <Button variant="outlined" size="small" color='success' >Questions: {options.noOfQuestions}</Button>
      <Button onClick={() => {navigator(`/Admin/Quiz/Update/${options.qid}`)}} variant="contained" size="small">Update</Button>
      <ColorButton variant="contained" size="small">Attempts</ColorButton>
      <Button onClick={(event) => {deleteQuiz(options.qid)}} variant="contained" size="small" color="error">Delete</Button>
    </CardActions>
  </React.Fragment>
);

export default function AdminQuizes() {

  const [quizs, setQuizs] = React.useState([])
  const navigator  = useNavigate();

  const fetchQuizes = async () => {
    try {
      const result = await QuizService.getQuizes();
      setQuizs(result.data)
    } catch (error) {
      swal('Something went wrong!!', `${error}`,"error")
    }
  }

  React.useEffect(() => {
    fetchQuizes();
  }, [])

  return (
    <React.Fragment>
      <Box height={30} />
      <Box sx={{display: 'flex'}}>
          <SideBar />
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop:'15px' }}>
              <Box sx={{ minWidth: 275 }}  id="list-item">
                {quizs.map((item) => (
                  <div key={item.qid}>
                      <Card className='mt-1' 
                        variant="outlined">
                          {card({ title:`${item.title}`,
                                  description:`${item.description}`,
                                  maxMark:`${item.maxMark}`,
                                  noOfQuestions:`${item.noOfQuestions}`,
                                  category:`${item.category.title}`,
                                  qid:`${item.qid}`}, navigator)}
                      </Card>
                  </div>
              ))}
              </Box>
              <div className='text-center mt-5'>
                  <Button onClick={() => {navigator('Add')}} variant="contained" size="small" color="error">Add New Quiz</Button>
              </div>
          </Box>
      </Box>
    </React.Fragment>
  )
}
