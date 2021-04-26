import React ,{Fragment, useEffect ,useState}from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

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
    radio:{
      display:"block"
  }});

const Car = ()=> {
    const classes = useStyles();
    const [car, setCars] = useState([]);
    // const [model, setModel] = useState([]);
    // const [name, setName] = useState([]);
    // const [year, setYear] = useState([]);
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Choose wisely');
    const [search, setSearch] = React.useState();
    const [searchFlag,setsearchFlag] = React.useState(false);
  
    const handleRadioChange = (event) => {
      setValue(event.target.value);
      setHelperText(' ');
      setsearchFlag(true);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();  
      if (value === 'name') {
        filterByName();        
      } else if (value === 'model') {
        filterByModel();  
      } else if (value === 'year') {
        filterByYear();

      }
      
    };
   const filterByName =()=>{
      const fetchMeals = async () => {
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
        // console.log("loadedcar",loadedcar);
        setCars(loadedcar);
       
      };
      if(search){
        fetchMeals();
      }
      setSearch('');
    
    
    }
    const filterByModel =()=>{
     
      const fetchMeals = async () => {
        const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/honda/modelyear/${search}?format=json`);
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
      if(search){
        fetchMeals();
      }
      setSearch('');
    }
    const filterByYear =()=>{
      const fetchMeals = async () => {
        const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/honda/modelyear/${search}?format=json`);
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
      if(search){
        fetchMeals();
      }
      setSearch('');
    }
 
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
    <div>
       <form onSubmit={handleSubmit}>
  <FormControl component="fieldset" error={error} className={classes.formControl}>
    <div>
    <RadioGroup  className={classes.radio} aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
      <FormControlLabel value="name" control={<Radio />} label="Filter By Type" />
      <FormControlLabel value="model" control={<Radio />} label="Filter By Model" />
      <FormControlLabel value="year" control={<Radio />} label="Filter By Year" />
      {searchFlag && <div className={classes.search} >
        <TextField id="search-basic" label="search" value={search} onChange={ (event) => setSearch(event.target.value) }/>
     
          <Button type="submit" variant="outlined" color="primary" className={classes.button}>
          Check Answer
        </Button>
         </div>
      }  
    </RadioGroup>
    </div>   
  </FormControl>
</form>
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
      {car.length>0 ? car.map((row ,index) => (
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

export default Car;
