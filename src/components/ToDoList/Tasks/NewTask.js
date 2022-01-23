import { useState } from "react";

import styled from "styled-components";
import Icon from "@mui/material/Icon";
import { Button, Input, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Theme } from "../../../common/theme/theme";

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

const NewTask = ({ tasks, setTasks }) => {
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
    const newArray = tasks.filter(element => element.id !== id);
    setTasks(newArray);
  };

  const handleClickSave = id => {
    setSave(false);
    const newArray = tasks.map(element => {
      if (id === element.id) {
        return { ...element, task: takenValue };
      }
      return element;
    });
    setIsEditing(false);
    console.log(newArray);
    setTaskId("");
    setTasks(newArray);
  };

  const handleIsChecked = id => {
    console.log("klik");
    const newArray = tasks.map(element => {
      if (id === element.id) {
        return { ...element, isCheckd: element.isCheckd ? false : true };
      } else {
        return { ...element };
      }
    });
    setTasks(newArray);
  };

  return (
    <NewTasksContainer>
      {tasks.map(element => (
        <NewTaskContainer key={element.id}>
          {element.id !== taskID && (
            <Typography
              sx={{
                alignSelf: "center",
                textDecoration: `${element.isCheckd ? "line-through" : ""}`,
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
              checked={element.isCheckd}
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
          <Button
            color="secondary"
            onClick={() => handleClickDelete(element.id)}>
            <Icon>delete</Icon>
          </Button>
        </NewTaskContainer>
      ))}
    </NewTasksContainer>
  );
};

export default NewTask;
