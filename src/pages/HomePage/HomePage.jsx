import * as React from "react";
import "./HomePage.css";
import NavBar from "../../components/NavBar";
import { Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <NavBar />
      <Box sx={{ marginTop: "70px", height: "550px" }}>
        <Box className="inner-home">
          <div style={{ display: "flex" }}>
            <div className="home-text">
              <h1 style={{ fontSize: "4em", marginTop: "50px" }}>
                <span>My</span> <span>Examportal</span>
              </h1>
              <Container sx={{ margin: "50px 0 0 10px" }}>
                <Button
                  sx={{
                    fontSize: "1.2em",
                    marginRight: "10px",
                    width: [150, 150, 200, 200, 200],
                    height: "50px",
                    borderRadius: "20px",
                  }}
                  variant="contained"
                >
                  Visit Us
                </Button>
                <Button
                  sx={{
                    fontSize: "1.2em",
                    width: [150, 150, 200, 200, 200],
                    height: "50px",
                    borderRadius: "20px",
                  }}
                  variant="contained"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Subscribe
                </Button>
              </Container>
            </div>
            <img
              style={{ width: "400px", marginTop: "-50px" }}
              src="https://res.cloudinary.com/djgwfxhqp/image/upload/v1721023887/ivrhjlhwxwkmxoeviljq.jpg"
              alt="exam"
            />
          </div>
        </Box>
      </Box>
    </React.Fragment>
  );
};
export default HomePage;
