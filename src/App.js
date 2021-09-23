/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload :)
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

import "./styles.css";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Slider,
  Grid,
  Fab,
  TextField
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import UndoIcon from "@material-ui/icons/Undo";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";

import { alpha, makeStyles } from "@material-ui/core/styles";

const NB_COLS = 2000;
const NB_ROWS = 1;
const COLOR1 = "red";
const COLOR2 = "purple";

export function AlertDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        info
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"information"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cette application permet de tester le champ visuel, de façon à
            repérer les zones que vous ne voyez pas. En premier lieu il convient
            de placer un point de référence (pour cela cliquez sur l'endroit
            choisi) que vous fixerez des yeux pendant le reste du test.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description1">
            Comment procéder : ajoutez des points supplémentaires (en visant où
            vous ne voyez pas), ou en cliquant sur le bouton "+". Si vous voyez
            le point que vous venez d'afficher, effacez le (en cliquant sur le
            bouton annuler) de façon à ne garder que les points que vous ne
            voyez pas.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description2">
            En l'état actuel, cette application n'enregistre rien nulle part. Si
            vous avez besoin de sauvegarder le résultat de votre test, il est
            recommandé d'utiliser la fonction 'capture d'écran' de votre
            appareil, puis de partager cette capture. A faire régulièrement pour
            voir l'évolution de votre déficit, par exemple toutes les semaines.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description3">
            version 1.0.0
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

//////////// SQUARES
class Square extends React.Component {
  constructor(props) {
    super(props);

    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var chaactersLength = characters.length;
    var randomChar = characters.charAt(
      Math.floor(Math.random() * chaactersLength)
    );
    this.state = {
      text: randomChar
    };
  }

  render() {
    return (
      <button
        className="square"
        style={{ backgroundColor: this.props.color }}
        onClick={() => this.props.onClick()}
      >
        {this.state.text}
      </button>
    );
  }
}

//////////// BOARD
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board_nb_rows: NB_ROWS,
      board_nb_cols: NB_COLS,
      squares: Array(NB_ROWS * NB_COLS).fill(null)
    };
  }

  /*handleClick(i) {
    const squares = this.props.squares.slice();
    squares[i] = "red";
    this.setState({ squares: squares });
  }*/

  renderSquare(row, col) {
    var i = row + this.props.cols * col;
    var cell_id = "cell-" + i;
    //const squares = this.state.squares.slice();

    return (
      <Square
        key={cell_id}
        color={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        //onClick={() => this.handleClick(row + this.state.board_nb_cols * col)}
      />
    );
  }

  render() {
    var row = [];
    var myBoard = [[]];
    var i = 0;
    var j = 0;

    for (j = 0; j < this.state.board_nb_rows; j++) {
      for (i = 0; i < this.props.cols; i++) {
        var jsx_cellContent = this.renderSquare(i, j);
        row.push(jsx_cellContent);
      }

      var row_id = "row-" + j;
      var jsx_rowContent = (
        <div key={row_id} className="board-row">
          {row}
        </div>
      );
      myBoard.push(jsx_rowContent);
      row = [];
    }

    return (
      /*addEventListener("contextmenu", function (e) {
        e.preventDefault();
      }),*/
      <div>{myBoard}</div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: NB_ROWS,
      cols: NB_COLS,
      history: [
        {
          squares: Array(NB_ROWS * NB_COLS).fill(null)
        }
      ],
      isFirstSquareSet: false
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.state.isFirstSquareSet) {
      squares[i] = COLOR2;
    } else {
      squares[i] = COLOR1;
    }
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      isFirstSquareSet: true
    });
  }

  handleUndo() {
    var boardHistory = this.state.history;
    boardHistory.pop(); // removes last element from array :)
    let isFirstSquareSet = false;
    if (boardHistory.length === 1) {
      isFirstSquareSet = false;
    } else {
      isFirstSquareSet = true;
    }
    this.setState({
      history: boardHistory,
      isFirstSquareSet: isFirstSquareSet
    });
  }

  handleAddRandomPoint() {
    let randomChar = Math.floor(Math.random() * this.state.cols);
    this.handleClick(randomChar);
    //this.handleClick(3);
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const defaultDate = new Date();
    const defaultDateTimeValue = defaultDate.getUTCFullYear;

    return (
      <Container className="game" maxWidth="xl">
        <Grid
          container
          spacing={3}
          zIndex={4}
          style={{
            height: 40,
            position: "fixed",
            bottom: 70,
            zIndex: 3
          }}
        >
          <Grid item xs={1}>
            <Fab
              className="floatingButton"
              disabled={!this.state.isFirstSquareSet}
              color="secondary"
              variant="extended"
              onClick={() => this.handleUndo()}
            >
              <UndoIcon />
              Annuler
            </Fab>
          </Grid>{" "}
          <Grid item xs={8}></Grid>
          <Grid item xs={2}>
            <Fab
              color="primary"
              disabled={!this.state.isFirstSquareSet}
              variant="extended"
              onClick={() => this.handleAddRandomPoint()}
            >
              <AddCircleTwoToneIcon />
              Ajouter
            </Fab>
          </Grid>
        </Grid>

        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <VisibilityTwoToneIcon />
            </IconButton>
            <Typography variant="h5">JVoiPa</Typography>
          </Toolbar>
        </AppBar>

        <Grid container spacing={3}>
          <Grid item xs={12}></Grid>

          <Grid item xs={3}>
            <TextField
              label="distance/écran (cm)"
              size="small"
              defaultValue="40"
              variant="outlined"
              aria-describedby="my-helper-text"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="taille CB (cases)"
              size="small"
              defaultValue="24"
              variant="outlined"
              aria-describedby="my-helper-text"
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              id="datetime-local"
              label="date et heure"
              type="datetime-local"
              variant="outlined"
              size="small"
              defaultValue={defaultDateTimeValue}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={3}></Grid>

          <Grid item xs={12}>
            <Typography variant="caption">taille de la grille :</Typography>
            <Slider
              onChange={(event, val) => this.setState({ cols: val })}
              defaultValue={this.state.cols}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={250}
              marks
              min={250}
              max={10000}
            />
          </Grid>
          <Grid item xs={12}>
            <Board
              cols={this.state.cols}
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </Grid>
        </Grid>
        <AlertDialog />
      </Container>
    );
  }
}
//
export default function App() {
  return <Game />;
}
