import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Theme } from "../../common/theme/theme";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PageWrapper } from "../../common/page-wrapper/page-wrapper";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useContext } from "react";
import { UserData } from "../../UserData/UserData";

export const Sign = ({ isSignUp }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleSurnameChange = e => {
    setSurname(e.target.value);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const db = getFirestore();
  const colRef = collection(db, "user-data");

  const creatueUserDocument = () => {
    if (isSignUp) {
      addDoc(colRef, {
        name: name,
        surname: surname,
        email: email,
        telephone: "",
        city: "",
        street: "",
        houseNumber: "",
        postcode: "",
        uid: "",
      });
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    const auth = getAuth();
    const method = isSignUp
      ? createUserWithEmailAndPassword
      : signInWithEmailAndPassword;

    method(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch(err => {
        alert(err);
      });
    creatueUserDocument();
  };
  return (
    <PageWrapper>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: Theme.palette.secondary.main,
          }}>
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
            sx={{ mt: 3, height: 500 }}>
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
                id="name"
                label="Imię"
                type="text"
                autoComplete="name"
                variant="filled"
                margin="normal"
                required
                fullWidth
                name="name"
                value={name}
                onChange={handleNameChange}
              />
            )}
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
                id="surname"
                label="Nazwisko"
                type="text"
                autoComplete="surname"
                variant="filled"
                margin="normal"
                required
                fullWidth
                name="surname"
                value={surname}
                onChange={handleSurnameChange}
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
                bgcolor: Theme.palette.secondary.contrastText,
                ":hover": { bgcolor: Theme.palette.primary.contrastText },
              }}
              bgcolor="secondary"
              type="submit">
              {isSignUp ? "Zarejestruj się" : "Zaloguj"}
            </Button>

            <Grid container>
              <Grid item>
                <Link to={isSignUp ? "/sign-in" : "/sign-up"}>
                  {isSignUp && (
                    <Typography
                      sx={{
                        textDecoration: "none",
                        color: "white",
                        underline: "none",
                      }}>
                      Masz już konto? Zaloguj się
                    </Typography>
                  )}
                  {!isSignUp && (
                    <Typography
                      sx={{
                        textDecoration: "none",
                        color: "white",
                        underline: "none",
                      }}>
                      Nie masz konta? Zarejestruj się!
                    </Typography>
                  )}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </PageWrapper>
  );
};
