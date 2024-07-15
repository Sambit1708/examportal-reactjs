import * as React from "react";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from "./pages/SignUP/SignUpPage";
import LoginPage from "./pages/Login/LoginPage";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminCategories from "./pages/admin/Category/AdminCategories";
import AdminAddCategory from "./pages/admin/Category/AdminAddCategory";
import AdminQuizes from "./pages/admin/Quiz/AdminQuizes";
import AdminAddQuiz from "./pages/admin/Quiz/AdminAddQuiz";
import AdminQuizUpdate from "./pages/admin/Quiz/AdminQuizUpdate.jsx";
import AdminQuestion from "./pages/admin/Questions/AdminQuestions";
import AdminAddQuestion from "./pages/admin/Questions/AdminAddQuestion";
import UpdateQuestion from "./pages/admin/Questions/UpdateQuestion";
import UserPage from './pages/admin/Users/UserPage';
import QuizAction from "./pages/user/Quizes/QuizAction";
import ReadInstruction from "./pages/user/Quizes/ReadInstruction";
import StartQuiz from "./pages/user/StartQuiz/StartQuiz";
import Loading from "./components/Loading";
import axios from "axios";
import AdminProtectionRoute from './Utils/AdminProtectionRoute';
import UserProtectRoutes from './Utils/UserProtectRoutes';
import PageNotFound from "./pages/PageNotFound";
import QuizResult from "./pages/user/StartQuiz/QuizResult";
import './App.css'
import AdminResultPage from "./pages/admin/Result/AdminResultPage.jsx";

function App() {

  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    axios.interceptors.request.use((request) => {
      setLoading(true)
      return request;
    });

    axios.interceptors.response.use((request) => {
      setLoading(false)
      return request;
    });
  }, [])

  return (
    <React.Fragment>
      <Loading show={loading} />
      <Router>
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />}></Route>
              <Route path='register' element={<SignUpPage />}></Route>
              <Route path='login' element={<LoginPage />}></Route>
              <Route element={<AdminProtectionRoute />}>
                <Route path="Admin">
                  <Route index element={<AdminDashboard />}></Route>
                  <Route path='Profile' element={<AdminProfile />}></Route>
                  <Route path='Users' element={<UserPage />}></Route>
                  <Route path='Category'>
                    <Route index element={<AdminCategories />}></Route>
                    <Route path='Add' element={<AdminAddCategory />}></Route>
                  </Route>
                  <Route path='Quiz'>
                    <Route index element={<AdminQuizes />}></Route>
                    <Route path='Add' element={<AdminAddQuiz />}></Route>
                    <Route path='Update/:id' element={<AdminQuizUpdate />}></Route>
                    <Route path='Question/:id' element={<AdminQuestion />}></Route>
                    <Route path='Question'>
                      <Route index element={<AdminQuizes />}></Route>
                      <Route path='Add/:id' element={<AdminAddQuestion />}></Route>
                      <Route path='Update/:id' element={<UpdateQuestion />}></Route>
                    </Route>
                  </Route>
                  <Route path="results">
                    <Route index element={<AdminResultPage />}></Route>
                    <Route path="by-quiz/:id" element={<AdminResultPage />}></Route>
                  </Route>
                </Route>
              </Route>
              <Route element={<UserProtectRoutes />}>
                <Route path="User">
                  <Route index element={<UserDashboard />}></Route>
                  <Route path='Quiz'>
                    <Route index element={<UserDashboard />}></Route>
                    <Route path=':id' element={<QuizAction />}></Route>
                    <Route path='instruction-page/:id' element={<ReadInstruction />}></Route>
                    <Route path='Result/:id' element={<QuizResult />}></Route>
                    <Route path='Start/:id' element={<StartQuiz />}></Route>
                  </Route>
                </Route>
              </Route>
            </Route>
            <Route path='*' element={<PageNotFound />}></Route>
          </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
