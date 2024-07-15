import React, { useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import SideBar from '../../../components/SideBar'
import Swal from 'sweetalert2';
import QuizService from '../../../services/QuizService';
import CategoryService from '../../../services/CategoryService';
import PreLoading from '../../../components/PreLoading';

export default function AdminUpdate() {

  const [category, setCategory] = useState([]);
  const [cid, setCid] = React.useState('');
  const [ preLoading, setPreLoading] = React.useState(true);
  const [quiz, setQuiz] = React.useState({
      id: 0,
      title:'',
      description:'',
      maxMarks:'',
      noOfQuestions:'',
      markPerQuestion: '',
      category: {
        id:'',
        title:'',
        description:''
      }
  })
  const updateQuizFormRef = React.useRef()

  const handleCid = (event) => {
    setCid(event.target.value);
    
    const newData = {...quiz}
    newData.category.id=event.target.value
    setQuiz(newData)
  };

  const getAllCategoryAndQuiz = async () => {
    
    const href = window.location.href
    try {
      const quizResult = await QuizService.getQuizById(href.slice(href.lastIndexOf('/')+1, href.length));
      const categoryResult = await CategoryService.getAllCategories();

      setQuiz(quizResult.data)
      setCategory(categoryResult.data)
      setCid(quizResult.data.category.id)
      setPreLoading(false);

    } catch (error) {
      Swal.fire("Something went wrong!!", ''+error, "error")
    }
  }

  React.useEffect(() => {
    getAllCategoryAndQuiz();
  }, [])


  const updateQuiz = async (id, data) => {
    try {
      const resultResponse = await QuizService.updateQuiz(id, data);
      if(resultResponse.status === 201) {
        Swal.fire({
          title: "Done!!",
          text: "Quiz Updated Successfully",
          icon: "success",
         }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
         })
        Swal.fire("Done!!", "Updated Successfully!", "success");
      }
    } catch (error) {
      Swal.fire("Something Went Wrong!!",`${error}`, "error");
    }
  }

  const handleData = (event) => {
    const newData = {...quiz}
    newData[event.target.id]=event.target.value;
    setQuiz(newData)
  };

  const submitQuizForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let formJson = Object.fromEntries(formData.entries());
    formJson.Category = {id: cid}

    if(formJson.title === '' || formJson.description === '') {
      Swal.fire("Invalid Input!!", "Title or Description can't be null", "error");
        return
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update this quiz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!"
     }).then((result) => {
      if (result.isConfirmed) {
        updateQuiz(quiz.id, formJson);
      }
     })
  
     
  };
  
  
  if(preLoading) {
    return (
      <Box sx={{display: 'flex'}}>
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
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop:'20px', textAlign: "center" }}>
              <div className='container-size container-card p-5'>
                  <h5 className='text-uppercase text-decoration-underline'>Update Quiz</h5>
                  <form ref={updateQuizFormRef} id="list-item" onSubmit={(event) => submitQuizForm(event)}>
                    <div className='row'>
                      <div className="mb-2">
                        <TextField
                            id="title" label="Title" name='title'
                            className="mb-4" onChange={(event) => handleData(event)}
                            defaultValue={quiz.title} fullWidth
                            inputProps={{
                              style: {fontFamily: 'poppins'}
                            }}
                            InputLabelProps={{
                              style: {fontFamily: 'poppins'}
                            }}
                        />
                      </div>
                      <div className="mb-3">
                        <TextField
                            id="description" label="Description"
                            multiline rows={3} fullWidth name="description"
                            onChange={(event) => handleData(event)}
                            defaultValue={quiz.description}
                            inputProps={{
                              style: {fontFamily: 'poppins'}
                            }}
                            InputLabelProps={{
                              style: {fontFamily: 'poppins'}
                            }}
                        />
                      </div>

                      <div className='d-flex justify-content-between mb-3'>
                        <TextField
                            id="title" label="Max Marks" name='maxMark'
                            onChange={(event) => handleData(event)}
                            defaultValue={quiz.maxMark}
                            inputProps={{
                              style: {fontFamily: 'poppins'}
                            }}
                            InputLabelProps={{
                              style: {fontFamily: 'poppins'}
                            }}
                        />
                        <TextField
                            id="title" label="No of Questions" name='noOfQuestions'
                            onChange={(event) => handleData(event)}
                            defaultValue={quiz.noOfQuestions}
                            inputProps={{
                              style: {fontFamily: 'poppins'}
                            }}
                            InputLabelProps={{
                              style: {fontFamily: 'poppins'}
                            }}
                        />
                      </div>
                      <div className='mt-3'>
                        <FormControl fullWidth>
                          <InputLabel id="categoryidselect-label">Category</InputLabel>
                          <Select
                              labelId="category-id" id="cid"
                              value={cid}
                              label={<Typography sx={{fontFamily: 'poppins'}}>Category</Typography>}
                              onChange={(event) => handleCid(event)}
                              input={<OutlinedInput sx={{fontFamily: 'poppins'}} label="Category" />}
                              
                          >
                              <MenuItem value={''} disabled>
                                <Typography sx={{fontFamily: 'poppins'}}>-- Select --</Typography>
                              </MenuItem>
                              { category.map((item) => (
                                  <MenuItem key={item.id} value={item.id}>
                                    <Typography sx={{fontFamily: 'poppins'}}>{item.title}</Typography>
                                  </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <div>
                        <Button type='submit' className='mt-4' variant="contained" 
                                color="error" sx={{ fontFamily: "poppins" }}>
                            Updtae Quiz
                        </Button>
                    </div>
                  </form>
              </div>
          </Box>
      </Box>
    </React.Fragment>
  )
}
