import React, { useEffect, useState } from "react";
import { fetchData } from "../../api";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Modal from "@material-ui/core/Modal";
import { Palette } from "color-thief-react";
import styles from "./FlagSearch.module.css";
import { makeStyles } from "@material-ui/core/styles";

let iro = "";
let trueArray = [];
let colorCountryArr = [];
let orgResult = [];
let result = [];

const useStyles = makeStyles((theme) => ({
  modal: {
    overflow: 'scroll',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: 400,
    margin: "auto",
    height: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const Flag = () => {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    Red: false,
    White: false,
    Blue: false,
    Yellow: false,
    Green: false,
    Black: false,
    Cyan: false,
    YellowGreen: false,
    Others: false,
  });
  const colors = ["Red","Cyan", "Yellow Green", "Yellow", "Green", "Blue", "Orange", "Others"];

  // close modal
  const handleClose = () => {
    setOpen(false);
  };

  // checkboxes
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(state);

    if (state.Red === true) {
      trueArray.push("Red");
    }
    if (state.Yellow === true) {
      trueArray.push("Yellow");
    }
    if (state.Green === true) {
      trueArray.push("Green");
    }
    if (state.Orange === true) {
      trueArray.push("Orange");
    }
    if (state.Blue === true) {
      trueArray.push("Blue");
    }
    if (state.Cyan === true) {
      trueArray.push("Cyan");
    }
    if (state.YellowGreen === true) {
      trueArray.push("Yellow Green");
    }    
    if (state.Others === true) {
      trueArray.push("Others");
    }
    
    colorCountryArr &&
      trueArray &&
      trueArray.map((e) => {
        const result = colorCountryArr.filter(({ color }) => color === e);
        
        console.log(result)

        //remove duplicates
        return orgResult = result.filter(
          (ele, ind) =>
            ind ===
            result.findIndex(
              (elem) => elem.name === ele.name && elem.name === ele.name
            ));
          });
      setOpen(true);
    }; 

  // runs upon load
  useEffect(() => {
    const fetchAPI = async () => {
      setData(await fetchData());
    };
    fetchAPI();
  }, []);

  // create the color btns
  const colorBtn = colors.map((color, index) => {
    return (
      <FormControlLabel
        key={index}
        control={
          <Checkbox
            checked={state.checked}
            onClick={handleChange}
            name={color}
          />
        }
        label={color}
      />
    );
  });

  // color grouping
  const colorCoding = (hex) => {
    let ratio;
    let color;

    if (hex === "#") {
      return;
    }
    var r = parseInt(hex.substring(1, 3), 16),
      g = parseInt(hex.substring(3, 5), 16),
      b = parseInt(hex.substring(5, 7), 16);
    iro = color = ratio = "";

    // 1-0
    if (g === b && r > g) {
      color = "#ff0000";
      iro = "Red";
      // 3-0
    } else if (r === g && r > b) {
      color = "#ffff00";
      iro = "Yellow";
      // 5-0
    } else if (r === b && g > r) {
      color = "#00ff00";
      iro = "Green";
      // 7-0
    } else if (g === b && g > r) {
      color = "#00ffff";
      iro = "Cyan";
      // 9-0
    } else if (r === g && b > r) {
      color = "#0000ff";
      iro = "Blue";
      // 11-0
    } else if (r === b && b > g) {
      color = "#ff00ff";
      iro = "Red";
    } else if (r > g && g > b) {
      // 1-2 G:0 ~ 4.5
      if ((g / r) * 16 > 0 && (g / r) * 16 <= 4.5) {
        color = "#ff0000";
        iro = "Red";
      }
      // 2-1,2-2 G:4.6 ~ 12.5
      else if ((g / r) * 16 > 4.5 && (g / r) * 16 <= 12.5) {
        color = "#ff7f00";
        iro = "Orange";
      }
      // 3-1 G:12.6 ~ 16
      else if ((g / r) * 16 > 12.5 && (g / r) * 16 <= 16) {
        color = "#ffff00";
        iro = "Yellow";
      }
    } else if (g > r && r > b) {
      // 3-2 R:16 ~ 12.6
      if ((r / g) * 16 > 12.5 && (r / g) * 16 <= 16) {
        color = "#ffff00";
        iro = "Yellow";
      }
      // 4-1,4-2 R:12.5 ~ 4.6
      else if ((r / g) * 16 > 4.5 && (r / g) * 16 <= 12.5) {
        color = "#7fff00";
        iro = "Yellow Green";
      }
      // 5-1 R:4.5 ~ 0
      else if ((r / g) * 16 > 0 && (r / g) * 16 <= 4.5) {
        color = "#7fff00";
        iro = "Yellow Green";
      }
    } else if (g > b && b > r) {
      // 5-2 B:0 ~ 4.5
      if ((b / g) * 16 > 0 && (b / g) * 16 <= 4.5) {
        color = "#00ff00";
        iro = "Green";
      }
      // 6-1,6-2 B:4.6 ~ 12.5
      else if ((b / g) * 16 > 4.5 && (b / g) * 16 <= 12.5) {
        color = "#00ff7f";
        iro = "Green";
      }
      // 7-1 B:12.6 ~ 16
      else if ((b / g) * 16 > 12.5 && (b / g) * 16 <= 16) {
        color = "#00ffff";
        iro = "Cyan";
      }
    } else if (b > g && g > r) {
      // 7-2 G:16 ~ 12.6
      if ((g / b) * 16 > 12.5 && (g / b) * 16 <= 16) {
        color = "#00ffff";
        iro = "Cyan";
      }
      // 8-1,8-2 G:12.5 ~ 4.6
      else if ((g / b) * 16 > 4.5 && (g / b) * 16 <= 12.5) {
        color = "#007fff";
        iro = "Sky Blue";
      }
      // 9-1 B:4.5 ~ 0
      else if ((g / b) * 16 > 0 && (g / b) * 16 <= 4.5) {
        color = "#0000ff";
        iro = "Blue";
      }
    } else if (b > r && r > g) {
      // 9-2 R:0 ~ 4.5
      if ((r / b) * 16 > 0 && (r / b) * 16 <= 4.5) {
        color = "#0000ff";
        iro = "Blue";
      }
      // 10-1,10-2 R:4.6 ~ 12.5
      else if ((r / b) * 16 > 4.5 && (r / b) * 16 <= 12.5) {
        color = "#7f00ff";
        iro = "Purple";
      }
      // 11-1 B:12.6 ~ 16
      else if ((r / b) * 16 > 12.5 && (r / b) * 16 <= 16) {
        color = "#ff00ff";
        iro = "Red";
      }
    } else if (r > b && b > g) {
      // 11-2 B:16 ~ 12.6
      if ((b / r) * 16 > 12.5 && (b / r) * 16 <= 16) {
        color = "#ff00ff";
        iro = "Red";
      }
      // 12-1,12-2 B:12.5 ~ 4.6
      else if ((b / r) * 16 > 4.5 && (b / r) * 16 <= 12.5) {
        color = "#ff007f";
        iro = "Red";
      }
      // 1-1 B:4.5 ~ 0
      else if ((b / r) * 16 > 0 && (b / r) * 16 <= 4.5) {
        color = "#ff0000";
        iro = "Red";
      }
    } else {
      iro = "Others";
    }

    return iro;
  };

  return (
    <div>
      {data.map((flag, i) => (
        <Palette
          key={i}
          label={flag.name}
          src={flag.flag}
          crossOrigin="anonymous"
          format="hex"
          colorCount={4}
        >
          {({ data }) => {
            data &&
              data.map((x) => {
                colorCoding(x);
                let colorCountry = {
                  name: flag.name,
                  color: iro,
                  src: flag.flag,
                };
                colorCountryArr.push(colorCountry);
                return colorCountryArr;
              });
          }}
        </Palette>
      ))}
      <div className={styles.container}>
        <div className={styles.searchBox}>
          <h4>Search by Colors</h4>
          <form onSubmit={submit}>
            <FormGroup>
              <ul className={styles.list}>{colorBtn}</ul>
            </FormGroup>
            <div id="loading"></div>
            <Button variant="contained" color="primary" type="submit">
              Search
            </Button>
            <Modal
                open={open}
                className={classes.modal}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                
                
                  <div className={classes.paper}>
                  <h2>Search Result:</h2>
                    <ul>
                      {orgResult && orgResult.map((e, i) => {
                      return <li key={i} className={styles.list}><img className={styles.flag} src={e.src}/> 
                      <p>{e.name}</p></li>
                      
                      })}
                    </ul>
                    <p>-- end of the display --</p>
                  </div>
            </Modal>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Flag;
