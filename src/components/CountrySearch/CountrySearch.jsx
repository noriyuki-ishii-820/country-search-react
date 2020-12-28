import React, {useState} from 'react';
import styles from "./CountrySearch.module.css";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

let data = "[]"
export default function Country (){
    const [country, setCountry] = useState([]);

    // modal

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // search engine

    const getResults = async (queryURL) => {
        const response = await fetch(queryURL);
        const data = await response.json();
        console.log(data[0])
        setCountry(data[0])
    }

    const getSearch = e => {
        e.preventDefault();
        var input = document.getElementById("outlined-search").value

        if (!input) {
            alert("Invalid input. please try again.")
            return
        }

        const queryURL = "https://restcountries.eu/rest/v2/name/" + input;
        getResults(queryURL);
        setOpen(true);
    }

    return (
        <div className={styles.container}>
            <div className={styles.searchBox}>
                <form onSubmit={getSearch} className={styles.searchForm}>
                    <TextField className={styles.searchTextField} id="outlined-search" label="Type the name of a Country!" type="search" variant="outlined" />
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
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan odio enim.
                                </p>
                            </div>
                        </Fade>
                    </Modal>
                </form>
            </div>
        </div>
       
    )
}



