import { Box } from "@mui/material";
import { Theme } from "../../common/theme/theme";

export const BoxPanel = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: Theme.palette.backgroundColor.main,
        margin: "1rem",
        height: "10rem",
        width: "10rem",
        padding: "1rem",
      }}>
      {children}
    </Box>
  );
};
