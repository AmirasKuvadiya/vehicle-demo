import React, { useEffect, useState } from 'react';
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

const CarModelTable = () => {
    const classes = useStyles();
    const [car, setCars] = useState([]);
    const [search, setSearch] = React.useState();

    const filterByModel = () => { const fetchMeals = async () => {
        const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${search}?format=json`);
        const responseData = await response.json();
        const loadedcar = [];
        for (const key of responseData.Results) {
            loadedcar.push({
                id: key,
                Make_ID: key.Make_ID,
                Make_Name: key.Make_Name,
                Model_ID: key.Model_ID,
                Model_Name: key.Model_Name,

            });
        }
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

                    <Button variant="outlined" color="primary" onClick={filterByModel} className={classes.button} className="marginAuto">
                        Search
                    </Button>
                </div>
            </div>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Make_ID</StyledTableCell>
                            <StyledTableCell align="center">Make_Name</StyledTableCell>
                            <StyledTableCell align="center">Model_ID</StyledTableCell>
                            <StyledTableCell align="center">Model_Name</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {car.length > 0 ? car.map((row, index) => (
                        <TableBody>
                            <StyledTableRow key={index}>
                                <StyledTableCell >{row.Make_ID}</StyledTableCell>
                                <StyledTableCell align="center">{row.Make_Name}</StyledTableCell>
                                <StyledTableCell align="center">{row.Model_ID}</StyledTableCell>
                                <StyledTableCell align="center">{row.Model_Name}</StyledTableCell>
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

export default CarModelTable;