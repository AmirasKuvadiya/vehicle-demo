import React ,{useEffect ,useState}from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Input, TextField } from '@material-ui/core';  

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
    search:{
        width: 200,
        float: "right",
        margin: 10
    }
  });

const Type = ()=> {

  

    const classes = useStyles();
    const [car, setCars] = useState([]);
    const [search, setSearch] = useState([]);
    
   

    useEffect(() => {
        setSearch((e)=>{
            console.log(e);
        const filterValue = e.toLowerCase();
        
        if(filterValue){
            var data = car.filter((name) => name.Model_Name.toLowerCase().indexOf(filterValue) === 0);
            setCars(data);
          
        }else{
            setCars(car);       
        }
        })
    
    }, [search])

    useEffect(() => {
      const fetchMeals = async () => {
        const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/honda?format=json');
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
        // console.log("loadedcar",loadedcar);
        setCars(loadedcar);
      };
  
      fetchMeals();
    }, []);
  
  return (
    <TableContainer component={Paper}>
        <div className={classes.search}>
        <input id="search-basic" label="search" onChange={ (event) => setSearch(event.target.value) }/>
        </div>
        

    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Make_ID</StyledTableCell>
          <StyledTableCell align="center">Make_Name</StyledTableCell>
          <StyledTableCell align="center">Model_ID</StyledTableCell>
          <StyledTableCell align="center">Model_Name</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {car.map((row ,index) => (
          <StyledTableRow key={index}>
            <StyledTableCell >{row.Make_ID}</StyledTableCell>
            <StyledTableCell align="center">{row.Make_Name}</StyledTableCell>
            <StyledTableCell align="center">{row.Model_ID}</StyledTableCell>
            <StyledTableCell align="center">{row.Model_Name}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
    );
}

export default Type;
