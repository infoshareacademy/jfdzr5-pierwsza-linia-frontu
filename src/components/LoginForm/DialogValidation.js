import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import { Theme } from "../../common/theme/theme";

export const DialogValidation = ({
  title,
  openValidationDialog,
  handleClose,
}) => {
  return (
    <Dialog
      open={openValidationDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogActions sx={{ justifyContent: "center", alignItems: "center" }}>
        <Button
          sx={{
            // margin: "5px 5px 5px auto",
            background: Theme.palette.secondary.main,
            color: Theme.palette.secondary.contrastText,
            border: `2px solid ${Theme.palette.secondary.main}`,
            borderRadius: "0px",
            transition: "all",
            transitionDuration: "0.3s",
            ":hover": {
              color: Theme.palette.primary.main,
              background: Theme.palette.primary.contrastText,
              border: `2px solid ${Theme.palette.primary.contrastText}`,
              borderRadius: "0",
            },
          }}
          onClick={handleClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
