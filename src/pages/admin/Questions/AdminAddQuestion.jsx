import React, { useRef } from 'react'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import SideBar from '../../../components/SideBar'
import QuestionService from '../../../services/QuestionService';
import swal from 'sweetalert';
import JoditEditor from 'jodit-react';


export default function AdminAddQuestion() {

  const [answer, setAnswer] = React.useState('');
  const formRef = useRef('')

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  const createQuestion = async (data) => {
    try {
        // eslint-disable-next-line no-unused-vars
        const questionAddResponse = await QuestionService.addQuestion(data);
        if(questionAddResponse.status === 201) {
          swal("Done!", "Category Added Sucessfully", "success");
        }
    } catch(error) {
        swal("Something Went Wrong!!",`${error}`, "error");
    }
}

  const submitQuestionForm = (event) => {
    event.preventDefault();

    const href = window.location.href
    const question = {
      content:`${formRef.current.questionDesc.value}`,
      image:'default.png',
      option1:`${formRef.current.option1.value}`,
      option2:`${formRef.current.option2.value}`,
      option3:`${formRef.current.option3.value}`,
      option4:`${formRef.current.option4.value}`,
      answer:`${formRef.current.answerRef.value}`,
      quiz: {
        id:`${href.slice(href.lastIndexOf('/')+1, href.length)}`
      }
    }
    
    createQuestion(question);

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
                        <JoditEditor name='questionDesc' />
                    </div>
                    <Grid container spacing={2}>
                      <Grid item xs={6} md={5}>
                        <div className="mb-3">
                          <TextField
                            className='form-control' required id="option1"
                            label="Option 1" name='option1'
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6} md={2}></Grid>
                      <Grid item xs={6} md={5}>
                        <div className="mb-3">
                          <TextField
                            className='form-control' required
                            name='option2' id="option2"
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <div className="mb-3">
                          <TextField
                            className='form-control' required
                            id="option3" label="Option 3" name='option3'
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6} md={2}>
                      </Grid>
                      <Grid item xs={6} md={5}>
                        <div className="mb-3">
                          <TextField
                            className='form-control' required
                            id="option4" label="Option 4" name='option4'
                          />
                        </div>
                      </Grid>
                    </Grid>
                    <div className='mb-3'>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Answer</InputLabel>
                        <Select
                          labelId="answer-select-label"
                          id="answer"
                          value={answer}
                          defaultValue='-- Select --'
                          className='form-control'
                          label="Answer"
                          onChange={handleChange}
                          name='answerRef'
                        >
                          <MenuItem disabled>-- Select --</MenuItem>
                          <MenuItem value='option1'>Option 1</MenuItem>
                          <MenuItem value='option2'>Option 2</MenuItem>
                          <MenuItem value='option3'>Option 3</MenuItem>
                          <MenuItem value='option4'>Option 4</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  
                    <div className='text-center'>
                      <Button type='submit' variant='contained' color='error'>Submit</Button>
                    </div>
                  </form>
                </div>
              </div>
            </Box>
        </Box>
    </React.Fragment>
  )
}
