import {useState} from 'react';

import { Theme } from "../../../common/theme/theme";

import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Checkbox } from "@mui/material";
import { checkboxClasses } from "@mui/material";
import { FormGroup } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { OutlinedInput } from "@mui/material";

import { firestore } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore"

const AddEventForm = ({ }) => {
    const [item, setItem] = useState({
      name: '',
    });
    const [alert, setAlert] = useState({
      alert: true,
    });
    const [date, setDate] = useState({
      date: '',
    });

    const handleChangeName = (e) => {
      setItem(e.target.value);
    }

    const handleChangeDate = (e) => {
      setDate(e.target.value);
    }

    const handleChangeAlert = (e) => {
      e.target.checked ? setAlert(true) : setAlert(false);
    }

      const handleAdd = async () => {
        const docRef = await addDoc(collection(firestore, "calendar"), {
          name: item,
          alert: alert,
          date: date,
        });
      } 

  return (
    <Box sx={{padding: "1rem", backgroundColor: Theme.palette.secondary.main}}>
      <FormGroup sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <Box sx={{padding: "1rem"}}>
          <OutlinedInput
            autoFocus
            placeholder="Wprowadź nazwę"
            required
            defaultValue={item.name}
            sx={{
              height: "3rem",
              backgroundColor: Theme.palette.secondary.contrastText,
              ":hover": {backgroundColor: Theme.palette.primary.contrastText}
              }}
            onChange={handleChangeName}/>
          <FormHelperText sx={{margin: ".25rem", height: "1rem", color: Theme.palette.secondary.contrastText}}>Nazwa wydarzenia</FormHelperText>
        </Box>
        <Box sx={{padding: "1rem"}}>
          <OutlinedInput
            type="date"
            required
            defaultValue={date.date}
            sx={{
              height: "3rem",
              backgroundColor: Theme.palette.secondary.contrastText,
              ":hover": {backgroundColor: Theme.palette.primary.contrastText}
              }}
            onChange={handleChangeDate}/>
          <FormHelperText sx={{margin: ".25rem", height: "1rem", color: Theme.palette.secondary.contrastText}}>Data</FormHelperText>
        </Box>
        <Box sx={{padding: "1rem"}}>
          <Checkbox
            defaultChecked
            value={alert}
            sx={{
              '& .MuiSvgIcon-root': { fontSize: "3rem" },
              [`&, &.${checkboxClasses.checked}`]: {
              color: Theme.palette.secondary.contrastText},
              margin: 0,
              padding: 0,
              ":hover": {color: Theme.palette.primary.contrastText},
            }}
            onChange={handleChangeAlert}/>
          <FormHelperText
            sx={{
              margin: ".25rem",
              height: "1rem",
              textAlign: "center",
              color: Theme.palette.secondary.contrastText,
              }}>
            Alert</FormHelperText>
        </Box>
      <Button
        type="submit"
        variant="outlined"
        sx={{
          margin: "1rem",
          height: "3rem",
          color: Theme.palette.primary,
          backgroundColor: Theme.palette.secondary.contrastText,
          ":hover": {backgroundColor: Theme.palette.primary.contrastText},
          }}
          onClick={handleAdd}>
        Dodaj</Button>
      </FormGroup>
    </Box>
  );
};

export default AddEventForm;