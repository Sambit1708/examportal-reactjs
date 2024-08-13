import * as React from "react";
import { Avatar, Box, CardHeader } from "@mui/material";
import SideBar from "../../../components/SideBar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import QuizService from "../../../services/QuizService";
import swal from "sweetalert";
import { ColorButton } from "../../../components/Buttons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import PreLoading from "../../../components/PreLoading";

const tableStyle = {
  backgroundColor: "#fff",
  color: "rgba(0, 0, 0, 0.87)",
  transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  borderRadius: "4px",
  boxShadow: `rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, 
              rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, 
              rgba(0, 0, 0, 0.12) 0px 1px 3px 0px`,
};

const deleteQuiz = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // eslint-disable-next-line no-unused-vars
        const result = await QuizService.deleteQuiz(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", `${error}`, "error");
      }
    }
  });
};

const CardContents = (props) => {
  const item = props.item;
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img
              src="https://res.cloudinary.com/djgwfxhqp/image/upload/v1721064044/wjgztgktipb0v8qhclkj.png"
              alt="quiz"
              style={{ width: "40px" }}
            />
          </Avatar>
        }
        title={
          <Box component="div" sx={{ fontFamily: "'Poppins', sans-serif" }}>
            {item.title}
          </Box>
        }
        subheader={
          <Box component="div" sx={{ fontFamily: "'Poppins', sans-serif" }}>
            {item.category.title}
          </Box>
        }
      />
      <CardContent>
        <Typography
          variant="body2"
          sx={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <ColorButton
          sx={{ fontFamily: "'Poppins', sans-serif" }}
          onClick={() => {
            navigate(`/Admin/Quiz/Question/${item.id}`);
          }}
          variant="contained"
          size="small"
        >
          Questions
        </ColorButton>
        <Button
          sx={{ fontFamily: "'Poppins', sans-serif" }}
          variant="outlined"
          size="small"
          color="success"
        >
          Max Marks: {item.maxMark}
        </Button>
        <Button
          sx={{ fontFamily: "'Poppins', sans-serif" }}
          variant="outlined"
          size="small"
          color="success"
        >
          Questions: {item.noOfQuestions}
        </Button>
        <Button
          sx={{ fontFamily: "'Poppins', sans-serif" }}
          onClick={() => {
            navigate(`/Admin/Quiz/Update/${item.id}`);
          }}
          variant="contained"
          size="small"
        >
          Update
        </Button>
        <ColorButton
          sx={{ fontFamily: "'Poppins', sans-serif" }}
          variant="contained"
          size="small"
          onClick={() => {
            navigate(`/Admin/Results/by-quiz/${item.id}`);
          }}
        >
          Attempts
        </ColorButton>
        <Button
          sx={{ fontFamily: "'Poppins', sans-serif" }}
          onClick={(event) => {
            deleteQuiz(item.qid);
          }}
          variant="contained"
          size="small"
          color="error"
        >
          Delete
        </Button>
      </CardActions>
    </React.Fragment>
  );
};

export default function AdminQuizes() {
  const [quizs, setQuizs] = React.useState([]);
  const [preLoading, setPreLoading] = React.useState(true);
  const navigator = useNavigate();

  const fetchQuizes = async () => {
    try {
      const resultResponse = await QuizService.getQuizes();
      if (resultResponse.status === 200) {
        setQuizs([...resultResponse.data]);
      }
    } catch (error) {
      swal("Something went wrong!!", `${error}`, "error");
    } finally {
      setPreLoading(false);
    }
  };

  React.useEffect(() => {
    fetchQuizes();
  }, []);

  if (preLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box sx={{ bgcolor: "#f7f7ff", minHeight: 580, flexGrow: 1 }}>
          <PreLoading />
        </Box>
      </Box>
    );
  }

  return (
    <React.Fragment>
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "15px" }}>
          <Box sx={{ minWidth: 275 }} id="list-item">
            {quizs.map((item) => (
              <div key={item.id}>
                <Card className="mt-1" variant="outlined" sx={tableStyle}>
                  <CardContents item={item} />
                </Card>
              </div>
            ))}
          </Box>
          <div className="text-center mt-5">
            <Button
              sx={{ fontFamily: "'Poppins', sans-serif" }}
              onClick={() => {
                navigator("Add");
              }}
              variant="contained"
              size="small"
              color="error"
            >
              Add New Quiz
            </Button>
          </div>
        </Box>
      </Box>
    </React.Fragment>
  );
}
