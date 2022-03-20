import { useState, useEffect, useContext } from "react";

import styled from "styled-components";
import { Theme } from "../../../common/theme/theme";

import {
  Box,
  Button,
  Checkbox,
  checkboxClasses,
  Dialog,
  DialogActions,
  DialogTitle,
  Icon,
  OutlinedInput,
  Snackbar,
  Typography,
} from "@mui/material";

import { UserContext } from "../../../userContext/UserContext";

import { doc, deleteDoc, updateDoc } from "firebase/firestore";

import dayjs from "dayjs";
import "dayjs/locale/pl";
import { SaveButton } from "../../../common/buttons/SaveButton";
import { EditButton } from "../../../common/buttons/EditButton";
import { DeleteButton } from "../../../common/buttons/DeleteButton";
dayjs.locale("pl");

const NewEventContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  min-height: 2.5rem;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  background-color: ${Theme.palette.backgroundColor.main};
  color: ${Theme.palette.secondary.contrastText};
`;

const NewEvent = ({ items, setItems, firestore }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [eventID, setEventId] = useState("");
  const [eventIDDelete, setEventIDDelete] = useState("");
  const [takenName, setTakenName] = useState("");
  const [takenDate, setTakenDate] = useState("");
  const [isAlerted, setIsAlerted] = useState();

  const [uid, setUid] = useState("");
  const { userUID } = useContext(UserContext);

  useEffect(() => {
    if (userUID) {
      setUid(userUID);
    }
  }, [userUID]);

  const handleClickEdit = id => {
    setIsEditing(true);
    setEventId(id);
    items.forEach(element => {
      if (id === element.id) {
        setTakenName(element.name);
        setTakenDate(element.date);
        setIsAlerted(element.alert);
      }
    });
  };

  const handleClickSave = async id => {
    setIsEditing(false);
    setEventId("");

    const docRef = doc(firestore, "calendar", id);
    await updateDoc(docRef, {
      name: takenName,
      date: takenDate,
      alert: isAlerted,
      uid: uid,
    });
  };

  const handleClickCancel = id => {
    setIsEditing(false);
    setEventId("");
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = id => {
    setOpen(true);
    setEventIDDelete(id);
  };

  const handleDeleteEvent = () => {
    const docRef = doc(firestore, "calendar", eventIDDelete);
    deleteDoc(docRef);
    setIsEditing(false);
    setOpen(false);
    setEventId("");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [notificationToday, setNotificationToday] = useState(false);
  const [notificationTomorrow, setNotificationTomorrow] = useState(false);
  const [notificationAfterTomorrow, setNotificationAfterTomorrow] =
    useState(false);

  useEffect(() => {
    setTimeout(() => {
      setNotificationToday(true);
    }, 1000);
    setTimeout(() => {
      setNotificationTomorrow(true);
    }, 1250);
    setTimeout(() => {
      setNotificationAfterTomorrow(true);
    }, 1500);
  }, []);

  const handleNotificationTodayClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationToday(false);
  };

  const handleNotificationTomorrowClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationTomorrow(false);
  };

  const handleNotificationAfterTomorrowClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationAfterTomorrow(false);
  };

  let notificationCounter = -4;

  return (
    <Box
      sx={{
        backgroundColor: Theme.palette.secondary.main,
        minWidth: "35vw",
      }}>
      <div>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            Czy usunąć wydarzenie?
          </DialogTitle>
          <DialogActions>
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
              onClick={handleDeleteEvent}>
              Tak
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {items.map(
        element =>
          element.uid === uid && (
            <NewEventContainer key={element.id}>
              {element.id !== eventID && (
                <>
                  <Typography
                    sx={{
                      minWidth: "10vw",
                      alignSelf: "center",
                      padding: ".5rem",
                    }}>
                    {element.name}
                  </Typography>
                  <Typography
                    sx={{
                      marginLeft: "auto",
                      alignSelf: "center",
                      padding: ".5rem",
                    }}>
                    {dayjs(element.date).format("D MMMM")}
                  </Typography>
                  <Checkbox
                    type="disabled"
                    sx={{
                      [`&, &.${checkboxClasses.checked}`]: {
                        color: Theme.palette.secondary.contrastText,
                      },
                      marginLeft: "1vw",
                      alignSelf: "center",
                      padding: ".5rem",
                      cursor: "default",
                      pointerEvents: "none",
                    }}
                    checked={element.alert ? true : false}
                  />
                </>
              )}
              {isEditing && element.id === eventID && (
                <>
                  <Box sx={{ paddingRight: ".5rem" }}>
                    <OutlinedInput
                      autoFocus
                      value={takenName}
                      sx={{
                        maxHeight: "2.5rem",
                        padding: ".25rem",
                        backgroundColor: Theme.palette.secondary.contrastText,
                        ":hover": {
                          backgroundColor: Theme.palette.primary.contrastText,
                        },
                      }}
                      onChange={e => {
                        setTakenName(e.target.value);
                      }}
                    />
                  </Box>
                  <Box sx={{ padding: "0 1rem 0 .5rem" }}>
                    <OutlinedInput
                      type="date"
                      required
                      value={takenDate}
                      sx={{
                        maxHeight: "2.5rem",
                        padding: ".25rem",
                        backgroundColor: Theme.palette.secondary.contrastText,
                        ":hover": {
                          backgroundColor: Theme.palette.primary.contrastText,
                        },
                      }}
                      onChange={e => {
                        setTakenDate(e.target.value);
                      }}
                    />
                  </Box>
                  <Box>
                    <Checkbox
                      checked={isAlerted ? true : false}
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: "2.5rem" },
                        [`&, &.${checkboxClasses.checked}`]: {
                          color: Theme.palette.secondary.contrastText,
                        },
                        margin: 0,
                        padding: 0,
                        ":hover": {
                          color: Theme.palette.primary.contrastText,
                        },
                      }}
                      onChange={e => {
                        setIsAlerted(e.target.checked ? true : false);
                      }}
                    />
                  </Box>
                  <Button
                    sx={{
                      marginLeft: "auto",
                      color: Theme.palette.secondary.contrastText,
                      ":hover": { color: Theme.palette.primary.contrastText },
                    }}
                    onClick={() => handleClickCancel(element.id)}>
                    <Icon>cancel</Icon>
                  </Button>
                  <SaveButton handleClickSave={handleClickSave} id={element.id}>
                    <Icon>save</Icon>
                  </SaveButton>
                </>
              )}
              {isEditing && element.id !== eventID && (
                <>
                  <EditButton handleClickEdit={handleClickEdit} id={element.id}>
                    <Icon>edit</Icon>
                  </EditButton>
                  <DeleteButton
                    handleClickOpen={handleClickOpen}
                    id={element.id}>
                    <Icon>delete</Icon>
                  </DeleteButton>
                </>
              )}
              {!isEditing && (
                <>
                  <EditButton handleClickEdit={handleClickEdit} id={element.id}>
                    <Icon>edit</Icon>
                  </EditButton>
                  <DeleteButton
                    handleClickOpen={handleClickOpen}
                    id={element.id}>
                    <Icon>delete</Icon>
                  </DeleteButton>
                </>
              )}
              {element.date === dayjs().format("YYYY-MM-DD") && element.alert && (
                <>
                  <Snackbar
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    open={notificationToday}
                    autoHideDuration={7000}
                    onClose={handleNotificationTodayClose}
                    message={`${element.name} - to już dzisiaj! Nie zapomnij!`}
                    sx={{
                      "& .MuiSnackbarContent-root": {
                        color: Theme.palette.secondary.contrastText,
                        background: "#D32F2F",
                        marginBottom: `${(notificationCounter += 4)}rem`,
                      },
                    }}
                  />
                </>
              )}
              {element.date === dayjs().add(1, "day").format("YYYY-MM-DD") &&
                element.alert && (
                  <>
                    <Snackbar
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      open={notificationTomorrow}
                      autoHideDuration={7000}
                      onClose={handleNotificationTomorrowClose}
                      message={`${element.name} - to już jutro! Nie zapomnij!`}
                      sx={{
                        "& .MuiSnackbarContent-root": {
                          color: Theme.palette.secondary.contrastText,
                          background: "#ED6C02",
                          marginBottom: `${(notificationCounter += 4)}rem`,
                        },
                      }}
                    />
                  </>
                )}
              {element.date === dayjs().add(2, "day").format("YYYY-MM-DD") &&
                element.alert && (
                  <>
                    <Snackbar
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      open={notificationAfterTomorrow}
                      autoHideDuration={7000}
                      onClose={handleNotificationAfterTomorrowClose}
                      message={`${element.name} - to za 2 dni! Nie zapomnij!`}
                      sx={{
                        "& .MuiSnackbarContent-root": {
                          color: Theme.palette.secondary.contrastText,
                          background: "#0288D1",
                          marginBottom: `${(notificationCounter += 4)}rem`,
                        },
                      }}
                    />
                  </>
                )}
            </NewEventContainer>
          )
      )}
    </Box>
  );
};

export default NewEvent;
