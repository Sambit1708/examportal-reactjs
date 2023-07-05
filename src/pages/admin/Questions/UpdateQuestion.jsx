import React, { useRef } from 'react'
import { Box, Button, Grid, InputLabel } from '@mui/material'
import SideBar from '../../../components/SideBar'
import swal from 'sweetalert';
import QuestionService from '../../../services/QuestionService';
import JoditEditor from 'jodit-react';

export default function UpdateQuestion() {

    const [uQuestion, setuQuestion] = React.useState({})
    const [answer, setAnswer] = React.useState('');
    const formRef = useRef('')
  
    const handleChange = (event) => {
      setAnswer(event.target.value);
    };

    const fetchQuestionDeails = async (id) => {
        try {
            const result = await QuestionService.getQuestionById(id);
            setuQuestion(result.data)
            setAnswer(result.data.answer)
        } catch (error) {
            swal("Something went wrong!!",`${error}`,"error");
        }
    }

    React.useEffect(() => {
        const href = window.location.href
        fetchQuestionDeails(Number(href.slice(href.lastIndexOf('/')+1, href.length)));
    }, [])
  
    const submitQuestionForm = (event) => {
        event.preventDefault();
        const question = {
            quesid:`${uQuestion.quesid}`,
            content:`${formRef.current.questionDesc.value}`,
            image:'default.png',
            option1:`${formRef.current.option1.value}`,
            option2:`${formRef.current.option2.value}`,
            option3:`${formRef.current.option3.value}`,
            option4:`${formRef.current.option4.value}`,
            answer:`${formRef.current.answerRef.value}`,
            quiz: {
                qid:`${uQuestion.quiz.qid}`
            }
        }
    
        QuestionService.updateQuestion(question).then((result) => {
            swal("Done.",`Updated Successfuly.`, "success")
        }).catch((error) => {
            swal("Something went wrong!!",`${error}`, 'error')
        })
    }

    return (
    <React.Fragment>
        <Box height={30} />
        <Box sx={{display: 'flex'}}>
            <SideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop:'20px'}}>
                <div className='container container-card rounded' style={{maxWidth: '800px'}}>
                    <div className='text-center pt-3'>
                        <h3 className='fw-bold text-uppercase'>Add Questions</h3>
                    </div>
                    <div className='row p-2'>
                        <form ref={formRef} onSubmit={(event) => submitQuestionForm(event)}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Question Description</label>
                                <JoditEditor value={uQuestion.content} name='questionDesc' />
                            </div>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={5}>
                                <div className="mb-3 form-floating">
                                    <input type="text" required className="form-control" name='option1' defaultValue={uQuestion.option1} />
                                    <label>Option 1</label>
                                </div>
                                </Grid>
                                <Grid item xs={6} md={2}></Grid>
                                <Grid item xs={6} md={5}>
                                <div className="mb-3 form-floating">
                                    <input type="text" required className="form-control" name='option2' id="option2" defaultValue={uQuestion.option2} />
                                    <label>Option 2</label>
                                </div>
                                </Grid>
                                <Grid item xs={6} md={5}>
                                <div className="mb-3 form-floating">
                                    <input type="text" required className="form-control" name='option3' id="option3" defaultValue={uQuestion.option3} />
                                    <label>Option 3</label>
                                </div>
                                </Grid>
                                <Grid item xs={6} md={2}>
                                </Grid>
                                <Grid item xs={6} md={5}>
                                <div className="mb-3 form-floating">
                                    <input type="text" required className="form-control" name='option4' id="option4" defaultValue={uQuestion.option4} />
                                    <label>Option 4</label>
                                </div>
                                </Grid>
                            </Grid>
                            <div className='mb-3'>
                                <InputLabel id="demo-simple-select-label">Answer</InputLabel>
                                <select id='cid' 
                                        onChange={handleChange} 
                                        value={answer}
                                        defaultValue={uQuestion.answer} 
                                        className="form-control form-select"
                                        name='answerRef'>

                                        <option value='option1'>Option 1</option>
                                        <option value='option2'>Option 2</option>
                                        <option value='option3'>Option 3</option>
                                        <option value='option4'>Option 4</option>
                                </select>
                            </div>
                            
                            <div className='text-center'>
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
