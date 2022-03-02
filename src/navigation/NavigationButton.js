import { Theme } from "../common/theme/theme";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const NavigationButton = ({ to, item }) => {
  return (
    <Button
      sx={{
        margin: "2px",
        my: 2,
        color: "inherit",
        border: `2px solid ${Theme.palette.secondary.main}`,
        borderRadius: "0px",
        transition: "all",
        transitionDuration: "0.3s",
        ":hover": {
          color: Theme.palette.primary.contrastText,
          border: `2px solid ${Theme.palette.primary.contrastText}`,
          borderRadius: "none",
        },
      }}
      component={Link}
      to={to}>
      {item.label}
    </Button>
  );
};
