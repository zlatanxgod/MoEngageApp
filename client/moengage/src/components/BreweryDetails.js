import React, { Text } from "react";
import { useState, useEffect } from "react";
import { Alert, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import BreweyInfo from "./BreweryInfo";
import DataGridDemo from "./DataGrid";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import ReviewList from "./ReviewList";

const BreweryDetails = () => {
  const location = useLocation();
  const data = location.state.data;
  console.log(data[0].rating);
  const intiState = data[0].rating || 0;
  const [rating, setRating] = useState(intiState);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  console.log("-.", data);

  return (
    <div>
      <Container sx={{ flexGrow: 1 }}>
        <Typography
          variant="h2"
          style={{
            marginBottom: "40px",
            textAlign: "center",
            fontWeight: "400",
            textDecoration: "underline",
          }}
        >
          Brewery Details
        </Typography>
        <Grid container spacing={2}>
          {/* <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid> */}
          {Object.keys(data?.[0])?.map((key) => {
            return (
              data?.[0][key] &&
              key != "reviewsRatings" && (
                <Grid
                  spacing={2}
                  style={{
                    marginBottom: 10,
                  }}
                  container
                  key={key}
                >
                  <Grid item xs={6}>
                    <Item
                      style={{
                        fontWeight: "900",
                        fontSize: 16,
                      }}
                    >
                      {key.toUpperCase()}
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item
                      style={{
                        color: "green",
                      }}
                    >
                      {data?.[0][key]}
                    </Item>
                  </Grid>
                </Grid>
              )
            );
          })}
        </Grid>
      </Container>

      <Container component="main" maxWidth="sm">
        <Grid>
          <Item>
            <Box>
              <Typography fontSize={24} component="legend">
                Rate It!
              </Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                  console.log(rating);
                }}
              />
            </Box>
          </Item>
          <ReviewBox data={data && data[0]} rating={rating} />
        </Grid>
      </Container>
    </div>
  );
};

export default BreweryDetails;

const ReviewBox = ({ data, rating }) => {
  const [review, setReview] = useState("");
  const [success, setSuccess] = useState(false);

  const API_URL = "ratingandreview/";
  const API_URL2 = "getBrewery/";
  const navigate = useNavigate();

  console.log("==========*", data);

  const postReviewData = async () => {
    let rec = "";
    try {
      rec = await axios.get(API_URL2 + data.id);
    } catch (error) {
      console.log("Eroor", error);
    }

    console.log("=====>", rec?.data);

    const postData = {
      id: data.id,
      rating,
      review,
      reviewsRatings: [
        ...rec?.data,
        {
          review,
          rating,
        },
      ],
    };

    try {
      await axios.post(API_URL, postData);
      setSuccess(true);
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.log(error);
    }

    console.log(postData);
  };

  return (
    <>
      {success && <Alert severity="success">Submitted Successfully</Alert>}

      <Typography fontSize={28}>Review</Typography>
      <TextField
        onChange={(e) => {
          //console.log(e.target.value);
          setReview(e.target.value);
        }}
        placeholder={data.review}
        value={review}
        id="outlined-basic"
        variant="outlined"
        fullWidth="60%"
      />
      <Button
        style={{ marginTop: "10px", marginBottom: 32 }}
        onClick={postReviewData}
        variant="contained"
      >
        Submit
      </Button>
      <ReviewList data={data} />
    </>
  );
};
