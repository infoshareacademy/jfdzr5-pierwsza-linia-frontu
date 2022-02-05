import { TextField } from "@mui/material";

export const TextFieldReadOnly = ({ value, label }) => {
  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      InputProps={{
        readOnly: true,
      }}
    />
  );
};
