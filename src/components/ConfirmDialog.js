import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import './ConfirmDialog.scss';

const ConfirmDialog = ({ open, handleClose, handleConfirm }) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{backgroundColor:'green', color:'white', fontFamily:'Montserrat, sans-serif', fontStyle: 'italic'}}>Confirm deletion </DialogTitle>
            <DialogContent className="dialog-content">
                <DialogContentText id="alert-dialog-description">
                    Do you want to confirm deleting this item ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">
                    Cancel
                </Button>
                <Button onClick={handleConfirm} color="success" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;