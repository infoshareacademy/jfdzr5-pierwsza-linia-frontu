import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Theme } from "../../../common/theme/theme";
import { useState } from "react";
import { PassowrdTextField } from "../text-field/PasswordTextField";
import styled from "@emotion/styled";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  getAuth,
  deleteUser,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const DeleteButtonContainer = styled.div`
  display: flex;
  // flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
`;
export const DeleteUser = ({ setDeleteUser, open, setOpen, userEmail }) => {
  const [permanentDeleteUser, setPermanentDeleteUser] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const handleClose = () => {
    setDeleteUser(false);
    setOpen(false);
  };
  const handleDeleteUser = () => {
    setPermanentDeleteUser(true);
  };
  const navigate = useNavigate();
  const auth = getAuth();

  const credential = EmailAuthProvider.credential(userEmail, currentPassword);
  console.log(currentPassword);
  const handleDeletePermanentUser = () => {
    reauthenticateWithCredential(auth.currentUser, credential).then(() => {
      const user = auth.currentUser;

      deleteUser(user)
        .then(() => {
          console.log("delete user");
          alert("Konto zostało usunięte");
          navigate("/");
          // User deleted.
        })
        .catch(error => {
          console.log("error", error);
          // An error ocurred
          // ...
        });
    });
  };
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        Czy na pewno chcesz usunąć konto?
      </DialogTitle>
      <DialogActions>
        {!permanentDeleteUser ? (
          <>
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
              Nie
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
              onClick={handleDeleteUser}>
              Tak
            </Button>
          </>
        ) : (
          <>
            <DeleteButtonContainer>
              <PassowrdTextField
                autoFocus
                type="password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                label="Aktualne hasło"
              />
            </DeleteButtonContainer>
            <DeleteButtonContainer>
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
                onClick={handleDeletePermanentUser}>
                Usuń konto
              </Button>
            </DeleteButtonContainer>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
