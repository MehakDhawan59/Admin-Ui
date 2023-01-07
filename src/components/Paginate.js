import React from 'react';
import ReactDOM from 'react-dom/client';
import DataGrid from 'react-data-grid';
import "./Paginate.css";
import {CircularProgress,Grid,InputAdornment,TextField,Box, Button} from "@mui/material";

const Paginate = ({numberOfPages, setPageNumber, prevPage, nextPage, pageNumbers}) =>{

    

   return (
    <>
    
            <Grid container direction="row" justifyContent="center">
                <Button onClick={() => setPageNumber(1)}>{"<<"}</Button>
                <Button onClick={prevPage}>{"<"}</Button>
                {pageNumbers.map((number) => (
                        <Button key ={number}onClick={() => setPageNumber(number)}>{number}</Button>
                ))}
                <Button onClick={nextPage}>{">"}</Button>
                <Button onClick={() => setPageNumber(numberOfPages)}>{">>"}</Button>
            </Grid>

            </>
 );
}

export default Paginate;