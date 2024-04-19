import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// import SideBar from './SideBar';
import Navbar from './Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();


  const { state } = useLocation();
  const userName = state.name||" " 
  


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log("form",formJson)
    const cart_no = formJson.cart_no;
    
    handleClose();
    // Navigate to '/Cart' with props as email
    navigate(`/Cart`,  { state: { ...state, cart_no } });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} >
       Select Cart
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Cart Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="cart_no"
            label="Enter Cart number"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">OK</Button>
        </DialogActions>
      </Dialog>
      <Navbar  name={userName}/>
      <SideBar state={state}/>
    </div>
  );
};

export default Home;
