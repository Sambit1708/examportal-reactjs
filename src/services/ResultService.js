import axios from "../Utils/axios"

const RESULT = '/api/result';
const RECENT_RESULT = '/recent-result';
const EVAL_QUIZ = '/eval-quiz';
const CHECK_RESULT = '/check-result';
const BY_QUIZ = '/by-quiz';
const SEARCH = '/search';

class ResultService {

    /**
     * * This methos is used to get recent results.
     * @returns {RECENT_RESULT}
     */
    getRecentResult() {
        return axios.get(`${RESULT}${RECENT_RESULT}`)
    }
    
    /**
     * * This method is used to calculate result from backend.
     * @param {*} data 
     * @returns 
     */
    evaluateQuiz(data) {
        return axios.post(`${RESULT}${EVAL_QUIZ}`, data)
    }

    /**
     * * This method check for preious result
     * @param {*} userId, quizId 
     * @returns {*} Result
     */
    getResultByQuiz(quizId) {
        return axios.get(`${RESULT}${CHECK_RESULT}?quizId=${quizId}`);
    }

    /**
     * * This method is used to return Result by id.
     * @param {*} id 
     * @returns 
     */
    getResultById(id) {
        return axios.get(`${RESULT}/${id}`);
    }

    getAllResultOfQuiz(quizId) {
        return axios.get(`${RESULT}${BY_QUIZ}?quizId=${quizId}`);
    }

    getAllResults() {
        return axios.get(`${RESULT}/get`);
    }

    getAllResultsBySearch(param) {
        return axios.get(`${RESULT}${SEARCH}`, {
            params: {
                quiz: param.quiz,
                firstName: param.firstName,
                lastName: param.lastName
            }
        });
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ResultService()