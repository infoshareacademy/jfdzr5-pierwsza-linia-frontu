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

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import styled from "@emotion/styled";
import { EditTextField } from "../UserPanel/text-field/EditTextField";

const ResetButtonContainer = styled.div`
  display: flex;
  // flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
`;

export const Sign = ({ isSignUp }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword, setResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const navigate = useNavigate();

  const handleNameChange = e => {
    let nameUpperCase = "";
    nameUpperCase = toUpperCaseFirstLetter(e.target.value);
    setName(nameUpperCase);
  };

  const handleSurnameChange = e => {
    let surnameUpperCase = "";
    surnameUpperCase = toUpperCaseFirstLetter(e.target.value);
    setSurname(surnameUpperCase);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirm = e => {
    setConfirmPassword(e.target.value);
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
  const toUpperCaseFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const auth = getAuth();
    const method = isSignUp
      ? createUserWithEmailAndPassword
      : signInWithEmailAndPassword;
    if (!isSignUp) {
      method(auth, email, password)
        .then(() => {
          navigate("/");
        })
        .catch(err => {
          alert(err);
        });
    } else {
      if (name.length <= 2) {
        alert("Imię powinno posiadać minimum trzy znaki");
      } else if (surname.length <= 2) {
        alert("Nazwisko powinno posiadać minimum trzy znaki");
      } else if (password.length <= 5) {
        alert("Hasło musi zawierać minimum sześć znaków");
      } else if (password !== confirmPassword) {
        alert("Podane hasła nie są identyczne");
        console.log(confirmPassword);
      } else {
        method(auth, email, password)
          .then(() => {
            navigate("/");
          })
          .catch(err => {
            alert(err);
          });
        creatueUserDocument();
      }
    }
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleResetPassoword = () => {
    setResetPassword(true);
    setOpen(true);
  };
  const handleSendResetLink = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        // Password reset email sent!
        // ..
        alert(`Link do zmiany hasła został wysłany na adres ${resetEmail}`);
        handleClose();
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(error);
      });
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
                  bgcolor: Theme.palette.secondary.contrastText,
                  ":hover": { bgcolor: Theme.palette.primary.contrastText },
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
                  bgcolor: Theme.palette.secondary.contrastText,
                  ":hover": { bgcolor: Theme.palette.primary.contrastText },
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
                bgcolor: Theme.palette.secondary.contrastText,
                ":hover": { bgcolor: Theme.palette.primary.contrastText },
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
                bgcolor: Theme.palette.secondary.contrastText,
                ":hover": { bgcolor: Theme.palette.primary.contrastText },
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
            {isSignUp && (
              <TextField
                sx={{
                  bgcolor: Theme.palette.secondary.contrastText,
                  ":hover": { bgcolor: Theme.palette.primary.contrastText },
                  width: {
                    lg: 400,
                  },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                id="confirm-password"
                label="Potwierdz hasło"
                type="password"
                autoComplete="current-password"
                variant="filled"
                margin="normal"
                required
                fullWidth
                name="password"
                value={confirmPassword}
                onChange={handlePasswordConfirm}
              />
            )}

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
                {!isSignUp && (
                  <Typography
                    onClick={handleResetPassoword}
                    sx={{
                      textDecoration: "none",
                      color: "white",
                      underline: "none",
                      marginBottom: "20px",
                      cursor: "pointer",
                    }}>
                    Nie pamiętasz hasła? Kliknij tutaj.
                  </Typography>
                )}
                {resetPassword && (
                  <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                      Wprowadz swój adres email
                    </DialogTitle>
                    <DialogActions>
                      <ResetButtonContainer>
                        <EditTextField
                          value={resetEmail}
                          onChange={e => setResetEmail(e.target.value)}
                          label="Adres email"
                        />
                      </ResetButtonContainer>
                      <ResetButtonContainer>
                        <Button
                          sx={{
                            margin: "5px 5px 5px auto",
                            background: Theme.palette.secondary.main,
                            color: Theme.palette.secondary.contrastText,
                            border: `2px solid ${Theme.palette.secondary.main}`,
                            borderRadius: "0px",
                            transition: "all",
                            transitionDuration: "0.3s",
                            ":hover": {
                              color: Theme.palette.primary.main,
                              background: Theme.palette.primary.contrastText,
                              border: `2px solid ${Theme.palette.primary.contrastText}`,
                              borderRadius: "0",
                            },
                          }}
                          onClick={handleClose}>
                          Anuluj
                        </Button>
                        <Button
                          sx={{
                            margin: "5px auto 5px 5px",
                            background: Theme.palette.secondary.main,
                            color: Theme.palette.secondary.contrastText,
                            border: `2px solid ${Theme.palette.secondary.main}`,
                            borderRadius: "0px",
                            transition: "all",
                            transitionDuration: "0.3s",
                            ":hover": {
                              color: Theme.palette.primary.main,
                              background: Theme.palette.primary.contrastText,
                              border: `2px solid ${Theme.palette.primary.contrastText}`,
                              borderRadius: "0",
                            },
                          }}
                          onClick={handleSendResetLink}>
                          Wyślij
                        </Button>
                      </ResetButtonContainer>
                    </DialogActions>
                  </Dialog>
                )}

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
                    <>
                      <Typography
                        sx={{
                          textDecoration: "none",
                          color: "white",
                          underline: "none",
                        }}>
                        Nie masz konta? Zarejestruj się!
                      </Typography>
                    </>
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
