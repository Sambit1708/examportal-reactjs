import * as React from 'react'
import QuizService from '../../../services/QuizService'
import Swal from 'sweetalert2'
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Grid, Button, Typography } from '@mui/material';
import UserSideBar from '../../../components/UserSideBar';
import { useLocation, useNavigate } from 'react-router-dom';
import './assets/userStyle.css'


export default function QuizAction() {

    const location = useLocation();
    const [quizs, setQuizs] = React.useState([]);
    const navigate = useNavigate();


    const fetchQuizById = async (id) => {
        try {
            const result = await QuizService.getQuizByCategory(id);
            setQuizs(result.data)
        } catch(error) {
            Swal.fire("Something went wrong!!", `${error}`, 'error')
        }
    }

    const fetchAllQuizs = async () => {
        try {
            const result = await QuizService.getQuizes();
            setQuizs(result.data)
        } catch(error) {
            Swal.fire("Something went wrong!!", `${error}`, 'error')
        }
    }


    React.useEffect(() => {
        var href = window.location.href
        var chk = href.slice(href.lastIndexOf('/')+1, href.length);
        if( chk === '0' ) {
            fetchAllQuizs();
        }
        else {
            fetchQuizById(chk);
        }
    }, [location.key])


    return (
    <React.Fragment>
        <Box height={30} />
        <UserSideBar />
        <Box component="main" sx={{ backgroundColor:'#E2E5DE', margin:'35px 0 0 200px', padding:'10px 0 0 10px', minHeight:'596px' }}>
            <Box  sx={{backgroundColor:'#fff', minHeight:'585px', p:2 }}>
                <h3 style={{textTransform:'uppercase', textAlign:'center'}}>Available Quizes</h3>
                <Grid container spacing={2} sx={{marginTop: '20px'}}>
                    {quizs.length > 0 ? quizs.map((item) => (
                        <Grid key={item.title} item xs={4} sx={{marginTop:'10px'}}>
                            <Card sx={{ maxWidth: 345, backgroundColor:'#FFFDD0' }}>
                                <CardHeader
                                    avatar={
                                        <Avatar alt='Quiz' src='https://drive.google.com/uc?export=view&id=1zAJeHN2wBFrlb2vjm1Xqs5ap0eLaF00Y' />
                                    }
                                    title={(<div>
                                                <h5 style={{ textTransform:'uppercase'}}>{item.title}</h5>
                                            </div>)}
                                    subheader={item.category.title}
                                />
                                <CardContent>
                                    <Typography className='turncate' variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <Button onClick={() => {navigate(`/User/Quiz/instruction-page/${item.qid}`)}} >View</Button>
                                    <Button onClick={() => {navigate(`/User/Quiz/instruction-page/${item.qid}`)}} color='error'>Start</Button>
                                    <Button color='success'>Question:&nbsp;{item.noOfQuestions}</Button>
                                    <Button color='error'>M.M:&nbsp;{item.maxMark}</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )) : (
                        <Grid item xs={12} sx={{marginTop: '50px'}}>
                            <Card sx={{ width: '100%' }}>
                                <CardContent>
                                    <Typography className='turncate' variant="body2" color="text.secondary">
                                        Data is not available
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ) }   
                </Grid>
            </Box>
        </Box>
    </React.Fragment>
    )
}
