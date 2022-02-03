import { Button, Icon } from "@mui/material";
import { Theme } from "../theme/theme";

export const DeleteButton = ({ handleClickDelete, id }) => {
  return (
    <Button
      sx={{
        color: Theme.palette.secondary.contrastText,
        ":hover": { color: Theme.palette.primary.contrastText },
      }}
      color="secondary"
      onClick={() => handleClickDelete(id)}>
      <Icon>delete</Icon>
    </Button>
  );
};
