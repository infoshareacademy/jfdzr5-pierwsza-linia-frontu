import { TextField } from "@mui/material";
import { Theme } from "../../../common/theme/theme";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  input: {
    color: "#000",
    backgroundColor: "#fff",
    border: "1px solid grey",
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

export const PassowrdTextFieldConfirm = ({ value, onChange, label }) => {
  return (
    <CssTextField
      variant="filled"
      type="password"
      label={label}
      fullWidth
      value={value}
      onChange={onChange}
    />
  );
};
