import { OutlinedInput } from "@mui/material";
import { Theme } from "../../../common/theme/theme";

export const AddInput = ({ value, onChange }) => {
  return (
    <OutlinedInput
      required
      inputProps={{
        pattern: "[0-9]+(.|,)?[0-9]{0,2}",
        title: "podaj liczbę z maks. 2 cyframi po przecinku ",
      }}
      placeholder="Podaj kwotę..."
      value={value}
      onChange={onChange}
      sx={{
        width: "100%",
        height: "3rem",
        backgroundColor: Theme.palette.secondary.contrastText,
        ":hover": { backgroundColor: Theme.palette.primary.contrastText },
      }}
    />
  );
};
