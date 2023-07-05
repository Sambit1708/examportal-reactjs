import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import SideBar from '../../../components/SideBar'
import swal from 'sweetalert';
import QuizService from '../../../services/QuizService';
import CategoryService from '../../../services/CategoryService';

export default function AdminUpdate() {

  const [category, setCategory] = useState([]);
  const [quiz, setQuiz] = React.useState({
      title:'',
      description:'',
      maxMarks:'',
      noOfQuestions:'',
      category: {
          cid:'',
          title:'',
          description:''
      }
  })
  const updateQuizFormRef = React.useRef()

  const getAllCategoryAndQuiz = async () => {
    
    const href = window.location.href
    try {
      const quizResult = await QuizService.getQuizById(href.slice(href.lastIndexOf('/')+1, href.length));
      const categoryResult = await CategoryService.getAllCategories();

      setQuiz(quizResult.data)
      setCategory(categoryResult.data)

    } catch (error) {
      swal("Something went wrong!!", ''+error, "error")
    }
  }

  React.useEffect(() => {
    getAllCategoryAndQuiz();
  }, [])


  const updateQuiz = async (data) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const result = await QuizService.updateQuiz(quiz);
      swal("Done!!", "Updated Successfully!", "success");
    } catch (error) {
      swal("Something Went Wrong!!",`${error}`, "error");
    }
  }

  const submitQuizForm = (event) => {
    event.preventDefault();

    const quizNew = {
      title:`${updateQuizFormRef.current.title.value}`,
      description:`${updateQuizFormRef.current.description.value}`,
      maxMarks:`${updateQuizFormRef.current.maxMarks.value}`,
      noOfQuestions:`${updateQuizFormRef.current.noOfQuestions.value}`,
      category: {
          cid:`${updateQuizFormRef.current.cid.value}`,
      }
    }

    if(quizNew.title === '' || quizNew.description === '') {
        swal("Invalid Input!!", "Title or Description can't be null", "error");
        return
    }
  
     updateQuiz(quizNew);
  };

  return (
    <React.Fragment>
      <Box height={30} />
      <Box sx={{display: 'flex'}}>
          <SideBar />
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop:'20px' }}>
              <div className='container-size container-card p-5'>
                  <h5>Update Quiz</h5>
                  <form ref={updateQuizFormRef} id="list-item" onSubmit={(event) => submitQuizForm(event)}>
                      <div className='row'>
                          <div className="mb-3">
                            <label className="form-label"><b>Title</b></label>
                            <input name='title' style={{height:'50px'}} id="title" type="text" value={quiz.title} className="form-control" />
                          </div>
                          <div className="mb-2">
                            <label className="form-label" ><b>Desription</b></label>
                            <textarea name='description' className="form-control" style={{height: '100px'}} defaultValue={quiz.description} />
                          </div>

                          <div className='d-flex justify-content-between mb-3'>
                            <div className="maxMarks">
                                <label className="form-label"><b>Maximum Marks</b></label>
                                <input style={{height:'50px', width:'350px'}} name="maxMarks" type="text" value={quiz.maxMark} className="form-control" />
                            </div>
                            <div className="noOfQuestions">
                                <label for="NoOfQuestions" className="form-label"><b>No of Questions</b></label>
                                <input style={{height:'50px', width:'350px'}} name="noOfQuestions" id="noOfQuestions" type="text" value={quiz.noOfQuestions} className="form-control" />
                            </div>
                          </div>
                          <select name="cid" id='cid' value={quiz.category.cid} title={quiz.category.title} description={quiz.category.description} className="form-control form-select">
                            { category.map((item) => (
                                <option value={item.cid}>{item.title}</option>
                            ))}
                          </select>
                      </div>
                      <div>
                          <Button type='submit' className='mt-4' variant="contained" color="error">
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
