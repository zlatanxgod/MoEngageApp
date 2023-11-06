import React from "react";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import BreweyInfo from "./BreweryInfo";
import DataGridDemo from "./DataGrid";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [city, setCity] = useState("");
  const [name, setPassword] = useState("");
  const [breweryType, setbreweryType] = useState("");
  const [list, setList] = useState([]);
  const [success, setSuccess] = useState(false);

  const API_URL = "http://localhost:3001/breweries";
  const navigate = useNavigate();

  const displayBreweryInfo = (data) => {
    const rows = data.map(
      ({
        id,
        name,
        address_1,
        city,
        state,
        website_url,
        phone,
        review,
        rating,
      }) => {
        return {
          id,
          name,
          address_1,
          city,
          state,
          website_url,
          phone,
          review,
          rating,
        };
      }
    );
    console.log(rows);
    return (
      <DataGridDemo
        rows={rows}
        onClick={(params) => {
          console.log(params.row.name);
          // console.log(data.filter((item) => item.id === params.row.id));
          const brew = data.filter((item) => item.id === params.row.id);
          navigate("/details", {
            state: { data: brew },
          });
        }}
      />
    );
  };

  const getBreweryData = async (city, name, breweryType) => {
    if (!city && !name && !breweryType) return;
    let q = "";
    if (city) q = q + `?by_city=${city}`;
    if (name) q = q + `?by_name=${name}`;
    if (breweryType) q = q + `?by_type=${breweryType}`;
    const limit = "&page=1&per_page=50";

    try {
      const res = await axios.get(API_URL + q + limit);
      //console.log(JSON.stringify(res.data));
      return res.data;
    } catch (error) {
      console.log("Error getting data");
    }
  };

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
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            margin="normal"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            margin="normal"
            label="Brewery Type"
            variant="outlined"
            value={breweryType}
            onChange={(e) => setbreweryType(e.target.value)}
          />

          <Box textAlign="center" margin={3}>
            <Button
              onClick={async () => {
                const res = await getBreweryData(city, name, breweryType);
                setList([...res]);
                setSuccess(true);
              }}
              variant="contained"
            >
              Search
            </Button>
          </Box>
        </Container>
      </div>
      {success && displayBreweryInfo(list)}
    </div>
  );
};

export default Home;
