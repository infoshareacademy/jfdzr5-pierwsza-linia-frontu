import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Theme } from "../../common/theme/theme";
export const BoxContainerUnlogged = ({ children }) => {
  return (
    <Box
      sx={{
        background: Theme.palette.secondary.main,
        margin: "2rem",
        padding: "1rem",
        width: "20rem",
        height: "15rem",
        border: "3px solid transparent",
        borderCollapse: "collapse",
        textDecoration: "none",
        color: Theme.palette.secondary.contrastText,
      }}>
      {children}
    </Box>
  );
};
