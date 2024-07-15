import axios from "../Utils/axios";

const CATEGORY = "/category";
const ADD_CATEGORY = '/add-category'; 
const DELETE_CATEGORY = '/delete'  

class CategoryService {

   getAllCategories() {
     return axios.get(`${CATEGORY}/`);
   }

   createCategory(categoryData) {
     return axios.post(`${CATEGORY}${ADD_CATEGORY}`, categoryData);
   }

   deleteCategory(cId) {
     return axios.delete(`${CATEGORY}${DELETE_CATEGORY}`, {
               params: {
                    cId: cId
               }
            })
   }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoryService()