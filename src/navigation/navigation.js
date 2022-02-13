import { useNavigate, Link } from "react-router-dom";
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
import { NavigationButton } from "./NavigationButton";
import styled from "@emotion/styled";

const ButtonsContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`;

const navItems = [
  { label: "Zadania", path: "/tasks" },
  { label: "Budżet", path: "/budget" },
  { label: "Kalendarz", path: "/calendar" },
  { label: "Dashboard", path: "/dashboard" },
  // { label: "Panel użytkownika", path: "/user-panel" },
];
export const Navigation = () => {


  const navigate = useNavigate();

  // const user = useContext(UserContext);
  const { user, avatarUrl } = useContext(UserContext);

  const handleSignOutClick = () => {
    const auth = getAuth();
    signOut(auth)
    .then(() => {
      navigate("/");
      alert('Zostałeś wylogowany');
    });
  };
  return (
    <AppBar position="static" theme={Theme} color="secondary">
      <Container maxWidth="xl">
        <Toolbar sx={{ flexWrap: "wrap" }} disableGutters>
          <IconButton>
            <Avatar
              alt="home"
              variant="square"
              src={logo}
              component={Link}
              to="/"
            />
          </IconButton>
          {navItems.map(
            item => user && <NavigationButton to={item.path} item={item} />
          )}
          {user ? (
            <ButtonsContainer>
              <Avatar
                variant="square"
                src={avatarUrl}
                alt="avatar"
                sx={{
                  marginRight: "10px",
                  backgroundColor: "black",
                  padding: "1px",
                }}
              />
              <Button
                sx={{
                  margin: "2px",
                  my: 2,
                  color: "inherit",
                  border: `2px solid ${Theme.palette.secondary.main}`,
                  borderRadius: "0px",
                  transition: "all",
                  transitionDuration: "0.3s",
                  ":hover": {
                    color: Theme.palette.primary.contrastText,
                    border: `2px solid ${Theme.palette.primary.contrastText}`,
                    borderRadius: "none",
                  },
                }}
                component={Link}
                to="/user-panel">
                Panel użytkownika
              </Button>
              <Button
                sx={{
                  margin: "2px",
                  my: 2,
                  color: "inherit",
                  border: `2px solid ${Theme.palette.secondary.main}`,
                  borderRadius: "0px",
                  transition: "all",
                  transitionDuration: "0.3s",
                  ":hover": {
                    color: Theme.palette.primary.contrastText,
                    border: `2px solid ${Theme.palette.primary.contrastText}`,
                    borderRadius: "none",
                  },
                }}
                onClick={handleSignOutClick}>
                Wyloguj
              </Button>
            </ButtonsContainer>
          ) : (
            <ButtonsContainer>
              <Button
                sx={{
                  my: 2,
                  color: "inherit",
                  border: `2px solid ${Theme.palette.secondary.main}`,
                  borderRadius: "0px",
                  transition: "all",
                  transitionDuration: "0.4s",
                  ":hover": {
                    color: Theme.palette.primary.contrastText,
                    border: `2px solid ${Theme.palette.primary.contrastText}`,
                    borderRadius: "none",
                  },
                }}
                component={Link}
                to="/sign-in">
                Zaloguj
              </Button>
            </ButtonsContainer>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
