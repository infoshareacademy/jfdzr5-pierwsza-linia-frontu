import { Navigation } from "./navigation";
import { Content } from "./content";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "./common/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Navigation />
        <Content />
      </ThemeProvider>
    </>
  );
}

export default App;
