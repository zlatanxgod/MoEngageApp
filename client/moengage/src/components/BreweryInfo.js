import React from "react";
import { useState } from "react";
import { TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const BreweyInfo = ({ name, address_1, city }) => {
  return (
    <Container component="main" maxWidth="lg">
      <Typography component="h1" variant="h5">
        Name : {name} Address:{address_1} City:{city}
      </Typography>
    </Container>
  );
};

export default BreweyInfo;
