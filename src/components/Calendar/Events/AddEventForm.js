import { Theme } from "../../../common/theme/theme";

import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Checkbox } from "@mui/material";
import { checkboxClasses } from "@mui/material";
import { FormGroup } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { useState, useEffect } from "react";

import { useContext } from "react";
import { UserContext } from "../../../userContext/UserContext";

import { addDoc } from "firebase/firestore";

const AddEventForm = ({
  item,
  setItem,
  alert,
  setAlert,
  date,
  setDate,
  docRef,
}) => {
  const handleChangeName = (e) => {
    setItem(e.target.value);
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  const handleChangeAlert = (e) => {
    e.target.checked ? setAlert(true) : setAlert(false);
  };
  // uid from firebase -
  const [uid, setUid] = useState("");
  const { userUID } = useContext(UserContext);

  useEffect(() => {
    if (userUID) {
      setUid(userUID);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(docRef, {
      name: item,
      date: date,
      alert: alert,
      timeStamp: +new Date(),
      //add UserID to task
      uid: uid,
    });
    setItem("");
    setDate("");
  };

  return (
    <Box
      sx={{ backgroundColor: Theme.palette.secondary.main, minWidth: "35vw" }}
    >
      <form onSubmit={handleSubmit}>
        <FormGroup
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ padding: "1rem" }}>
            <OutlinedInput
              autoFocus
              placeholder="Wprowadź nazwę"
              required
              value={item}
              sx={{
                height: "3rem",
                backgroundColor: Theme.palette.secondary.contrastText,
                ":hover": {
                  backgroundColor: Theme.palette.primary.contrastText,
                },
              }}
              onChange={handleChangeName}
            />
            <FormHelperText
              sx={{
                margin: ".25rem",
                height: "1rem",
                color: Theme.palette.secondary.contrastText,
              }}
            >
              Nazwa wydarzenia
            </FormHelperText>
          </Box>
          <Box sx={{ padding: "1rem" }}>
            <OutlinedInput
              type="date"
              required
              value={date}
              sx={{
                height: "3rem",
                backgroundColor: Theme.palette.secondary.contrastText,
                ":hover": {
                  backgroundColor: Theme.palette.primary.contrastText,
                },
              }}
              onChange={handleChangeDate}
            />
            <FormHelperText
              sx={{
                margin: ".25rem",
                height: "1rem",
                color: Theme.palette.secondary.contrastText,
              }}
            >
              Data
            </FormHelperText>
          </Box>
          <Box sx={{ padding: "1rem" }}>
            <Checkbox
              defaultChecked
              value={alert}
              sx={{
                "& .MuiSvgIcon-root": { fontSize: "3rem" },
                [`&, &.${checkboxClasses.checked}`]: {
                  color: Theme.palette.secondary.contrastText,
                },
                margin: 0,
                padding: 0,
                ":hover": { color: Theme.palette.primary.contrastText },
              }}
              onChange={handleChangeAlert}
            />
            <FormHelperText
              sx={{
                margin: ".25rem",
                height: "1rem",
                textAlign: "center",
                color: Theme.palette.secondary.contrastText,
              }}
            >
              Alert
            </FormHelperText>
          </Box>
          <Button
            type="submit"
            variant="outlined"
            sx={{
              margin: "1rem",
              height: "3rem",
              color: Theme.palette.primary,
              backgroundColor: Theme.palette.secondary.contrastText,
              ":hover": { backgroundColor: Theme.palette.primary.contrastText },
            }}
          >
            Dodaj
          </Button>
        </FormGroup>
      </form>
    </Box>
  );
};

export default AddEventForm;
