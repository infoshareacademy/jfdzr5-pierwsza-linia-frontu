import { Theme } from "../../../common/theme/theme";
import styled from "styled-components";
import { useState } from "react";

import { Box } from "@mui/material";
import Icon from "@mui/material/Icon";
import { Button } from "@mui/material";
import { Input } from "@mui/material";
import { Typography } from "@mui/material";
import { Checkbox } from "@mui/material";


const NewEventsContainer = styled.div`
  padding: 10px;
  color: ${Theme.palette.secondary.contrastText};
`;

const NewEventContainer = styled.div`
  display: flex;
  min-height: 1rem;
  margin: 10px;
  padding: 10px;
  background-color: grey;
  color: ${Theme.palette.secondary.contrastText};
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
        setTakenValue(element.item);
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
        return { ...element, item: takenValue };
      }
      return element;
    });
    setIsEditing(false);
    setEventId("");
    setItems(newArray);
  };

  const handleIsChecked = id => {
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
              {element.item}
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
              type="checkbox"
              onChange={() => handleIsChecked(element.id)}
              sx={{color: Theme.palette.secondary.contrastText}}
            />
          )}
          {!save && (
            <Button
              color="inherit"
              onClick={() => handleClickEdit(element.id)}>
              <Icon>edit</Icon>
            </Button>
          )}
          {save && element.id === eventID && (
            <Button
              color="inherit"
              onClick={() => handleClickSave(element.id)}>
              <Icon>save</Icon>
            </Button>
          )}
          <Button
            color="inherit"
            onClick={() => handleClickDelete(element.id)}>
            <Icon>delete</Icon>
          </Button>
        </NewEventContainer>
      ))}
    </NewEventsContainer>
  );
};

export default NewEvent;