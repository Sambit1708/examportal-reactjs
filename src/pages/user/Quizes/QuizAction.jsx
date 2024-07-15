import * as React from 'react'
import QuizService from '../../../services/QuizService'
import Swal from 'sweetalert2'
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Grid, Button, Typography } from '@mui/material';
import UserSideBar from '../../../components/UserSideBar';
import { useNavigate } from 'react-router-dom';
import './assets/userStyle.css'
import PreLoading from '../../../components/PreLoading';


export default function QuizAction() {

    const [quizs, setQuizs] = React.useState([]);
    const [ preLoading, setPreLoading ] = React.useState(true);
    const navigate = useNavigate();

    const fetchQuizById = async (id) => {
        try {
            const resultResponse = await QuizService.getQuizByCategory(id);
            if(resultResponse.status === 200) {
                setQuizs([...resultResponse.data])
                setPreLoading(false);
            }
        } catch(error) {
            Swal.fire("Something went wrong!!", `${error}`, 'error')
        }
    }

    const fetchAllQuizs = async () => {
        try {
            const resultResponse = await QuizService.getQuizes();
            if(resultResponse.status === 200) {
                setQuizs([...resultResponse.data])
                setPreLoading(false);
            }
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
    }, [])

    if(preLoading) {
        return (
          <Box>
            <UserSideBar />
            <Box sx={{ bgcolor: '#f7f7ff', minHeight: 580, }}>
              <PreLoading />
            </Box>
          </Box>
        )    
    }

    return (
        <Box>
            <Box height={30} />
            <UserSideBar />
            <Box sx={{ bgcolor:'#E2E5DE', margin:'35px 0 0 250px', padding:'10px 0 0 10px', minHeight:'596px' }}>
                <Box  sx={{backgroundColor:'#fff', minHeight:'585px', p:2 }}>
                    <Box sx={{ width: "100%", justifyContent: "center", display: "flex" }}>
                        <h3 style={{ textAlign:'center',width: "fit-content", textTransform:'uppercase', borderBlock: "4px solid black"}}>
                            Available Quizes
                        </h3>
                    </Box>
                    <Grid container spacing={2} sx={{marginTop: '20px'}}>
                        {quizs.length > 0 ? quizs.map((item) => (
                            <Grid key={item.title} item xs={4} sx={{marginTop:'10px'}}>
                                <Card sx={{ maxWidth: 345, backgroundColor:'#FFFDD0' }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar alt='Quiz' src="https://res.cloudinary.com/djgwfxhqp/image/upload/v1721025219/ajkymdis31kfltdkqwvm.png" />
                                        }
                                        title={(<div>
                                                    <h5 style={{ textTransform:'uppercase' }}>{item.title}</h5>
                                                </div>)}
                                        subheader={<span style={{ fontFamily: "poppins" }}>{item.category.title}</span>}
                                    />
                                    <CardContent>
                                        <Typography className='turncate' variant="body2" color="text.secondary" fontFamily="poppins">
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <Button sx={{ fontFamily: "poppins" }} 
                                                onClick={() => {navigate(`/User/Quiz/instruction-page/${item.id}`)}}
                                        >
                                            View
                                        </Button>
                                        <Button sx={{ fontFamily: "poppins" }} color='error'
                                                onClick={() => {navigate(`/User/Quiz/instruction-page/${item.id}`)}}
                                        >
                                            Start
                                        </Button>
                                        <Button sx={{ fontFamily: "poppins" }} color='success'>
                                            Question:&nbsp;{item.noOfQuestions}
                                        </Button>
                                        <Button sx={{ fontFamily: "poppins" }} color='error'>
                                            M.M:&nbsp;{item.maxMark}
                                        </Button>
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
        </Box>
    )
}
