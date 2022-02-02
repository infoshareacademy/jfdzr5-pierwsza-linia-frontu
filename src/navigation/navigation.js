import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Theme } from "../common/theme/theme";
import logo from "./home.png";
import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../userContext/UserContext";

const navItems = [
  { label: "Zadania", path: "/tasks" },
  { label: "Budżet", path: "/budget" },
  { label: "Kalendarz", path: "/calendar" },
  { label: "Dashboard", path: "/dashboard" },
  // { label: "Panel użytkownika", path: "/user-panel" },
];
export const Navigation = () => {
  const user = useContext(UserContext);
  const handleSignOutClick = () => {
    const auth = getAuth();
    signOut(auth);
  };
  return (
    <AppBar position="static" theme={Theme} color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton>
            <Avatar
              alt="home"
              variant="square"
              src={logo}
              component={Link}
              to="/"
            />
          </IconButton>
          {navItems.map(item => (
            <Button
              key={item.label}
              sx={{ my: 2, color: "inherit" }}
              component={Link}
              to={item.path}>
              {item.label}
            </Button>
          ))}
          {user ? (
            <Button sx={{ my: 2, color: "white" }} onClick={handleSignOutClick}>
              Wyloguj
            </Button>
          ) : (
            <Button
              sx={{ my: 2, color: "white" }}
              component={Link}
              to="/sign-in">
              Zaloguj
            </Button>
          )}
          {user && (
            <Button
              sx={{ my: 2, color: "white" }}
              component={Link}
              to="/user-panel">
              Panel użytkownika
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
