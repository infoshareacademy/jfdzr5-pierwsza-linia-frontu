import { Button, Icon } from "@mui/material";
import { Theme } from "../theme/theme";

export const DeleteButton = ({ handleClickOpen, id }) => {
  return (
    <Button
      sx={{
        color: Theme.palette.secondary.contrastText,
        ":hover": { color: Theme.palette.primary.contrastText },
      }}
      color="secondary"
      onClick={() => handleClickOpen(id)}>
      <Icon>delete</Icon>
    </Button>
  );
};
