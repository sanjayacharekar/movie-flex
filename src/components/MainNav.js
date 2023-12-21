import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TvIcon from "@material-ui/icons/Tv";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: '#0D1F22', // Use the primary color from your theme
    zIndex: 100,
    borderTop: `1px solid ${theme.palette.primary.light}`, // Add a light border at the top
  },
  icon: {
    fontSize: "1.5rem", // Adjust the icon size
  },
  label: {
    fontSize: "0.8rem", // Adjust the label font size
  },
}));

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  useEffect(() => {
    if (value === 0) {
      history.push("/");
    } else if (value === 1) {
      history.push("/search");
    }
  }, [value, history]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Movies"
        icon={<MovieIcon className={classes.icon} />}
        classes={{ label: classes.label }} // Apply the label style
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Search"
        icon={<SearchIcon className={classes.icon} />}
        classes={{ label: classes.label }} // Apply the label style
      />
    </BottomNavigation>
  );
}
