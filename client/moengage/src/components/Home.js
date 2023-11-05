import React from "react";
import { TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
const Home = () => {
  return (
    <div>
      <div>
        <Box textAlign="center" margin={3}>
          <Typography variant="h2" component="h2">
            Brewery Search
          </Typography>
        </Box>

        <Container maxWidth="sm">
          <TextField
            fullWidth
            margin="normal"
            id="outlined-basic"
            label="City"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            margin="normal"
            label="Name"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            margin="normal"
            label="Brewery Type"
            variant="outlined"
          />

          <Box textAlign="center" margin={3}>
            <Button variant="contained">Search</Button>
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default Home;
