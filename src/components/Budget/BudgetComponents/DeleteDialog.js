import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Theme } from "../../../common/theme/theme";

export function DeleteDialog({ open, handleClose, handleDeleteTask }) {

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Czy chcesz usunąć?</DialogTitle>
            <DialogActions>
                <Button
                    sx={{
                        margin: "5px 5px 5px auto",
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
                    Nie
                </Button>
                <Button
                    sx={{
                        margin: "5px auto 5px 5px",
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
                    onClick={handleDeleteTask}>
                    Tak
                </Button>
            </DialogActions>
        </Dialog>
    )
}