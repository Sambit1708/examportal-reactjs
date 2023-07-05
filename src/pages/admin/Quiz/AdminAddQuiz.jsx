import React, { useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Switch, TextField, alpha, styled } from '@mui/material'
import SideBar from '../../../components/SideBar'
import swal from 'sweetalert';
import QuizService from '../../../services/QuizService';
import CategoryService from '../../../services/CategoryService';
import { pink } from '@mui/material/colors';

const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));


export default function AdminAddQuiz() {

  const [cid, setCid] = React.useState('');
  const [category, setCategory] = useState([]);
  const [quiz, setQuiz] = React.useState({
    title:'',
    description:'',
    maxMark:'',
    noOfQuestions:'',
    active:true,
    category: {
        cid:''
    }
  })
  /**
   * * To get All the categories for to create quiz under category .
   */
  const getAllCategoriesData = async () => {
    try {
      const result = await CategoryService.getAllCategories();
      setCategory(result.data)
    } catch (error) {
      swal("Something went wrong!!", ''+error, "error")
    }
  }

  React.useEffect(() => {
    getAllCategoriesData();
  }, [])

  const handleCid = (event) => {
    setCid(event.target.value);
    const newData = {...quiz}
    setQuiz(newData)
    newData.category.cid=event.target.value
  };
  

  const handleData = (event) => {
    const newData = {...quiz}
    newData[event.target.id]=event.target.value;
    setQuiz(newData)
  };
  
  // This method is used to set the input checked or not
  const handleSwitch = (event) => {
    const newData = {...quiz}
    newData[event.target.id]=event.target.checked;
    setQuiz(newData)
  }


  const createQuiz = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const result = await QuizService.createQuizes(quiz);
      swal("Done!!", "Quiz Added Added Successfully!", "success");
    } catch (error) {
      swal("Something Went Wrong!!",`${error}`, "error");
    }
  }

  const submitQuizForm = (event) => {
    event.preventDefault();
    if(quiz.title === '' || quiz.description === '') {
        swal("Invalid Input!!", "Title or Description can't be null", "error");
        return
    }

    createQuiz();
  };


  return (
    <React.Fragment>
        <Box height={30} />
        <Box sx={{display: 'flex'}}>
            <SideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop:'20px' }}>
                <div className='container-size container-card p-5'>
                    <h5>Add Quiz</h5>
                    <form id="list-item" onSubmit={(event) => submitQuizForm(event)}>
                        <div className='row'>
                            <TextField
                                id="title"
                                label="Title"
                                className="mb-4"
                                onChange={(event) => handleData(event)}
                            />
                            <TextField
                                id="description"
                                label="Description"
                                multiline
                                rows={3}
                                className='mb-3'
                                onChange={(event) => handleData(event)}
                            />
                            <div className='d-flex justify-content-between mb-3'>
                                <TextField
                                    label="Maximum Marks"
                                    id="maxMark"
                                    type="text"
                                    variant="filled"
                                    className='form-number'
                                    onChange={(event) => handleData(event)}
                                />
                                <TextField
                                    label="Number of Question"
                                    type="text"
                                    variant="filled"
                                    id='noOfQuestions'
                                    className='form-number'
                                    onChange={(event) => handleData(event)}
                                />
                            </div>
                            <PinkSwitch onChange={(event) => handleSwitch(event)} id='active' name='active' defaultChecked />
                            <FormControl>
                              <InputLabel id="categoryidselect-label">Category</InputLabel>
                              <Select
                                  labelId="category-id"
                                  id="cid"
                                  value={cid}
                                  label="Age"
                                  onChange={handleCid}
                              >
                                  { category.map((item) => (
                                      <MenuItem key={item.cid} value={item.cid}>{item.title}</MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                        </div>
                        <div>
                            <Button type='submit' className='mt-4' variant="contained" color="error">
                                Add New Quiz
                            </Button>
                        </div>
                    </form>
                </div>
            </Box>
        </Box>
    </React.Fragment>
  )
}
