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
import React, { useEffect } from "react";
//import ReactDOM from 'react-dom'
import Favicon from 'react-favicon'

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
  TextField,
  useMediaQuery,
  Tooltip
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import UndoIcon from "@material-ui/icons/Undo";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import FeedbackTwoToneIcon from '@material-ui/icons/FeedbackTwoTone';
import HelpTwoToneIcon from '@material-ui/icons/HelpTwoTone';
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import CopyrightTwoToneIcon from "@material-ui/icons/CopyrightTwoTone";

import { alpha, makeStyles, ThemeProvider, useTheme, createTheme } from "@material-ui/core/styles";

// Google Analytics
import ReactGA from 'react-ga';
ReactGA.initialize('UA-208517761-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const NB_COLS = 2000;
const NB_ROWS = 1;
const COLOR1 = "red";
const COLOR2 = "purple";

/////////// FEEDBACK FORM
export function FeedbackFormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton color="action" onClick={handleClickOpen}>
        <FeedbackTwoToneIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfCD3hg_ACPlpMnPdf_DyKiAk4uofXhwlcreVrR203JoyI6dA/viewform?embedded=true" width="500" height="3062" frameborder="0" marginheight="0" marginwidth="0" > Loading…</iframe>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


/////////// INFORMATION POP-UP WINDOW
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
      <IconButton color="action" onClick={handleClickOpen}>
        <HelpTwoToneIcon />
      </IconButton>
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
            version 1.2.0
          </DialogContentText>
          <DialogContentText id="alert-dialog-description4">
            merci au Dr Flabeau du Centre Hospitalier de la Côte Basque pour l'idée de l'app.
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

/////////// COPYRIGHT POP-UP WINDOW
export function CopyrightDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton color="action" onClick={handleClickOpen}>
        <CopyrightTwoToneIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Copyright: logiciel libre"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cette application est de type "open source" c'est à dire libre de droit.
          </DialogContentText>
          <DialogContentText>
            Copyright (c) 2021 klemousse
          </DialogContentText>
          <DialogContentText>
            Par la présente, une autorisation est accordée gratuitement à toute personne obtenant une copie de ce logiciel et des fichiers de documentation associés (le "Logiciel"), afin de traiter le logiciel sans restriction, y compris, sans limitation, les droits d'utilisation, de copie, de modification et de fusion. , publiez, distribuez, concédez en sous-licence et / ou vendez des copies du logiciel, et autorisez les personnes à qui le logiciel est fourni à le faire, sous réserve des conditions suivantes:
          </DialogContentText>
          <DialogContentText>
            L'avis de copyright ci-dessus et cet avis de permission doivent être inclus dans toutes les copies ou parties substantielles du logiciel.
          </DialogContentText>
          <DialogContentText>
            LE LOGICIEL EST FOURNI "EN L'ETAT", SANS AUCUNE GARANTIE, EXPRESSE OU IMPLICITE, Y COMPRIS DE MANIÈRE NON LIMITÉE À LA GARANTIE DE QUALITÉ MARCHANDE, D'ADÉQUATION À UN USAGE PARTICULIER ET D'INFRACTION. EN AUCUN CAS, LES AUTEURS OU LES TITULAIRES DE COPYRIGHT NE PEUVENT ÊTRE TENUS RESPONSABLES DE TOUTE RÉCLAMATION, DE DOMMAGES OU D'AUTRE RESPONSABILITÉ, QU'IL SOIT PAR UN ACTION DE CONTRAT, DE LORT OU DE AUTRE QUE CE SOIT, OU LIÉ AU LOGICIEL OU À L'UTILISATION OU AUTRE LOGICIEL.
          </DialogContentText>
          <DialogContentText>
            credits: icône de l'app tirée de...
            <a href="https://icons8.com/icon/mHBAv5xJ2dcq/eye">Icons8</a>
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
      //board_nb_rows: NB_ROWS,
      //board_nb_cols: NB_COLS,
      //      squares: Array(NB_ROWS * NB_COLS).fill(null)
      squares: Array(this.props.rows * this.props.cols).fill(null)
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

    for (j = 0; j < this.props.rows; j++) {
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
      isFirstSquareSet: false,
      nbClickedBoxes: 0
    };
  }

  targetNbOfRows() {
    return 1;
  }

  targetNbOfCols() {
    var c = 0;
    switch (this.props.w.appWidth) {
      case 'xl': c = 6000; break;
      case 'lg': c = 3500; break;
      case 'md': c = 2500; break;
      case 'sm': c = 1700; break;
      case 'xs': c = 1000; break;
      default: c = 10;
    }
    return c;
  }

  numberOfColouredBoxes() {

    return (this.state.nbClickedBoxes)
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    this.state.nbClickedBoxes++;

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
    this.state.nbClickedBoxes--;
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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <VisibilityTwoToneIcon />
            </IconButton>
            <Typography variant="h6" >JVoiPa</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip title="xxx"><FeedbackFormDialog /></Tooltip>
            <AlertDialog />
            <CopyrightDialog />
          </Toolbar>

        </AppBar>

        <Container className="game" maxWidth="xl">
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
            zIndex={4}
            style={{
              height: 40,
              position: "fixed",
              bottom: 70,
              zIndex: 3
            }}
          >
            <Grid item xs={5} sm={4} md={3} lg={2} xl={1}>
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
            <Grid item xs sm md lg xl></Grid>
            <Grid item xs={5} sm={4} md={3} lg={2} xl={2}>
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


          <Grid
            container
            spacing={1}
            direction="row"
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={12}></Grid>

            <Grid item xs={12} sm={5} md={3} lg={3} xl={2}>
              <Button
                variant="outlined"
                color="secondary"
              //className="square"
              >
                zones déficitaires : {
                  (() => {
                    switch (this.state.nbClickedBoxes) {
                      case 0: return 0;
                      case 1: return 0;
                      default: return this.state.nbClickedBoxes - 1;
                    }
                  })()}
              </Button>

            </Grid>
            <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
              <TextField
                id="datetime-local"
                label="date et heure"
                type="datetime-local"
                variant="outlined"
                size="small"
                //defaultValue={defaultDateTimeValue}
                //defaultValue={new Date().getFullYear()+"-02-02T21:11:22"}
                defaultValue={new Date().toJSON().slice(0, 19)}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg xl>
              <Tooltip title="distance à laquelle vous vous tenez de l'écran, nombre de cases pour faire la largeur d'une carte bleue, appareil utilisé, ...">
                <TextField
                  fullWidth
                  label="commentaires"
                  size="small"
                  //defaultValue="40"
                  variant="outlined"
                  aria-describedby="my-helper-text"
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} hidden='true'>
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
                rows={this.targetNbOfRows()}
                cols={this.targetNbOfCols()}
                //                cols={this.state.cols}
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
              />
            </Grid>
          </Grid>


        </Container>
      </Box >
    );
  }
}
//

function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

export default function App() {
  const appWidth = useWidth();

  // set the App title (the one visible in browser tabs)
  useEffect(() => {
    document.title = "JvoiPa"
  }, [])

  return <Box>
    <Favicon url='https://img.icons8.com/plumpy/24/000000/visible--v1.png' />
    <Game w={{ appWidth }} />
  </Box>;
}
