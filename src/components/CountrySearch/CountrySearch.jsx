import React, { useState } from "react";
import styles from "./CountrySearch.module.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "rgba(252, 252, 252, 0.9)",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "60vh",
    width: "60vw",
  },
}));

export default function Country() {
  const [country, setCountry] = useState([]);

    console.log(country)
  // modal

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  // search engine

  const getResults = async (queryURL) => {
    const response = await fetch(queryURL);
    const data = await response.json();
    setCountry(data[0]);
  };

  const getSearch = (e) => {
    e.preventDefault();
    var input = document.getElementById("outlined-search").value;

    if (!input) {
      alert("Invalid input. please try again.");
      return;
    }

    const queryURL = "https://restcountries.eu/rest/v2/name/" + input;
    getResults(queryURL);
    setOpen(true);

  };

    // google maps

    const containerStyle = {
        width: '400px',
        height: '400px'
      };
      
    
      

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <form onSubmit={getSearch} className={styles.searchForm} >
          <TextField
            className={styles.searchTextField}
            id="outlined-search"
            label="Type the name of a Country!"
            type="search"
            variant="outlined"
          />
          <Button variant="contained" color="primary" type="submit">
            Search
          </Button>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h2>{country.name}</h2>
                <img src={country.flag} alt="flag" className={styles.flag} />
                <h4>Basic information</h4>
                <ul>
                  <li>Abbreviation(CIOC): {country.cioc}</li>
                  <li>Region: {country.region}</li>
                  <li>Capital City: {country.capital}</li>
                  <li>
                    Population: {parseInt(country.population).toLocaleString()}{" "}
                    people
                  </li>
                  <li>Area: {parseInt(country.area).toLocaleString()} km2</li>
                  <li>
                    Currency:{" "}
                    {country.currencies && (
                      <span>
                        {country.currencies[0].name} (
                        {country.currencies[0].symbol})
                      </span>
                    )}
                  </li>
                  <li>
                    {country.languages && country.languages.length === 1 ? (
                      <>
                        <span>
                          Language:
                          {country.languages[0].name}
                        </span>
                      </>
                    ) : (
                      <>
                        <span>
                          Languages:
                          <ul>
                            {country.languages &&
                              country.languages.map((language) => (
                                <li>{language.name}</li>
                              ))}
                          </ul>
                        </span>
                      </>
                    )}
                  </li>
                </ul>
                {country.latlng &&
                <LoadScript googleMapsApiKey="AIzaSyATOwfejjQyq5E8XtLSZ63fyEb_eNu-KJc">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{lat: country.latlng[0], lng: country.latlng[1]}}
                    zoom={4}
                  >
                  </GoogleMap>
                </LoadScript>}
              </div>
            </Fade>
          </Modal>
        </form>
      </div>
    </div>
  );
}
