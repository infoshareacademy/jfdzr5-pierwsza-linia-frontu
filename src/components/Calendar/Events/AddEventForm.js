import { Theme } from "../../../common/theme/theme";

import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Checkbox } from "@mui/material";
import { checkboxClasses } from "@mui/material";
import { FormControl } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { OutlinedInput } from "@mui/material";

const AddEventForm = ({ item, setItem, setAlert, setDate, handleSubmit }) => {
  return (
    <Box sx={{padding: "1rem", backgroundColor: Theme.palette.secondary.main}}>
      <form onSubmit={handleSubmit}>
      <FormControl sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <Box sx={{padding: "1rem"}}>
          <OutlinedInput
            autoFocus
            placeholder="Wprowadź nazwę"
            required
            onChange={e => {setItem(e.target.value)}}
            value={item}
            sx={{
              height: "3rem",
              backgroundColor: Theme.palette.secondary.contrastText,
              ":hover": {backgroundColor: Theme.palette.primary.contrastText}
              }}/>
          <FormHelperText sx={{margin: ".25rem", height: "1rem", color: Theme.palette.secondary.contrastText}}>Nazwa wydarzenia</FormHelperText>
        </Box>
        <Box sx={{padding: "1rem"}}>
          <OutlinedInput
            type="date"
            required
            sx={{
              height: "3rem",
              backgroundColor: Theme.palette.secondary.contrastText,
              ":hover": {backgroundColor: Theme.palette.primary.contrastText}
              }}/>
          <FormHelperText sx={{margin: ".25rem", height: "1rem", color: Theme.palette.secondary.contrastText}}>Data</FormHelperText>
        </Box>
        <Box sx={{padding: "1rem"}}>
          <Checkbox
            defaultChecked
            sx={{
              '& .MuiSvgIcon-root': { fontSize: "3rem" },
              [`&, &.${checkboxClasses.checked}`]: {
              color: Theme.palette.secondary.contrastText},
              margin: 0,
              padding: 0,
              ":hover": {color: Theme.palette.primary.contrastText},
        }}/>
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
          }}>
        Dodaj</Button>
      </FormControl>
      </form>
    </Box>
  );
};

export default AddEventForm;