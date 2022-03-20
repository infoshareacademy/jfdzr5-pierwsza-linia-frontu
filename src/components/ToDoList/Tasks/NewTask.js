import { useState, useEffect } from "react";

import styled from "styled-components";
import { Input, OutlinedInput, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Theme } from "../../../common/theme/theme";
import { checkboxClasses } from "@mui/material";

import { doc, deleteDoc, updateDoc } from "firebase/firestore";

import { DeleteButton } from "../../../common/buttons/DeleteButton";
import { SaveButton } from "../../../common/buttons/SaveButton";
import { EditButton } from "../../../common/buttons/EditButton";
import { CancelButton } from "../../../common/buttons/CancelButton";

import { useContext } from "react";
import { UserContext } from "../../../userContext/UserContext";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const NewTasksContainer = styled.div`
  padding: 10px;
`;

const NewTaskContainer = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;
  background-color: ${Theme.palette.backgroundColor.main};
`;

const NewTask = ({ tasks, db }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskId] = useState("");
  const [taskIDDelete, setTaskIDDelete] = useState("");
  const [takenValue, setTakenValue] = useState("");

  const handleClickEdit = id => {
    setIsEditing(true);
    setTaskId(id);
    tasks.forEach(element => {
      if (id === element.id) {
        setTakenValue(element.task);
      }
    });
  };

  const handleClickSave = async id => {
    setIsEditing(false);
    setTaskId("");

    const docRef = doc(db, "to-do-list", id);
    await updateDoc(docRef, {
      task: takenValue,
    });
  };

  const handleIsChecked = async id => {
    tasks.map(async element => {
      if (element.isChecked && element.id === id) {
        const docRef = doc(db, "to-do-list", id);
        await updateDoc(docRef, {
          isChecked: false,
        });
      }
      if (!element.isChecked && element.id === id) {
        const docRef = doc(db, "to-do-list", id);
        await updateDoc(docRef, {
          isChecked: true,
        });
      }
    });
  };

  const handleClickCancel = id => {
    setIsEditing(false);
    // setSave(false);
    setTaskId("");
  };

  //get user uid and email from use context
  const [uid, setUid] = useState("");
  const { userUID, userEmail } = useContext(UserContext);

  useEffect(() => {
    if (userUID) {
      setUid(userUID);
    }
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = id => {
    setOpen(true);
    setTaskIDDelete(id);
  };

  const handleDeleteTask = () => {
    setOpen(false);
    const docRef = doc(db, "to-do-list", taskIDDelete);
    deleteDoc(docRef);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <NewTasksContainer>
      <div>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">Czy usunąć zadanie?</DialogTitle>
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
              onClick={handleDeleteTask}>
              Tak
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {tasks.map(
        element =>
          element.uid === uid && (
            <NewTaskContainer key={element.id}>
              {element.id !== taskID && (
                <Typography
                  sx={{
                    alignSelf: "center",
                    textDecoration: `${
                      element.isChecked ? "line-through" : ""
                    }`,
                    flexGrow: "1",
                  }}>
                  {element.task}
                </Typography>
              )}
              {isEditing && element.id === taskID && (
                <OutlinedInput
                  sx={{
                    flexGrow: "1",
                    maxHeight: "2.5rem",
                    padding: ".25rem",
                    backgroundColor: Theme.palette.secondary.contrastText,
                    ":hover": {
                      backgroundColor: Theme.palette.primary.contrastText,
                    },
                  }}
                  autoFocus
                  type="text"
                  value={takenValue}
                  onChange={e => {
                    setTakenValue(e.target.value);
                  }}></OutlinedInput>
              )}
              <Checkbox
                sx={{
                  marginLeft: "auto",
                  color: Theme.palette.secondary.contrastText,
                  ":hover": { color: Theme.palette.primary.contrastText },
                  justifySelf: "center",
                  [`&, &.${checkboxClasses.checked}`]: {
                    color: Theme.palette.secondary.contrastText,
                  },
                  alignSelf: "center",
                  padding: ".5rem",
                }}
                checked={element.alert ? true : false}
                checked={element.isChecked ? true : false}
                color="secondary"
                type="checkbox"
                onChange={() => handleIsChecked(element.id)}
              />

              {element.id !== taskID && (
                <EditButton handleClickEdit={handleClickEdit} id={element.id} />
              )}
              {isEditing && element.id === taskID && (
                <CancelButton
                  handleClickCancel={handleClickCancel}
                  id={element.id}
                />
              )}
              {element.id === taskID && (
                <SaveButton handleClickSave={handleClickSave} id={element.id} />
              )}
              <DeleteButton handleClickOpen={handleClickOpen} id={element.id} />
            </NewTaskContainer>
          )
      )}
    </NewTasksContainer>
  );
};

export default NewTask;
