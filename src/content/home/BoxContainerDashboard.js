import { Box } from "@mui/material";
import { Theme } from "../../common/theme/theme";
import { useMediaQuery } from "@mui/material";

export const BoxContainerDashboard = ({ to, children }) => {
  const maxWidth1000 = useMediaQuery(
    `(max-width: ${Theme.breakpoints.maxWidth1000})`
  );
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        background: Theme.palette.secondary.main,
        width: maxWidth1000 ? "22.5rem" : "55rem",
        textDecoration: "none",
        color: Theme.palette.secondary.contrastText,
      }}>
      {children}
    </Box>
  );
};
