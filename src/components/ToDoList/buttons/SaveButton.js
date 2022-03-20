import { Button, Icon } from "@mui/material";
import { Theme } from "../../../common/theme/theme";

export const SaveButton = ({ handleClickSave, id }) => {
  return (
    <Button
      sx={{
        color: Theme.palette.secondary.contrastText,
        ":hover": { color: Theme.palette.primary.contrastText },
      }}
      color="secondary"
      onClick={() => handleClickSave(id)}>
      <Icon>save</Icon>
    </Button>
  );
};
