import * as React from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import SideBar from "../../../components/SideBar";
import swal from "sweetalert";
import QuizService from "../../../services/QuizService";
import CategoryService from "../../../services/CategoryService";
import { pink } from "@mui/material/colors";
import PreLoading from "../../../components/PreLoading";

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

export default function AdminAddQuiz() {
  const [cid, setCid] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [preLoading, setPreLoading] = React.useState(true);
  const [quiz, setQuiz] = React.useState({
    title: "",
    description: "",
    maxMark: "",
    noOfQuestions: "",
    markPerQuestion: 0,
    active: true,
    category: {
      id: "",
    },
  });
  /**
   * * To get All the categories for to create quiz under category .
   */
  const getAllCategoriesData = async () => {
    try {
      const resultResponse = await CategoryService.getAllCategories();
      if (resultResponse.status === 200) {
        setCategories(resultResponse.data);
      }
    } catch (error) {
      swal("Something went wrong!!", "" + error, "error");
    } finally {
      setPreLoading(false);
    }
  };

  React.useEffect(() => {
    getAllCategoriesData();
  }, []);

  const handleCid = (event) => {
    setCid(event.target.value);

    const newData = { ...quiz };
    newData.category.id = event.target.value;
    setQuiz(newData);
  };

  const handleData = (event) => {
    const newData = { ...quiz };
    newData[event.target.id] = event.target.value;
    setQuiz(newData);
  };
  // This method is used to set the input checked or not
  const handleSwitch = (event) => {
    const newData = { ...quiz };
    newData[event.target.id] = event.target.checked;
    setQuiz(newData);
  };

  const createQuiz = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      var newData = { ...quiz };
      newData.markPerQuestion =
        parseInt(newData.maxMark) / parseInt(newData.noOfQuestions);
      setQuiz(newData);
      console.log(newData);
      const resultResponse = await QuizService.createQuizes(newData);
      if (resultResponse.status === 201) {
        swal("Done!!", "Quiz Added Added Successfully!", "success");
      }
    } catch (error) {
      swal("Something Went Wrong!!", `${error}`, "error");
    }
  };

  const submitQuizForm = (event) => {
    event.preventDefault();
    if (quiz.title === "" || quiz.description === "") {
      swal("Invalid Input!!", "Title or Description can't be null", "error");
      return;
    }

    createQuiz();
  };

  if (preLoading) {
    return (
      <Box>
        <SideBar />
        <Box sx={{ bgcolor: "#f7f7ff", minHeight: 580 }}>
          <PreLoading />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, marginTop: "20px", textAlign: "center" }}
        >
          <div className="container-size container-card p-5">
            <h5
              style={{
                textTransform: "uppercase",
                textDecoration: "underline",
              }}
            >
              Add Quiz
            </h5>
            <form id="list-item" onSubmit={(event) => submitQuizForm(event)}>
              <div className="row">
                <TextField
                  id="title"
                  label="Title"
                  className="mb-4"
                  onChange={(event) => handleData(event)}
                  inputProps={{
                    style: { fontFamily: "poppins" },
                  }}
                  InputLabelProps={{
                    style: { fontFamily: "poppins" },
                  }}
                />
                <TextField
                  id="description"
                  label="Description"
                  multiline
                  rows={3}
                  className="mb-3"
                  onChange={(event) => handleData(event)}
                  inputProps={{
                    style: { fontFamily: "poppins" },
                  }}
                  InputLabelProps={{
                    style: { fontFamily: "poppins" },
                  }}
                />
                <div className="row d-flex justify-content-between mb-3">
                  <TextField
                    label="Maximum Marks"
                    id="maxMark"
                    type="text"
                    variant="filled"
                    className="form-number"
                    onChange={(event) => handleData(event)}
                    inputProps={{
                      style: { fontFamily: "poppins" },
                    }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins" },
                    }}
                  />
                  <TextField
                    label="Number of Question"
                    type="text"
                    variant="filled"
                    id="noOfQuestions"
                    className="form-number"
                    onChange={(event) => handleData(event)}
                    inputProps={{
                      style: { fontFamily: "poppins" },
                    }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins" },
                    }}
                  />
                </div>
                <PinkSwitch
                  onChange={(event) => handleSwitch(event)}
                  id="active"
                  name="active"
                  defaultChecked
                />
                <FormControl className="mt-3">
                  <InputLabel id="categoryidselect-label">Category</InputLabel>
                  <Select
                    labelId="category-id"
                    id="cid"
                    value={cid}
                    defaultValue={cid}
                    label={
                      <Typography sx={{ fontFamily: "poppins" }}>
                        Category
                      </Typography>
                    }
                    onChange={(event) => handleCid(event)}
                    input={
                      <OutlinedInput
                        sx={{ fontFamily: "poppins" }}
                        label="Category"
                      />
                    }
                  >
                    <MenuItem value={""} disabled>
                      <Typography sx={{ fontFamily: "poppins" }}>
                        {categories.length === 0
                          ? `-- Please add atleast one category --`
                          : `-- Select --`}
                      </Typography>
                    </MenuItem>
                    {categories.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        <Typography sx={{ fontFamily: "poppins" }}>
                          {item.title}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <Button
                  type="submit"
                  className="mt-4"
                  sx={{ fontFamily: "poppins" }}
                  variant="contained"
                  color="error"
                >
                  Add New Quiz
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
