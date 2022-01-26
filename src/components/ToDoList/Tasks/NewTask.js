import { useState } from "react";

import styled from "styled-components";
import Icon from "@mui/material/Icon";
import { Button, Input, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Theme } from "../../../common/theme/theme";

import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const NewTasksContainer = styled.div`
  padding: 10px;
`;

const NewTaskContainer = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;
  // background-color: ${Theme.palette.primary.main};
  background-color: grey;
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
    // const newArray = tasks.filter(element => element.id !== id);
    // setTasks(newArray);

    const docRef = doc(db, "to-do-list", id);
    deleteDoc(docRef);
  };

  const handleClickSave = async id => {
    setSave(false);
    // const newArray = tasks.map(element => {
    //   if (id === element.id) {
    //     return { ...element, task: takenValue };
    //   }
    //   return element;
    // });
    setIsEditing(false);
    // console.log(newArray);
    setTaskId("");
    // setTasks(newArray);

    const docRef = doc(db, "to-do-list", id);
    await updateDoc(docRef, {
      task: takenValue,
      // isChecked: false,
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

    // const docRef = doc(db, "to-do-list", id);
    // await updateDoc(docRef, {
    //   isChecked: false,
    // });

    // const newArray = tasks.map(element => {
    //   if (id === element.id) {
    //     return { ...element, isChecked: element.isChecked ? false : true };
    //   } else {
    //     return { ...element };
    //   }
    // });
    // setTasks(newArray);
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
              }}>
              {element.task}
            </Typography>
          )}
          {isEditing && element.id === taskID && (
            <Input
              autoFocus
              type="text"
              value={takenValue}
              onChange={e => {
                setTakenValue(e.target.value);
              }}></Input>
          )}
          {!isEditing && (
            <Checkbox
              checked={element.isChecked ? true : false}
              color="secondary"
              type="checkbox"
              onChange={() => handleIsChecked(element.id)}
            />
          )}
          {!save && (
            <Button
              color="secondary"
              onClick={() => handleClickEdit(element.id)}>
              <Icon>edit</Icon>
            </Button>
          )}
          {save && element.id === taskID && (
            <Button
              color="secondary"
              onClick={() => handleClickSave(element.id)}>
              <Icon>save</Icon>
            </Button>
          )}
          {!isEditing && (
            <Button
              color="secondary"
              onClick={() => handleClickDelete(element.id)}>
              <Icon>delete</Icon>
            </Button>
          )}
        </NewTaskContainer>
      ))}
    </NewTasksContainer>
  );
};

export default NewTask;
