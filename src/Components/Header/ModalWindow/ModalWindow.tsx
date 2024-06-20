import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ModalWindowProps {
  open: boolean;
  closeModal: () => void;
  setNewItem: React.Dispatch<React.SetStateAction<string>>;
  addItem: (name: string) => void;
  modalTextInformation: {
    title: string;
    content: string;
  };
}

export default function ModalWindow({open, 
  closeModal, 
  setNewItem,
   addItem,
   modalTextInformation
  }:ModalWindowProps) {

  return (
    <React.Fragment>
 
      <Dialog
        open={open}
        onClose={closeModal}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const name = formJson.name;
           
            addItem(name)
          },
        }}
      >
        <DialogTitle>{modalTextInformation.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {modalTextInformation.content}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Անվանում"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Չեղարկել</Button>
          <Button type="submit" onClick={()=>addItem}>Պահպանել</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
