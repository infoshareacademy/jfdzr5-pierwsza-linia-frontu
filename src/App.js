import { Navigation } from "./navigation/navigation";
import { Content } from "./content/content";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "./common/theme/theme";
import { UserContextProvider } from "./userContext/UserContext";
import { UserDataProvider } from "./UserData/UserData";

function App() {
  return (
    <>
      <UserContextProvider>
        <UserDataProvider>
          <ThemeProvider theme={Theme}>
            <Navigation />
            <Content />
          </ThemeProvider>
        </UserDataProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
