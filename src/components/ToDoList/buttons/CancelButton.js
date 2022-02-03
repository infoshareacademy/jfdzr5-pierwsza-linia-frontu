import { Button, Icon } from "@mui/material";
import { Theme } from "../theme/theme";

export const CancelButton = ({ handleClickCancel, id }) => {
  return (
    <Button
      sx={{
        color: Theme.palette.secondary.contrastText,
        ":hover": { color: Theme.palette.primary.contrastText },
      }}
      color="secondary"
      onClick={() => handleClickCancel(id)}>
      <Icon>cancel</Icon>
    </Button>
  );
};
