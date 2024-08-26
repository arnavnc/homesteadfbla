import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, styled } from "@mui/system";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#fdcfcb',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: '#ffffff',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: '#fdcfcb',
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottomColor: '#fdcfcb',
          },
          '&:after': {
            borderBottomColor: '#ffffff',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff', // Text color
          backgroundColor: '#5a1729', // Dark red background color
          '&:hover': {
            backgroundColor: '#6e1c32', // Slightly lighter red on hover
          },
        },
      },
    },
  },
});



export default function CompetitionsHistoryComponent(props) {
  let menuEvents = [];
  let menuConf = [];

  menuEvents.push(<MenuItem value="" key="none-events">None</MenuItem>);
  for (let i = 0; i < props.events.length; i++) {
    menuEvents.push(
      <MenuItem value={props.events[i]} key={props.events[i]}>
        {props.events[i]}
      </MenuItem>
    );
  }
  menuConf.push(<MenuItem value="" key="none-conf">None</MenuItem>);
  for (let i = 0; i < props.conferences.length; i++) {
    menuConf.push(
      <MenuItem value={props.conferences[i]} key={props.conferences[i]}>
        {props.conferences[i]}
      </MenuItem>
    );
  }

  const [conf, setConf] = React.useState("");
  const [event, setEvent] = React.useState("");

  const confChange = (event) => {
    setConf(event.target.value);
  };

  const eventChange = (event) => {
    setEvent(event.target.value);
  };

  const query = () => {
    props.compsHistoryQuery(
      document.getElementById("name").value,
      document.getElementById("year").value,
      conf,
      event
    );
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  let toRender = [];

  let byYear = props.compsHistory.slice(0);
  byYear.sort(function (a, b) {
    return b.year - a.year;
  });

  byYear.map((row) => {
    let tableRow = (
      <TableRow key={row.name}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.year}</TableCell>
        <TableCell align="right">{row.conference}</TableCell>
        <TableCell align="right">{row.event}</TableCell>
        <TableCell align="right">{row.place}</TableCell>
      </TableRow>
    );
    if (!toRender.includes(tableRow)) toRender.push(tableRow);
  });

  return (
    <div className="pt-2 text-white px-2 sm:px-4 md:px-6 lg:px-8 ">
      <ThemeProvider theme={theme}>
        <Box display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={2}>
          <Box sx={{width: 200}} mx={2}>
            <form noValidate autoComplete="off" onSubmit={handleFormSubmit}>
              <TextField id="name" variant="standard" label="Full Name" fullWidth />  
            </form>
          </Box>
          <Box sx={{width: 200}} mx={2}>
            <form noValidate autoComplete="off" onSubmit={handleFormSubmit}>
              <TextField id="year" variant="standard" label="Year" fullWidth />
            </form>
          </Box>
          <Box sx={{width: 200}} mx={2}>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="conf-select-label">
                Conferences
              </InputLabel>
              <Select labelId="conf-select-label" id="conf-select" variant="standard" value={conf} onChange={confChange}>
                {menuConf}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{width: 200}} mx={2}>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="event-select-label">
                Events
              </InputLabel>
              <Select labelId="event-select-label" id="event-select" variant="standard" value={event} onChange={eventChange}>
                {menuEvents}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" mb={4}>
          <Button
            variant="contained"
            disableElevation
            // color="primary"
            onClick={query}
            className="w-full sm:w-auto"
          >
            Search
          </Button>
        </Box>

        <Box display="flex" justifyContent="center">
          {props.nothingEntered && (
            <div className="justify-content-md-center">
              <h2 className="text-xl">
                <i>*You must enter in at least one field</i>
              </h2>
            </div>
          )}
        </Box>

        <Box>
          <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Year</TableCell>
                  <TableCell align="right">Conference</TableCell>
                  <TableCell align="right">Event</TableCell>
                  <TableCell align="right">Place</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {toRender}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </ThemeProvider>
    </div>
  );
}
