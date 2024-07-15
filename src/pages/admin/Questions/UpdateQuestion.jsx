import React, { useRef } from 'react'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import SideBar from '../../../components/SideBar';
import QuestionService from '../../../services/QuestionService';
import JoditEditor from 'jodit-react';
import PreLoading from '../../../components/PreLoading';
import Swal from 'sweetalert2';

export default function UpdateQuestion() {

    const [uQuestion, setuQuestion] = React.useState({})
    const [answer, setAnswer] = React.useState('');
    const [ preLoading, setPreLoading ] = React.useState(true);
    const formRef = useRef('')
  
    const handleChange = (event) => {
      setAnswer(event.target.value);
    };

    const fetchQuestionDeails = async (id) => {
        try {
            const resultResponse = await QuestionService.getQuestionById(id);
            if(resultResponse.status === 200) {
                setuQuestion(resultResponse.data)
                setAnswer(resultResponse.data.answer)
                setPreLoading(false);
            }
        } catch (error) {
            Swal.fire("Something went wrong!!",`${error}`,"error");
        }
    }

    React.useEffect(() => {
        const href = window.location.href
        fetchQuestionDeails(href.slice(href.lastIndexOf('/')+1, href.length));
    }, [])
  
    const submitQuestionBackend = async (id, question) => {
        try {
            const dataResponse = await QuestionService.updateQuestion(id, question);
            if(dataResponse.status === 201) {
                Swal.fire("Done.",`Updated Successfuly..`, "success");
            }
        } catch (error) {
            Swal.fire("Something went wrong!!",`${error}`, 'error');
        } 
    }

    const submitQuestionForm = (event) => {
        event.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to update this question",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if(result.isConfirmed) {
                const question = {
                    content:`${formRef.current.questionDesc.value}`,
                    option1:`${formRef.current.option1.value}`,
                    option2:`${formRef.current.option2.value}`,
                    option3:`${formRef.current.option3.value}`,
                    option4:`${formRef.current.option4.value}`,
                    answer:`${formRef.current.answerRef.value}`,
                    quiz: {
                        qid:`${uQuestion.quiz.qid}`
                    }
                }
                submitQuestionBackend(uQuestion.id, question);
            }
        })
    }

    if(preLoading) {
        return (
          <Box sx={{display: "flex"}}>
            <SideBar />
            <Box sx={{ bgcolor: '#f7f7ff', minHeight: 580, flexGrow: 1 }}>
              <PreLoading />
            </Box>
          </Box>
        )    
    }

    return (
    <React.Fragment>
        <Box height={30} />
        <Box sx={{display: 'flex'}}>
            <SideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop:'20px'}}>
                <div className='container container-card rounded' style={{maxWidth: '800px'}}>
                    <div className='text-center pt-3'>
                        <h3 className='fw-bold text-uppercase text-decoration-underline'>Update Questions</h3>
                    </div>
                    <div className='row p-2'>
                        <form ref={formRef} onSubmit={(event) => submitQuestionForm(event)}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Question Description</label>
                                <JoditEditor value={uQuestion.content} name='questionDesc' />
                            </div>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={5.5}>
                                    <TextField
                                        className='form-control' required id="option1"
                                        label="Option 1" name='option1' defaultValue={uQuestion.option1}
                                        inputProps={{ style: {fontFamily: 'poppins'} }} 
                                        InputLabelProps={{ style:{fontFamily: 'poppins'} }}
                                    />
                                </Grid>
                                <Grid item xs={6} md={1}></Grid>
                                <Grid item xs={6} md={5.5}>
                                    <TextField
                                        className='form-control' required id="option2"
                                        label="Option 2" name='option2' defaultValue={uQuestion.option2}
                                        inputProps={{ style: {fontFamily: 'poppins'} }} 
                                        InputLabelProps={{ style:{fontFamily: 'poppins'} }}
                                    />
                                </Grid>
                                <Grid item xs={6} md={5.5}>
                                    <TextField
                                        className='form-control' required id="option3"
                                        label="Option 3" name='option3' defaultValue={uQuestion.option3}
                                        inputProps={{ style: {fontFamily: 'poppins'} }} 
                                        InputLabelProps={{ style:{fontFamily: 'poppins'} }}
                                    />
                                </Grid>
                                <Grid item xs={6} md={1}>
                                </Grid>
                                <Grid item xs={6} md={5.5}>
                                    <TextField
                                        className='form-control' required id="option4"
                                        label="Option 4" name='option4' defaultValue={uQuestion.option4}
                                        inputProps={{ style: {fontFamily: 'poppins'} }} 
                                        InputLabelProps={{ style:{fontFamily: 'poppins'} }}
                                    />
                                </Grid>
                            </Grid>
                            <FormControl fullWidth className='mt-3 mb-3'>
                                <InputLabel id="Answer-Label">Answer</InputLabel>
                                <Select
                                    labelId="Answer-Label" id="Answer"
                                    defaultValue={uQuestion.answer} 
                                    value={answer} name="answerRef"
                                    label="Answer" onChange={handleChange}
                                    input={<OutlinedInput sx={{fontFamily: 'poppins'}} label="Answer" />}
                                >
                                    <MenuItem value={'option1'}>
                                        <Typography fontFamily='poppins'>
                                            {uQuestion.option1}
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem value={'option2'}>
                                        <Typography fontFamily='poppins'>
                                            {uQuestion.option2}
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem value={`option3`}>
                                        <Typography fontFamily='poppins'>
                                            {uQuestion.option3}
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem value={'option4'}>
                                        <Typography fontFamily='poppins'>
                                            {uQuestion.option4}
                                        </Typography>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            
                            <div className='text-center p-3'>
                                <Button type='submit' variant='contained' color='error'>Update</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Box>
        </Box>
    </React.Fragment>
    )
}
