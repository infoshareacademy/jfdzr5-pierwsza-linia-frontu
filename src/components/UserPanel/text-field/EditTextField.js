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

export const EditTextField = ({ value, onChange, label }) => {
  return (
    <CssTextField
      variant="filled"
      label={label}
      autoFocus
      fullWidth
      value={value}
      onChange={onChange}
      sx={{
        // backgroundColor: Theme.palette.secondary.contrastText,
        // borderRadius: "0px",
        ":hover": {
          backgroundColor: Theme.palette.primary.contrastText,
          border: "none",
        },
      }}
    />
  );
};
