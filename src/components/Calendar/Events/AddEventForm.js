import { Theme } from "../../../common/theme/theme";
import { Button, FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Input } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Box } from "@mui/material";
import { Checkbox } from "@mui/material";
import { FormGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { checkboxClasses } from "@mui/material";

const AddEventForm = ({ item, setItem, handleSubmit }) => {
  return (
    <Box sx={{width: "40%", padding: "1rem", backgroundColor: Theme.palette.secondary.main}}>
      <FormControl sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <Box>
          <OutlinedInput placeholder="Wprowadź nazwę" required sx={{height: "3rem", backgroundColor: Theme.palette.secondary.contrastText}}/>
          <FormHelperText sx={{margin: ".25rem", height: "1rem", color: Theme.palette.secondary.contrastText}}>Nazwa wydarzenia</FormHelperText>
        </Box>
        <Box>
          <OutlinedInput type="date" placeholder="Wybierz datę" required sx={{height: "3rem", backgroundColor: Theme.palette.secondary.contrastText}}/>
          <FormHelperText sx={{margin: ".25rem", height: "1rem", color: Theme.palette.secondary.contrastText}}>Data</FormHelperText>
        </Box>
        <Box>
          <Checkbox
            defaultChecked
            color="primary"
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
              color: Theme.palette.secondary.contrastText,
              }}>
            Przypomnienie</FormHelperText>
        </Box>
      <Button
        type="submit"
        variant="outlined"
        sx={{
          height: "3rem",
          color: Theme.palette.primary,
          backgroundColor: Theme.palette.secondary.contrastText,
          ":hover": {backgroundColor: Theme.palette.primary.contrastText},
          }}>
        Dodaj</Button>
      </FormControl>
    </Box>
    
  );
};

export default AddEventForm;