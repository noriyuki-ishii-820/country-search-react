import React, { useEffect, useState } from "react";
import { fetchData } from "../../api";
import TextField from "@material-ui/core/TextField";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import { Palette } from "color-thief-react";
import styles from "./FlagSearch.module.css";


export const Flag = () => {
  const [data, setData] = useState([]);
  const [state, setState] = React.useState({
    Red : false,
    White: false,
    Blue: false,
    Yellow: false,
    Green: false,
    Black: false,
  });
  const Loading = () => <div>Loading...</div>;
  const colors = ["Red","White","Blue","Yellow","Green","Black"]

  // checkboxes 
  

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(state)
  }


  // runs upon load
  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchData());
    };
    fetchAPI();
  }, []);

  // search colors (hex) of flags
  const colorDB = data.map((flag) => (

    <Palette
      label= {flag.name}
      src={flag.flag}
      crossOrigin="anonymous"
      format="hex"
      colorCount={4}
    >
      {({ data, loading }) => {
        if (loading) return <Loading />;
        return console.log([{name:flag.name, color: data}])

   
      }}
    </Palette>
  ));

  const colorBtn = colors.map((color, index)=> {
      return (
      <FormControlLabel
        key={index}
        control={<Checkbox
        checked={state.checked} 
        onClick={handleChange} 
        name={color} />}
        label={color}
      />
  )})

  return (
    <div>
        <div className={styles.container}>
          <div className={styles.searchBox}>
            <h4>Search by Colors</h4>

            <form onSubmit={submit}>
              <FormGroup>
                <ul className={styles.list}>
                  {colorBtn}
                </ul>
              </FormGroup>
              <Button variant="contained" color="primary" type="submit">
                Search
              </Button>
            </form>            
        </div>
      </div>
    </div>
  );
};

export default Flag;
