import { createTheme } from "@mui/material/styles";

export const Theme = createTheme({
  palette: {
    primary: {
      main: "#154360",
      contrastText: "#B3AF34",
    },
    secondary: {
      main: "#2980B9",
      contrastText: "#fff",
    },
    backgroundColor: {
      main: "#5499C7 ",
    },
  },
  breakpoints: {
    maxWidth1000: "1000px",
  },
});
