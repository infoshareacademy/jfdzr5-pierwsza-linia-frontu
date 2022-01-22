import { useState } from "react";

import styled from "styled-components";
import Icon from "@mui/material/Icon";
import { Button, Input, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Theme } from "../../../common/theme";

const NewEventsContainer = styled.div`
  padding: 10px;
`;

const NewEventContainer = styled.div`
  display: flex;
  margin: 10px;
  padding: 10px;
  // background-color: ${Theme.palette.primary.main};
  background-color: grey;
`;

const NewEvent = ({ items, setItems }) => {
  const [save, setSave] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [eventID, setEventId] = useState("");
  const [takenValue, setTakenValue] = useState("");

  const handleClickEdit = id => {
    setIsEditing(true);
    setSave(true);
    setEventId(id);
    items.forEach(element => {
      if (id === element.id) {
        setTakenValue(element.task);
      }
    });
  };
  const handleClickDelete = id => {
    const newArray = items.filter(element => element.id !== id);
    setItems(newArray);
  };

  const handleClickSave = id => {
    setSave(false);
    const newArray = items.map(element => {
      if (id === element.id) {
        return { ...element, task: takenValue };
      }
      return element;
    });
    setIsEditing(false);
    console.log(newArray);
    setEventId("");
    setItems(newArray);
  };

  const handleIsChecked = id => {
    console.log("klik");
    const newArray = items.map(element => {
      if (id === element.id) {
        return { ...element, isChecked: element.isChecked ? false : true };
      } else {
        return { ...element };
      }
    });
    setItems(newArray);
  };

  return (
    <NewEventsContainer>
      {items.map(element => (
        <NewEventContainer key={element.id}>
          {element.id !== eventID && (
            <Typography
              sx={{
                alignSelf: "center",
                textDecoration: `${element.isChecked ? "line-through" : ""}`,
              }}>
              {element.task}
            </Typography>
          )}
          {isEditing && element.id === eventID && (
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
              checked={element.isChecked}
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
          {save && element.id === eventID && (
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
        </NewEventContainer>
      ))}
    </NewEventsContainer>
  );
};

export default NewEvent;