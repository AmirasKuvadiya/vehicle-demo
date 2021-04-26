import React, { Fragment, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './table.css';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#0183C1',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    radio: {
        display: "block"
    }
});

const CarTypeTable = () => {
    const classes = useStyles();
    const [car, setCars] = useState([]);
    // const [model, setModel] = useState([]);
    // const [name, setName] = useState([]);
    // const [year, setYear] = useState([]);
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Choose wisely');
    const [search, setSearch] = React.useState();
    const [searchFlag, setsearchFlag] = React.useState(false);

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setHelperText(' ');
        setsearchFlag(true);
    };


    
    const filterByName = () => {
        const fetchMeals = async () => {
            console.log("filterbyname");
            const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/${search}?format=json`);
            const responseData = await response.json();
            const loadedcar = [];
            for (const key of responseData.Results) {
                loadedcar.push({
                    id: key,
                    MakeId: key.MakeId,
                    MakeName: key.MakeName,
                    VehicleTypeId: key.VehicleTypeId,
                    VehicleTypeName: key.VehicleTypeName,
                });
            }
            // console.log("loadedcar",loadedcar);
            setCars(loadedcar);

        };
        if (search) {
            fetchMeals();
        }
        setSearch('');


    }
    
    useEffect(() => {
    }, []);

    return (
        <div>
           
                   <div className="float-right">
                   <div className={classes.search} className="mb-2 displayFlex">
                        <TextField id="search-basic" label="search" value={search} onChange={(event) => setSearch(event.target.value)} />

                        <Button type="submit" variant="outlined" onClick={filterByName}color="primary" className={classes.button} className="marginAuto">
                        Search 
                        </Button>
                    </div>
                   </div>
              
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            
                            <StyledTableCell align="center">MakeId</StyledTableCell>
                            <StyledTableCell align="center">MakeName</StyledTableCell>
                            <StyledTableCell align="center">VehicleTypeId</StyledTableCell>
                            <StyledTableCell align="center">VehicleTypeName</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {car.length > 0 ? car.map((row, index) => (
                        <TableBody>
                            <StyledTableRow key={index}>
                                <StyledTableCell >{row.MakeId}</StyledTableCell>
                                <StyledTableCell align="center">{row.MakeName}</StyledTableCell>
                                <StyledTableCell align="center">{row.VehicleTypeId}</StyledTableCell>
                                <StyledTableCell align="center">{row.VehicleTypeName}</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    )) :
                        <TableBody>
                            <StyledTableRow>Data Not Found</StyledTableRow>
                        </TableBody>}
                </Table>
            </TableContainer>

        </div>

    );
}

export default CarTypeTable;