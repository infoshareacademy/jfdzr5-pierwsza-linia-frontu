import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";

export function DeleteDialog({ open, handleClose, handleDeleteTask }) {
    const theme = useTheme();
    const buttonProps = {
        margin: "5px 5px 5px auto",
        background: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        border: `2px solid ${theme.palette.secondary.main}`,
        borderRadius: "0px",
        transition: "all",
        transitionDuration: "0.3s",
        ":hover": {
            color: theme.palette.primary.main,
            background: theme.palette.primary.contrastText,
            border: `2px solid ${theme.palette.primary.contrastText}`,
            borderRadius: "0",
        },
    }
    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Czy usunąć zadanie?</DialogTitle>
            <DialogActions>
                <Button
                    sx={buttonProps}
                    onClick={handleClose}>
                    Nie
                </Button>
                <Button
                    sx={buttonProps}
                    onClick={handleDeleteTask}>
                    Tak
                </Button>
            </DialogActions>
        </Dialog>
    )
}