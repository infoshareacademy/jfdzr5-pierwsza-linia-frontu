import { Button, Icon } from "@mui/material";
import { Theme } from "../../../common/theme/theme";

export const AddButton = () => {
  return (
    <Button
      variant="outlined"
      type="submit"
      color="primary"
      sx={{
        margin: "1rem",
        height: "3rem",
        color: Theme.palette.primary,
        backgroundColor: Theme.palette.secondary.contrastText,
        ":hover": { backgroundColor: Theme.palette.primary.contrastText },
      }}>
      <Icon>add</Icon>
    </Button>
  );
};
