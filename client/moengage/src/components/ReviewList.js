import React, { Text } from "react";
import Rating from "@mui/material/Rating";

const ReviewList = ({ data }) => {
  return data?.reviewsRatings?.map((elem) => {
    console.log({ elem });
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: 16,
        }}
      >
        <Rating name="simple-controlled" value={parseInt(elem?.rating)} />
        <text>{elem?.review}</text>
      </div>
    );
  });
};

export default ReviewList;
