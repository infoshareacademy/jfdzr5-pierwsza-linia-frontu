import { Navigation } from "./navigation/navigation";
import { Content } from "./content/content";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "./common/theme/theme";
import { UserContextProvider } from "./userContext/UserContext";
import { Footer } from "./components/Footer/Footer";

function App() {
  return (
    <>
      <UserContextProvider>
        <ThemeProvider theme={Theme}>
          <Navigation />
          <Content />
          <Footer />
        </ThemeProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
