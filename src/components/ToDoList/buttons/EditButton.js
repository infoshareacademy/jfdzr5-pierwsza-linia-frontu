import { Button, Icon } from "@mui/material";
import { Theme } from "../theme/theme";

export const EditButton = ({ handleClickEdit, id }) => {
  return (
    <Button
      sx={{
        color: Theme.palette.secondary.contrastText,
        ":hover": { color: Theme.palette.primary.contrastText },
      }}
      color="secondary"
      onClick={() => handleClickEdit(id)}>
      <Icon>edit</Icon>
    </Button>
  );
};
