import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

const Account = () => {
  const location = useLocation();
  const state= location.state  ;
  const userName = state?.name;
  const userEmail = state?.email;
  const userPhone = state?.phone;
  const userpassword = state?.password;
  const [userData, setUserData] = useState({
    name: userName,
    email: userEmail,
    phone: userPhone,
    password: userpassword,
  });
  const [editMode, setEditMode] = useState(false);

  const handleInputChange =async (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated user data:', userData);
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <div className="account-container mx-auto max-w-2xl p-4">
      <h2 className="text-2xl font-bold text-center mb-8">Your Account Info</h2>

      <form className="user-details-form " onSubmit={handleSubmit}>
        <table className="user-details-table ">
          <tbody>
          <tr className='ml-8'>
          <td className="label">Name</td>
          <td className='ml-12'>
            <TextField
              disabled={!editMode}
              id="outlined-disabled"
              defaultValue={userData.name}
              variant="standard"
              fullWidth
              onChange={handleInputChange}
              className='ml-6'
            />
          </td>
        </tr>
        <tr className='mt-6'>
          <td className="label">Email</td>
          <td>
            <TextField
              disabled={!editMode}
              id="outlined-disabled"
              defaultValue={userData.email}
              variant="standard"
              fullWidth
              onChange={handleInputChange}
            />
          </td>
        </tr>
        <tr className='mt-6'>
          <td className="label">Phone</td>
          <td>
            <TextField
              disabled={!editMode}
              id="outlined-disabled"
              defaultValue={userData.phone}
              variant="standard"
              fullWidth
              onChange={handleInputChange}
            />
          </td>
        </tr>
        <tr className='mt-6 '>
          <td className="label">Password</td>
          <td>
            <TextField
              disabled={!editMode}
              id="outlined-disabled"
              type="password"
              defaultValue={userData.password}
              variant="standard"
              fullWidth
              onChange={handleInputChange}
              className='ml-[24px]'
            />
          </td>
        </tr>
          </tbody>
        </table>

        {editMode && (
          <Button className="save-button mt-32 ml-48 " variant="contained" type="submit">
            Save 
          </Button>
        )}

        {!editMode && (
          <Button className="edit-button mt-4 m-[25px]" variant="contained" type="button" onClick={handleEdit}>
            Edit
          </Button>
        )}
      </form>
    </div>
  );
};

export default Account;
