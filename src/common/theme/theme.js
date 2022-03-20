import { createTheme } from "@mui/material/styles";

export const Theme = createTheme({
  palette: {
    primary: {
      main: "#000",
      contrastText: "#66cdaa",
    },
    secondary: {
      main: "#424242",
      contrastText: "#fff",
    },
  },
  breakpoints: {
    maxWidth1000: "1000px",
  },
});
