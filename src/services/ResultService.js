import axios from "../Utils/axios"

const RESULT = '/result';
const RECENT_RESULT = '/recent-result'
const EVAL_QUIZ = '/eval-quiz'
const CHECK_RESULT = '/check-result'

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
     * @param {*} data 
     * @returns {*} Result
     */
    getResultByUserAndQuiz(data) {
        return axios.post(`${RESULT}${CHECK_RESULT}`, data);
    }

    /**
     * * This method is used to return Result by id.
     * @param {*} id 
     * @returns 
     */
    getResultById(id) {
        return axios.get(`${RESULT}/${id}`);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ResultService()