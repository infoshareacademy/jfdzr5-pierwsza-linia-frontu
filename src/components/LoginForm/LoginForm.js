import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Theme } from "../../common/theme/theme";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PageWrapper } from "../../common/page-wrapper/page-wrapper";

import {signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth} from 'firebase/auth'

export const Sign = ({ isSignUp }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    const method = isSignUp ? createUserWithEmailAndPassword : signInWithEmailAndPassword;

    method(auth, email, password)
        .then(() => {
            navigate('/');
        })
        .catch(err => {
            alert(err);
        })
}
  return (
    <PageWrapper>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: Theme.palette.secondary.main,
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
            <Icon>lock</Icon>
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignUp ? "Zarejestruj się!" : "Zaloguj się!"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3, height: 400 }}
          >
            {isSignUp && (
              <TextField
                sx={{
                  backgroundColor: "#808080",
                  width: {
                    lg: 400,
                  },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                id="username"
                label="Nazwa Użytkownika"
                type="text"
                autoComplete="username"
                variant="filled"
                margin="normal"
                required
                fullWidth
                name="username"
                value={username}
                onChange={handleUsernameChange}
              />
            )}
            <TextField
              sx={{
                backgroundColor: "#808080",
                width: {
                  lg: 400,
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              id="email"
              label="Adres email"
              type="email"
              autoComplete="email"
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              sx={{
                backgroundColor: "#808080",
                width: {
                  lg: 400,
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              id="password"
              label="Hasło"
              type="password"
              autoComplete="current-password"
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />

            <Button
              fullWidth
              sx={{
                mt: 3,
                mb: 5,
                bgcolor: "primary.contrastText",
                color: "secondary.contrastText",
              }}
              variant="contained"
              type="submit"
            >
              {isSignUp ? "Zarejestruj się" : "Zaloguj"}
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  // underline= "none"
                  // color="secondary"
                  to={isSignUp ? "/sign-in" : "/sign-up"}
                >
                  {isSignUp
                    ? "Masz już konto? Zaloguj się"
                    : "Nie masz konta? Zarejestruj się!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </PageWrapper>
  );
};
