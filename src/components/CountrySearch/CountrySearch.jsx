import React from 'react';
import styles from "./CountrySearch.module.css";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default function Country (){
    const getSearch = e => {
        e.preventDefault();
        var input = document.getElementById("outlined-search").value

        console.log(input)
    }
    return (
        <div className={styles.container}>
            <div className={styles.searchBox}>
                <form onSubmit={getSearch} className={styles.searchForm}>
                    <TextField className={styles.searchTextField} id="outlined-search" label="Type the name of a Country!" type="search" variant="outlined" />
                    <Button variant="contained" color="primary" type="submit">
                        Search
                    </Button>
                </form>
            </div>
        </div>
       
    )
}