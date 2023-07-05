import axios from "../Utils/axios";

const CATEGORIES = "/category";
const ADD_CATEGORY = '/add-category';   

class CategoryService {

   getAllCategories() {
        return axios.get(`${CATEGORIES}/`);
   }

   createCategory(categoryData) {
        return axios.post(`${CATEGORIES}${ADD_CATEGORY}`, categoryData);
   }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoryService()