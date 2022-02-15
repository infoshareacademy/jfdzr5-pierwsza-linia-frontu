import { Box } from "@mui/material";

export const BoxPanel = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#808080",
        margin: "1rem",
        height: "10rem",
        width: "10rem",
        padding: "1rem",
      }}>
      {children}
    </Box>
  );
};
