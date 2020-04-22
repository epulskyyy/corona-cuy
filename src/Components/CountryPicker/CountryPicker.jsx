import React, { useState, useEffect } from 'react';
import {
  NativeSelect,
  FormControl,
  Grid,
  Card,
  TextField,
  CardContent,
  Typography,
} from '@material-ui/core';
import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api';
const CountryPicker = ({ handleCountryChange }) => {
  const [dataCountries, setDataCountries] = useState([]);
  useEffect(() => {
    const FetchAPI = async () => {
      setDataCountries(await fetchCountries());
    };
    FetchAPI();
  }, [setDataCountries]);
  return (
    <FormControl className={styles.fromControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">Global</option>
        {dataCountries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
      <Grid component={Card}>
        <CardContent>
          <Typography>Filter By Date</Typography>
          <TextField
            id="date"
            label="from"
            type="date"
            defaultValue="2017-05-24"
            className={styles.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="date"
            label="to"
            type="date"
            defaultValue="2017-05-24"
            className={styles.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </CardContent>
      </Grid>
    </FormControl>
  );
};
export default CountryPicker;
