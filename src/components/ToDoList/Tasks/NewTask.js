import { useState } from "react";

import styled from "styled-components";
import { Input, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Theme } from "../../../common/theme/theme";
import { checkboxClasses } from "@mui/material";

import { doc, deleteDoc, updateDoc } from "firebase/firestore";
// import { SaveButton } from "../../../common/buttons/SaveButton";
// import { EditButton } from "../../../common/buttons/EditButton";
// import { CancelButton } from "../../../common/buttons/CancelButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { SaveButton } from "../buttons/SaveButton";
import { EditButton } from "../buttons/EditButton";
import { CancelButton } from "../buttons/CancelButton";

const NewTasksContainer = styled.div`
  padding: 10px;
`;

const NewTaskContainer = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;
  background-color: grey;
  // justify-content: space-between;
`;

const NewTask = ({ tasks, setTasks, db }) => {
  const [save, setSave] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskId] = useState("");
  const [takenValue, setTakenValue] = useState("");

  const handleClickEdit = id => {
    setIsEditing(true);
    setSave(true);
    setTaskId(id);
    tasks.forEach(element => {
      if (id === element.id) {
        setTakenValue(element.task);
      }
    });
  };
  const handleClickDelete = id => {
    const docRef = doc(db, "to-do-list", id);
    deleteDoc(docRef);
    setSave(false);
  };

  const handleClickSave = async id => {
    setSave(false);

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
        console.log(element.isChecked);
      }
      if (!element.isChecked && element.id === id) {
        const docRef = doc(db, "to-do-list", id);
        await updateDoc(docRef, {
          isChecked: true,
        });
        console.log(element.isChecked);
      }
    });
  };

  const handleClickCancel = id => {
    setIsEditing(false);
    setSave(false);
    setTaskId("");
  };

  return (
    <NewTasksContainer>
      {tasks.map(element => (
        <NewTaskContainer key={element.id}>
          {element.id !== taskID && (
            <Typography
              sx={{
                alignSelf: "center",
                textDecoration: `${element.isChecked ? "line-through" : ""}`,
                flexGrow: "1",
              }}>
              {element.task}
            </Typography>
          )}
          {isEditing && element.id === taskID && (
            <Input
              sx={{ flexGrow: "1" }}
              autoFocus
              type="text"
              value={takenValue}
              onChange={e => {
                setTakenValue(e.target.value);
              }}></Input>
          )}
          {!isEditing && (
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
          )}
          {!save && (
            <EditButton handleClickEdit={handleClickEdit} id={element.id} />
          )}
          {save && element.id === taskID && (
            <SaveButton handleClickSave={handleClickSave} id={element.id} />
          )}
          {isEditing && element.id === taskID && (
            <DeleteButton
              handleClickDelete={handleClickDelete}
              id={element.id}
            />
          )}
          {isEditing && element.id === taskID && (
            <CancelButton
              handleClickCancel={handleClickCancel}
              id={element.id}
            />
          )}
        </NewTaskContainer>
      ))}
    </NewTasksContainer>
  );
};

export default NewTask;
