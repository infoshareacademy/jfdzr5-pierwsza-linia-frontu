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
import { DialogValidation } from "./DialogValidation";

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
  const [errors, setErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openValidationDialog, setOpenValidationDialog] = useState(false);
  const emailValidation = error => {
    setOpenValidationDialog(true);
    setErrors(true);
    switch (error) {
      case "auth/invalid-email":
        console.log(error);
        setErrorMessage("B????dny format adresu emaila");
        break;
      case "auth/user-not-found":
        console.log(error);
        setErrorMessage("Nie znaleziono u??ytkownika z tym adresem e-mail");
        break;
      case "auth/email-already-in-use":
        console.log(error);
        setErrorMessage("Ten adres email zosta?? ju?? u??yty");
        break;
      case "auth/wrong-password":
        console.log(error);
        setErrorMessage("Niepoprawne has??o");
        break;
      case "auth/internal-error":
        console.log(error);
        setErrorMessage("B????d autoryzacji. Wprowadz poprawny login i has??o");
        break;
        default :
        console.log(error);
        setErrorMessage(error);
    }
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
          emailValidation(err.code);
          console.log(err.code);
        });
    } else {
      setOpenValidationDialog(true);
      setErrors(true);
      if (name.length <= 2) {
        setErrorMessage("Imi?? powinno posiada?? minimum trzy znaki");
      } else if (surname.length <= 2) {
        setErrorMessage("Nazwisko powinno posiada?? minimum trzy znaki");
      } else if (password.length <= 5) {
        setErrorMessage("Has??o musi zawiera?? minimum sze???? znak??w");
      } else if (password !== confirmPassword) {
        setErrorMessage("Podane has??a nie s?? identyczne");
      } else {
        method(auth, email, password)
          .then(() => {
            creatueUserDocument();
            navigate("/");
          })
          .catch(err => {
            emailValidation(err.code);
            console.log(err.code);
          });
      }
    }
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setOpenValidationDialog(false);
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
        alert(`Link do zmiany has??a zosta?? wys??any na adres ${resetEmail}`);
        handleClose();
      })
      .catch(err => {
        emailValidation(err.code);
        console.log(err.code);
      });
  };

  return (
    <PageWrapper>
      {errors && (
        <DialogValidation
          title={errorMessage}
          openValidationDialog={openValidationDialog}
          handleClose={handleClose}
        />
      )}

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
            {isSignUp ? "Zarejestruj si??!" : "Zaloguj si??!"}
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
                label="Imi??"
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
              label="Has??o"
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
                label="Potwierdz has??o"
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
              {isSignUp ? "Zarejestruj si??" : "Zaloguj"}
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
                    Nie pami??tasz has??a? Kliknij tutaj.
                  </Typography>
                )}
                {resetPassword && (
                  <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                      Wprowadz sw??j adres email
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
                          Wy??lij
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
                      Masz ju?? konto? Zaloguj si??
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
                        Nie masz konta? Zarejestruj si??!
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
