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

const FormControlStyled = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 200,
}));

const SelectStyled = styled(Select)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: "white", // Text color for Select
  "& .MuiSelect-icon": {
    color: "white", // Icon color for Select
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white", // Border color for Select
    },
    "&:hover fieldset": {
      borderColor: "white", // Border color on hover for Select
    },
    "&.Mui-focused fieldset": {
      borderColor: "white", // Border color when focused for Select
    },
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "white", // Bottom border color for Select
  },
  "&:hover:not(.Mui-disabled):before": {
    borderBottomColor: "white", // Bottom border color on hover for Select
  },
  "&.Mui-focused:after": {
    borderBottomColor: "white", // Bottom border color when focused for Select
  },
  "& .MuiFormHelperText-root": {
    color: "white", // Helper text color for TextField
  },
}));

const InputRootStyled = styled(Box)(({ theme }) => ({
  "& > *": {
    margin: theme.spacing(1),
    width: 200,
  },
}));

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: "white", // Text color for TextField
  },
  "& .MuiInputLabel-root": {
    color: "white", // Label color for TextField
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "white", // Bottom border color for TextField
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: "white", // Bottom border color on hover
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white", // Bottom border color when focused for TextField
  },
  "& .MuiInput-underline.Mui-focused:after": {
    borderBottomColor: "white", // Bottom border color when focused
  },
  "& .MuiFormHelperText-root": {
    color: "white", // Helper text color for TextField
  },
}));

const LoaderRootStyled = styled(Box)(({ theme }) => ({
  width: "100%",
  "& > * + *": {
    marginTop: theme.spacing(2),
  },
}));

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
      // document.getElementById("place").value
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
    <div className="pt-2 text-white px-2 sm:px-4 md:px-6 lg:px-8">
      <Box display="flex" flexWrap="wrap" alignItems="center" mb={2}>
        <InputRootStyled className="w-full sm:w-auto mb-2 sm:mb-0">
          <form noValidate autoComplete="off" onSubmit={handleFormSubmit}>
            <TextFieldStyled
              id="name"
              variant="standard"
              label="Name"
              fullWidth
            />
          </form>
        </InputRootStyled>
        <InputRootStyled className="w-full sm:w-auto mb-2 sm:mb-0">
          <form noValidate autoComplete="off" onSubmit={handleFormSubmit}>
            <TextFieldStyled
              id="year"
              variant="standard"
              label="Year"
              fullWidth
            />
          </form>
        </InputRootStyled>
        <FormControlStyled className="w-full sm:w-auto mb-2 sm:mb-0">
          <FormControl variant="standard" fullWidth>
            <InputLabel id="conf-select-label" sx={{ color: "white" }}>
              Conferences
            </InputLabel>
            <SelectStyled
              labelId="conf-select-label"
              id="conf-select"
              variant="standard"
              value={conf}
              onChange={confChange}
            >
              {menuConf}
            </SelectStyled>
          </FormControl>
        </FormControlStyled>
        <FormControlStyled className="w-full sm:w-auto mb-2 sm:mb-0">
          <FormControl variant="standard" fullWidth>
            <InputLabel id="event-select-label" sx={{ color: "white" }}>
              Events
            </InputLabel>
            <SelectStyled
              labelId="event-select-label"
              id="event-select"
              variant="standard"
              value={event}
              onChange={eventChange}
            >
              {menuEvents}
            </SelectStyled>
          </FormControl>
        </FormControlStyled>
      </Box>
      <Box display="flex" justifyContent="center" mb={4}>
        <Button
          variant="contained"
          disableElevation
          color="primary"
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
              <i>You must enter in at least one field</i>
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
            <TableBody>{toRender}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}