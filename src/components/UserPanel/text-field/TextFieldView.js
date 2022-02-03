import { TextField } from "@mui/material";

export const TextFieldView = ({ label, value, handleClick }) => {
  return (
    <TextField fullWidth label={label} value={value} onClick={handleClick} />
  );
};
