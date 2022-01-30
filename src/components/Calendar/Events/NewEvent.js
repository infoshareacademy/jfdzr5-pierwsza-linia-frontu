import { useState } from "react";

import styled from "styled-components";
import { Theme } from "../../../common/theme/theme";

import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Checkbox } from "@mui/material";
import { checkboxClasses } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Icon } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Typography } from "@mui/material";

import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const NewEventContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  min-height: 2.5rem;
  margin: .5rem 0;
  padding: 0.5rem 1rem;
  background-color: ${Theme.palette.secondary.main};
  color: ${Theme.palette.secondary.contrastText};
`;

const NewEvent = ({ items, setItems, firestore }) => {
  const [save, setSave] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [eventID, setEventId] = useState("");
  const [takenName, setTakenName] = useState("");
  const [takenDate, setTakenDate] = useState("");
  const [isAlerted, setIsAlerted] = useState();

  const handleClickEdit = id => {
    setIsEditing(true);
    setSave(true);
    setEventId(id);
    items.forEach(element => {
      if (id === element.id) {
        setTakenName(element.name);
        setTakenDate(element.date);
        setIsAlerted(element.alert);
      }
    });
  };
  const handleClickDelete = id => {
    const docRef = doc(firestore, "calendar", id);
    deleteDoc(docRef);
    setSave(false);
    setIsEditing(false);
    setEventId("");
  };

  const handleClickSave = async id => {
    setSave(false);
    setIsEditing(false);
    setEventId("");

    const docRef = doc(firestore, "calendar", id);
    await updateDoc(docRef, {
      name: takenName,
      date: takenDate,
      alert: isAlerted,
    });
  };

  return (
    <Box sx={{marginRight: "10vw", backgroundColor: Theme.palette.primary.main, minWidth: "40vw"}}>
      {items.map(element => (
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
                alignSelf: "center",
                padding: ".5rem",
              }}>
              {element.date}
            </Typography>
            <Checkbox
              type="disabled"
              sx={{
                [`&, &.${checkboxClasses.checked}`]: {
                color: Theme.palette.secondary.contrastText},
                alignSelf: "center",
                padding: ".5rem",
              }}
              checked={element.alert ? true : false}
            />
            </>
          )}
          {isEditing && element.id === eventID && (
            <>
            <Box sx={{paddingRight: ".5rem"}}>
              <OutlinedInput
              autoFocus
              value={takenName}
              sx={{
                maxHeight: "1.5rem",
                padding: ".25rem",
                fontSize: ".75rem",
                backgroundColor: Theme.palette.secondary.contrastText,
                ":hover": {backgroundColor: Theme.palette.primary.contrastText}
              }}
              onChange={e => {
                setTakenName(e.target.value);
              }}/>
              <FormHelperText sx={{fontSize: "0.5rem", margin: ".25rem", height: "1rem", color: Theme.palette.secondary.contrastText}}>Zmień nazwę wydarzenia</FormHelperText>
            </Box>
            <Box sx={{padding: "0 1rem 0 .5rem"}}>
              <OutlinedInput
              type="date"
              value={takenDate}
              sx={{
                maxHeight: "1.5rem",
                padding: ".25rem",
                fontSize: ".75rem",
                backgroundColor: Theme.palette.secondary.contrastText,
              ":hover": {backgroundColor: Theme.palette.primary.contrastText}
              }}
              onChange={e => {
                setTakenDate(e.target.value);
              }}/>
              <FormHelperText sx={{fontSize: "0.5rem", margin: ".25rem", height: "1rem", color: Theme.palette.secondary.contrastText}}>Zmień datę</FormHelperText>
            </Box>
            <Box>
              <Checkbox
              checked={isAlerted ? true : false}
              sx={{
                [`&, &.${checkboxClasses.checked}`]: {
                color: Theme.palette.secondary.contrastText},
                margin: 0,
                padding: 0,
                ":hover": {color: Theme.palette.primary.contrastText},
              }}
              onChange={e => {
                setIsAlerted(e.target.checked ? true : false);
                console.log(isAlerted)
              }}/>
              <FormHelperText
              sx={{
                fontSize: "0.5rem", 
                margin: ".25rem",
                height: "1rem",
                textAlign: "center",
                color: Theme.palette.secondary.contrastText,
              }}>
              Alert</FormHelperText>
              </Box>
            </>
          )}
          {!save && (
            <Button
              sx={{
                marginLeft: "auto",
                color: Theme.palette.secondary.contrastText,
                ":hover": {color: Theme.palette.primary.contrastText},
              }}
              onClick={() => handleClickEdit(element.id)}>
              <Icon>edit</Icon>
            </Button>
          )}
          {save && element.id === eventID && (
            <>
            <Button
            sx={{
              marginLeft: "auto",
              color: Theme.palette.secondary.contrastText,
              ":hover": {color: Theme.palette.primary.contrastText},
            }}
            onClick={() => handleClickDelete(element.id)}>
            <Icon>delete</Icon>
          </Button>
            <Button
              sx={{
                color: Theme.palette.secondary.contrastText,
                ":hover": {color: Theme.palette.primary.contrastText},
              }}
              onClick={() => handleClickSave(element.id)}>
              <Icon>save</Icon>
            </Button>
            </>
          )}
        </NewEventContainer>
      ))}
    </Box>
  );
};

export default NewEvent;