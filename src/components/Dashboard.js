import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import ReactPaginate from 'react-paginate';
import { ConstructionSharp, LocalDining, Search, SentimentDissatisfied } from "@mui/icons-material";
import {CircularProgress,Grid,InputAdornment,TextField,Box, Button} from "@mui/material";
import './Dashboard.css';
import Paginate from './Paginate';
import axios from "axios";
import { useSnackbar } from "notistack";
import DataGrid ,{GridColDef, GridValueGetterParams}from 'react-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ClearIcon from '@mui/icons-material/Clear';
import EditUser from './EditUser';
const Dashboard =()=>{

    const { enqueueSnackbar } = useSnackbar();
    const[users, setUsers]= useState([]);
    const[loading, setloading]= useState(false);
    const[originalUsers, setOriginalUsers] = useState([]);
    const URL = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const [open, setOpen] = useState(false);
    const[selectedId, setSelectedId] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [checkedUsers, setCheckedUsers] = useState([]);
    const[allHeader, setallHeader]=useState([]);
    const[checkAllClicked, setCheckAllClicked]=useState([]);
    // get admin users data
    const getAdminUsersData = async () => {
        
            try{
                setloading(true);
                const res = await axios.get(URL);
                setUsers(res.data);
                setOriginalUsers(res.data);
                console.log(res.data);
                //console.log("products inside api call", products);
                setloading(false);
                return res.data;
            }
            catch(error){
              enqueueSnackbar(error.response.data.message, { variant: "error" });
              console.log(error);
              setloading(false);
            }
            
    };
            const [currentPage, setCurrentPage] = useState(1);
            const [usersPerPage, setUsersPerPage] = useState(10);
            const indexOfLastUser = currentPage * usersPerPage;
           // console.log("index last",indexOfLastUser);
            const indexOfFirstUser = indexOfLastUser - usersPerPage;
            //console.log("index first",indexOfFirstUser);
            const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
            console.log("currentusers", currentUsers);
            const numberOfPages = Math.ceil(users.length/usersPerPage);
            //console.log("numberofpages", numberOfPages);


    useEffect(() => {

        getAdminUsersData();

      },[]);

      const setPageNumber=(number)=>{
        setCurrentPage(number);
        
      }
      const prevPage =()=>{
        if(currentPage!==1){
            setCurrentPage(currentPage-1);
        }
      }

      const nextPage =()=>{
        if(currentPage!==numberOfPages){
            setCurrentPage(currentPage+1);
        }
      }

      const searchUser=(e)=>{

        let targetValue = e.target.value;
        if(targetValue.length>0){
            let filterednameUsers = users.filter((user)=>user.name.startsWith(targetValue) || user.email.startsWith(targetValue) || user.role.startsWith(targetValue));
                setUsers(filterednameUsers);
            }
        else{
            setUsers(originalUsers);
        }
       

      }

      const deleteUser=(id)=>{
        let filteredUsers = users.filter((user)=>user.id!==id);
        setUsers(filteredUsers);
      }

      const handleClickOpen=(id)=>{
        setSelectedId(id);
        setOpen(true);
      }

      const handleClose = () => {
        setOpen(false);
        setSelectedId("");
    };
    const handleOnChange = (id) => {
        if(checkedUsers.includes(id)){
            setCheckedUsers(checkedUsers.filter((user)=>user!==id));
            console.log("checkeduser", checkedUsers);
        }
        else{
            checkedUsers.push(id);
            setCheckedUsers([...checkedUsers]);
            console.log("checkeduser", checkedUsers);
        }
        
      };

      const deleteSelected=(users, checkedUsers)=>{
        if (checkedUsers.length>0){
            
            const filteredUser= users.filter(user => !checkedUsers.find(checkuser => (checkuser===user.id) ))
            setUsers(filteredUser);
            setCheckAllClicked([]);
        } 
           
      }

      const allSelected=()=>{
       
        setIsChecked(!isChecked);
        //console.log("ischecked", isChecked);
        if(isChecked===false){
            for(let i=0; i<currentUsers.length;i++){
                checkedUsers.push(currentUsers[i].id);
                setCheckedUsers([...checkedUsers]);
            }
        }
        else{
            setCheckedUsers([]);
        }
      }

      const allClicked=(num)=>{

        if(checkAllClicked.includes(num)){
            const filteredUser= checkedUsers.filter(user => !currentUsers.find(currentuser => (currentuser.id===user) ))
            setCheckedUsers(filteredUser);
            setCheckAllClicked(checkAllClicked.filter((checkuser)=>checkuser!==num));
        }
        else{
            checkAllClicked.push(num);
            setCheckAllClicked(checkAllClicked);
            for(let i=0; i<currentUsers.length;i++){
                checkedUsers.push(currentUsers[i].id);
                setCheckedUsers([...checkedUsers]);
            }
        }
      }
        
        
        const pageNumbers = [];
        for (let i = 1; i <= numberOfPages; i++) {
        pageNumbers.push(i);
        }

    return(
        <>
        <Box padding="1rem">
        <TextField
        fullWidth
        className="search-desktop"
        size="small"
        placeholder="Search by name, email or role"
        name="search"
        sx={{marginBottom:"1rem"}}
        onChange={(e)=>{searchUser(e)}}
        />
                <Box >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" padding="checkbox">
                                    <Checkbox
                                        checked={checkAllClicked.includes(currentPage)}
                                        inputProps={{
                                            'aria-labelledby': "all",
                                        }}
                                        onChange={()=>allClicked(currentPage)}
                                        
                                    /></TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Action</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {currentUsers.map((user) => (
                                <TableRow
                                    key={user.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } , backgroundColor: checkedUsers.includes(user.id) ? "#f0ebeb":"white"}}
                                    >
                                    <TableCell align="center" padding="checkbox">
                                    <Checkbox
                                        id={user.id}
                                        checked={checkedUsers.includes(user.id)}
                                        inputProps={{
                                            'aria-labelledby': user.id,
                                        }}
                                        onChange={()=>handleOnChange(user.id)}
                                        />
                                    </TableCell>
                                    <TableCell align="center">{user.name}</TableCell>
                                    <TableCell align="center">{user.email}</TableCell>
                                    <TableCell align="center">{user.role}</TableCell>
                                    <TableCell>
                                        <Button align="center" sx={{marginRight:"0.2rem"}} onClick={()=>{handleClickOpen(user.id)}}><ModeEditIcon fontSize="small" sx={{color:"black"}}/></Button>
                                        <IconButton align="center" aria-label="delete" size="small" onClick={()=>{deleteUser(user.id)}}>
                                        <DeleteIcon fontSize="small" sx={{color:"red"}} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            
                        </TableBody>
                    </Table>
                </TableContainer>
                <Paginate numberOfPages={numberOfPages} setPageNumber={setPageNumber} prevPage={prevPage} nextPage={nextPage} pageNumbers={pageNumbers}/>
                <Button sx={{backgroundColor:"red", color:"white"}} className="delete-btn" variant="contained"onClick={()=>deleteSelected(users,checkedUsers)}>Delete Selected</Button>

                {
                  selectedId.length>0 &&
               <EditUser open={open} users={users} handleClickOpen={handleClickOpen} handleClose={handleClose} selectedId={selectedId} setUsers={setUsers} setOpen={setOpen} setOriginalUsers={setOriginalUsers} setSelectedId={setSelectedId}/>
                }
                </Box>
        
        </Box>
        
        </>



    )
}

export default Dashboard;