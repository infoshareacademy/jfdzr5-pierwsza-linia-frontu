import { TextField } from "@mui/material";
import { Theme } from "../../../common/theme/theme";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  input: {
    color: "#fff",
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
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {},
  },
});

export const TextFieldView = ({ label, value, handleClick }) => {
  return (
    <CssTextField
      id="custom-css-outlined-input"
      fullWidth
      label={label}
      value={value}
      onClick={handleClick}
      sx={{
        // backgroundColor: Theme.palette.secondary.contrastText,
        borderRadius: "5px",
        ":hover": {
          backgroundColor: Theme.palette.primary.contrastText,
          border: "none",
        },
      }}
    />
  );
};
