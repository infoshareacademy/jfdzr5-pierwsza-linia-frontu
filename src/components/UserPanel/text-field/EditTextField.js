import { TextField } from "@mui/material";
import { Theme } from "../../../common/theme/theme";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const CssTextField = styled(TextField)({
  input: {
    color: "#000",
    backgroundColor: "#fff",
    borderRadius: "5px",
  },
  "& label.Mui-focused": {},
  "& .MuiInput-underline:after": {
    borderColor: "green",
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black",
      color: "white",
    },
    "&:hover fieldset": {
      borderColor: Theme.palette.primary.contrastText,
      input: {
        color: "#fff",
      },
    },
    "&.Mui-focused fieldset": {},
  },
});

export const EditTextField = ({ value, onChange, label }) => {
  return (
    <CssTextField
      label={label}
      autoFocus
      fullWidth
      value={value}
      onChange={onChange}
    />
  );
};
