import { Box } from "@mui/material";
import { Theme } from "../../common/theme/theme";
export const BoxContainerDashboard = ({ to, children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",

        background: Theme.palette.secondary.main,
        minWidth: "35rem",
        maxWidth: "55rem",
        height: "25rem",
        textDecoration: "none",
        color: Theme.palette.secondary.contrastText,
      }}>
      {children}
    </Box>
  );
};
