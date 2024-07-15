/* eslint-disable import/no-anonymous-default-export */
import axios from '../Utils/axios';

const QUIZES = "/quiz";
const QUESTION = '/question'
const ADD_QUESTION = '/add-question'
const UPDATE_QUESTION = '/update-question'
const DELETE_QUESTION = '/delete-question'
const ADMIN_QUESTION = '/Admin'

class QuestionService {

    getQuestionByQuiz(id) {
        return axios.get(`${QUESTION}${QUIZES}/${id}`)
    }

    getAdminQuestionByQuiz(id) {
        return axios.get(`${QUESTION}${ADMIN_QUESTION}${QUIZES}/${id}`)
    }

    addQuestion(question) {
        return axios.post(`${QUESTION}${ADD_QUESTION}`,question)
    }

    getQuestionById(id) {
        return axios.get(`${QUESTION}/${id}`)
    }

    updateQuestion(id, question) {
        const url = `${QUESTION}${UPDATE_QUESTION}/${id}`;
        return axios.put(url, question, {
            headers: {
                'Content-Type': 'application/json'
            }
 
        })
    }

    deleteQuestion(id) {
        return axios.delete(`${QUESTION}${DELETE_QUESTION}/${id}`)
    }
}
export default new QuestionService();