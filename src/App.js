import { Navigation } from "./navigation/navigation";
import { Content } from "./content/content";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "./common/theme/theme";

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