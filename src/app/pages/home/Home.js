import React, { Fragment, useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CarModelTable from '../tables/CarModel';
import CarTypeTable from '../tables/CarType';
import CarYearTable from '../tables/CarYear';

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    radio: {
        display: "block"
    }
});

const Home = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState('name');

    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="d-flex">

            <div>
                <RadioGroup className={classes.radio} aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
                    <FormControlLabel value="model" control={<Radio />} label="Filter By Model" />
                    <FormControlLabel value="type" control={<Radio />} label="Filter By Type" />
                    <FormControlLabel value="year" control={<Radio />} label="Filter By Year" />
                </RadioGroup>
            </div>
            <div>
                {(value == "model") && <CarModelTable />}
                {(value == "type") && <CarTypeTable />}
                {(value == "year") && <CarYearTable />}

            </div>

        </div>

    );
}

export default Home;