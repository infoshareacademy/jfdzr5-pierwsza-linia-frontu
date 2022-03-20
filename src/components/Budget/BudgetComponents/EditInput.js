import { OutlinedInput } from "@mui/material";
import { Theme } from "../../../common/theme/theme";

export const EditInput = ({ value, onChange, type, width }) => {
  return (
    <OutlinedInput
      required
      type={type}
      value={value}
      onChange={onChange}
      sx={{
        width: { width },
        height: "3rem",
        backgroundColor: Theme.palette.secondary.contrastText,
        ":hover": {
          backgroundColor: Theme.palette.primary.contrastText,
        },
      }}
    />
  );
};
