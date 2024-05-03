import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ModalWindow({open, closeModal, setNewItem, addItem}:
  {
    open:boolean, 
    closeModal:()=>void,
    setNewItem: React.Dispatch<React.SetStateAction<string>>;
     addItem:(name:string)=>void}) {

  

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
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
            console.log(name);
            // setNewItem(name)
            addItem(name)
          },
        }}
      >
        <DialogTitle>Ստեղծել նոր պատվիրատու</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Եթե ցանկանում եք ստեղծել նոր պատվիրատու, ապա մուտքագրեք անվանում
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
