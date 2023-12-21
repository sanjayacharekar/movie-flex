import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  Chip,
  InputLabel,
  FormControl,
  Button,
  makeStyles,
  Grid,
  Paper,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  formControl: {
    minWidth: 200,
    marginRight: theme.spacing(2),
    "& .MuiSelect-root": {
      background: "#0D1F22", // Set background color
      color: "white", // Set text color
    },
    "& .MuiInputLabel-root": {
      color: "white !important", // Set placeholder color to white
    },
  },
  button: {
    marginTop: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  // Add this style for the dropdown menu
  menu: {
    background: "#0D1F22", // Set background color
    color: "white", // Set text color
  },
}));

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const classes = useStyles();
  const [selectedGenre, setSelectedGenre] = useState([]);

  const handleAdd = () => {
    if (selectedGenre.length > 0) {
      const genresToAdd = genres.filter((genre) =>
        selectedGenre.includes(genre.id)
      );
      setSelectedGenres([...selectedGenres, ...genresToAdd]);
      setGenres(genres.filter((g) => !selectedGenre.includes(g.id)));
      setPage(1);
      setSelectedGenre([]);
    }
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async (type) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    // Fetch genres on component mount
    fetchGenres(type);

    return () => {
      setGenres([]); // unmounting
    };
    // eslint-disable-next-line
  }, [type]);

  const handleDropdownChange = (event) => {
    // Fetch genres when dropdown selection changes
    const selectedType = event.target.value;
    fetchGenres(selectedType);
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl className={classes.formControl}>
          <InputLabel id="genres-label">Select Genres</InputLabel>
          <Select
            labelId="genres-label"
            id="genres-select"
            multiple
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              handleDropdownChange(e);
            }}
            MenuComponent={(props) => (
              <Paper
                {...props}
                className={classes.menu} // Apply styles to the dropdown menu
              />
            )}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={handleAdd}
          disabled={selectedGenre.length === 0}
        >
          Add
        </Button>
      </Grid>
      <Grid item xs={12}>
        <div>
          {selectedGenres.map((genre) => (
            <Chip
              className={classes.chip}
              label={genre.name}
              key={genre.id}
              color="primary"
              clickable
              size="small"
              onDelete={() => handleRemove(genre)}
            />
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default Genres;
