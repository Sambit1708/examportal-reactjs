import axios from '../Utils/axios';

const QUIZES = "/quiz";
const ADD_QUIZ = '/add-quiz'
const DELETE_QUIZ = '/delete-quiz/'
const UPDATE_QUIZ = '/update-quiz'
const  LOAD_QUIZ = '/get-quiz/'

class QuizService {
  
    /**
     * * This method is used to get all quiz.
     * @returns {QUIZES}
     */
    getQuizes() {
        return axios.get(`${QUIZES}/`);
    }

    /**
     * * This method is used to create quiz.
     * @param {*} data 
     * @returns {QUIZ}
     */
    createQuizes(data) {
        return axios.post(`${QUIZES}${ADD_QUIZ}`,data);
    }

    /**
     * ! This method is used to delete quiz by Id
     * @param {ID} data 
     * @returns 
     */
    deleteQuiz(data) {
        return axios.delete(`${QUIZES}${DELETE_QUIZ}${data}`)
    }

    /**
     * * This method is used to get Quiz by id.
     * @param {ID} qid 
     * @returns {QUIZ}
     */
    getQuizById(qid) {
        return axios.get(`${QUIZES}/${qid}`)
    }

    /**
     * ! This method is used to update quiz By Quiz.
     * @param {QUIZ} quiz 
     * @returns {QUIZ}
     */
    updateQuiz(quiz) {
        return axios.post(`${QUIZES}${UPDATE_QUIZ}`,quiz)
    }

    /**
     * * This method is used to get Quiz by Category.
     * @param {ID} id 
     * @returns {QUIZ}
     */
    getQuizByCategory(id) {
        return axios.get(`${QUIZES}${LOAD_QUIZ}${id}`)
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new QuizService();
