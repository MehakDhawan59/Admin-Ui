import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ClearIcon from '@mui/icons-material/Clear';
import {CircularProgress,Grid,InputAdornment,TextField,Box, Button} from "@mui/material";
import IconButton from '@mui/material/IconButton';

const EditUser=({handleClickOpen, handleClose, open, users, selectedId, setUsers, setOpen, setOriginalUsers, setSelectedId})=>{

    
    const selecteduser = users.filter((user)=>user.id===selectedId);
    console.log("selecteduser", selecteduser);
    const[editDetail, setEditDetail] = useState({
      name:"",
      email:"",
      role:""
    })

    const handleValueChanges=(e)=>{
      setEditDetail({
        ...editDetail,
        [e.target.name]: e.target.value,
      });
      console.log(editDetail);

    }

    const submit = (event) => {
      event.preventDefault();
      console.log("event", event);
     
        const editedUser = users.map((user) => {
          if (user.id=== selectedId) {
              if(editDetail.name && editDetail.email && editDetail.role){

                return {
                  ...user,
                  name: editDetail.name ,
                  email: editDetail.email,
                  role:editDetail.role 
                };

              }

              else if(editDetail.name){
                return {
                  ...user,
                  name: editDetail.name ,
                  email: user.email,
                  role:user.role 
                };
              }

              else if(editDetail.email){
                return {
                  ...user,
                  name: user.name ,
                  email: editDetail.email,
                  role:user.role
                };
              }

              else if(editDetail.role){
                return {
                  ...user,
                  name: user.name ,
                  email: user.email,
                  role:editDetail.role
                };
              }
              
          }
          setEditDetail({
            name:"",
            email:"",
            role:""
          })
         
          return user;
        });
        setOpen(false);
        setOriginalUsers(editedUser);
        setUsers(editedUser);
        setSelectedId("");
    };

    return(


        <Dialog open={open} onClose={handleClose} 
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "40%",
              maxWidth: "500px", 
              backgroundColor:"#292c2f" ,
              color:"white"// Set your width here
            },
          },
        }}>
          <Grid container direction="row" justifyContent="space-between">
              <DialogTitle>Update Details</DialogTitle>
              <IconButton aria-label="close"onClick={handleClose}>
                  <ClearIcon sx={{color:"white"}}/>
                  </IconButton>
                  
          </Grid>
        <DialogContent sx={{padding:"1rem"}}>
        
          <TextField
              fullWidth
              id="outlined-helperText"
              name="name"
              label="Name"
              onChange={handleValueChanges}
              defaultValue={selecteduser[0].name}
              sx={{marginBottom:"0.5rem", color:"#292c2f",
                  "& .MuiInputBase-root": {
                      color: 'white'
                  },
                  "& .MuiFormLabel-root": {
                      color: "rgba(246, 244, 244, 0.5)"
                  },}}
             /> 
              <TextField
              fullWidth
              id="outlined-helperText"
              name="email"
              label="Email"
              onChange={handleValueChanges}
              defaultValue={selecteduser[0].email}
              sx={{marginBottom:"0.5rem", color:"#292c2f",
                  "& .MuiInputBase-root": {
                      color: 'white'
                  },
                  "& .MuiFormLabel-root": {
                      color: "rgba(246, 244, 244, 0.5)"
                  },}}
             />
              <TextField
              fullWidth
              id="outlined-helperText"
              name="role"
              label="Role"
              onChange={handleValueChanges}
              defaultValue={selecteduser[0].role}
              sx={{marginBottom:"0.5rem", color:"#292c2f",
                  "& .MuiInputBase-root": {
                      color: 'white'
                  },
                  "& .MuiFormLabel-root": {
                      color: "rgba(246, 244, 244, 0.5)"
                  },}}
             />
             </DialogContent>
          <DialogActions sx={{justifyContent:"flex-start", paddingBottom:"1rem", paddingLeft:"1rem" }}  >
          <Button variant="contained" onClick={submit} sx={{backgroundColor:"red",color:"white"}}>Update</Button>
          <Button onClick={handleClose} sx={{color:"white"}}>Cancel</Button>
        </DialogActions>
      </Dialog>   
    )

}

export default EditUser;