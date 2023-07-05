import * as React from 'react'
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import QuizService from '../../../services/QuizService'
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom'
import UserService from '../../../services/UserService'
import ResultService from '../../../services/ResultService'

export default function ReadInstruction() {

    const location = useLocation();
    const [quizs, setQuizs] = React.useState({})
    const navigate = useNavigate();
    const [tHref, setThref] = React.useState('')

    const fetchResultByUserAndQuiz = async (id) => {
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
            if(result.data !== '') {
                Swal.fire('Alredy Appeared', "You have already appeared this examination.", 'warning')
                navigate(`/User/Quiz/Result/${id}`)
            }
            else {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "When the test ended unexpectedly, you won't be able to appear the test again",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Start!'
                }).then((result) => {
                    if (result.isConfirmed) {
                            navigate(`/User/Quiz/Start/${tHref.slice(tHref.lastIndexOf('/')+1, tHref.length)}`);
                    }
                }).catch((error) => {
                    Swal.fire(
                        'Error!',
                        `${error}`,
                        'error'
                )})
            }
        } catch(error) {
            Swal.fire("Some thing went wrong!!", `${error}`, "error");
        }
    }

    const fetchQuizById = async (id) => {
        
        try {
            const result = await QuizService.getQuizById(id);
            setQuizs(result.data)
        } catch(error) {
            Swal.fire("Something went wrong!!", `${error}`, 'error')
        }
    }

    React.useEffect(() => {
        var href = window.location.href
        setThref(href)
        var chk = href.slice(href.lastIndexOf('/')+1, href.length);
        fetchQuizById(chk);
    }, [location.key])

    const startQuiz = () => {
        var href = window.location.href
        var chk = href.slice(href.lastIndexOf('/')+1, href.length);
        fetchResultByUserAndQuiz(chk);
    }

    return (
    <React.Fragment>
        <Box component="main" sx={{p:3, backgroundColor:'#f5f5f5' }}>
            <Card>
                <CardContent>
                    <Typography variant="p">
                        <b>Read the instruction carefully on this page.</b>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Heool ia ms dnd
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{marginTop:'1px'}}>
                <CardContent>
                    <Typography variant="h5">
                        {quizs.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {quizs.description}
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{marginTop:'1px'}}>
                <CardContent>
                    <Typography variant="h5">
                        Important Instructions
                    </Typography>
                    <Typography variant="body2" component='div'>
                        <ul>
                            <p></p>
                            <li>This quiz is only for pratice purpose</li>
                            <li>You have submit the quiz within <strong>20</strong> minutes</li>
                            <li>You can attempt the quiz any number of lines.</li>
                            <li>There are <strong>10 questions</strong> in the quiz.</li>
                            <li>Each question carry <strong>5 marks</strong>. No negative marking for wrong ones</li>
                            <li>All questions are of MCQ Types.</li>
                        </ul>
                    </Typography>
                </CardContent>
            </Card>
            <Card sx={{marginTop:'1px'}}>
                <CardContent>
                    <Typography variant="h5">
                        Attempting Quiz
                    </Typography>
                    <Typography variant="body2" component='div'>
                        <ul>
                            <p></p>
                            <li>Click <strong>Start Quiz</strong> button to start the quiz.</li>
                            <li>The timer will strat the moment quiz starts</li>
                            <li>You can not resume this quiz once quit.</li>
                            <li>Scroll down to move to the next question.</li>
                            <li>Click on Submit button the submit the quiz.</li>
                            <li>Report of the test is automatically generated in the form of PDF.</li>
                        </ul>
                    </Typography>
                </CardContent>
                <CardActions>
                    <div style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)'}}>
                        <Button sx={{marginRight:'10px'}} variant='contained' color='error'
                            onClick={() => {navigate(-1)}} 
                        >Back</Button>
                        <Button variant='contained'
                            onClick={() => startQuiz()} 
                        >Start Quiz</Button>
                    </div>
                </CardActions>
            </Card>
        </Box>
    </React.Fragment>
    )
}
