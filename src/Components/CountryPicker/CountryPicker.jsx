import React, { useEffect } from 'react';
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
import {
  fetchCountries,
  fetchDataCorona,
  handleChangeDate,
} from '../../Action/DataCorona';
import { connect } from 'react-redux';
const CountryPicker = ({
  fetchCountries,
  fetchDataCorona,
  dataCountries,
  country,
  toDate,
  fromDate,
  handleChangeDate,
}) => {
  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);
  const handleCountryChange = (country) => {
    fetchDataCorona(country);
  };
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
      {country ? null : (
        <Grid component={Card}>
          <CardContent>
            <Typography>Filter By Date</Typography>
            <TextField
              id="date"
              onChange={handleChangeDate}
              name="dateFrom"
              label="from"
              type="date"
              value={fromDate}
              className={styles.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="date"
              onChange={handleChangeDate}
              name="dateTo"
              label="to"
              type="date"
              value={toDate}
              className={styles.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </CardContent>
        </Grid>
      )}
    </FormControl>
  );
};
const mapStateToProps = (state) => {
  return {
    country: state.dataCorona.country,
    data: state.dataCorona.data,
    dailyData: state.dataCorona.dataDaily,
    fromDate: state.dataCorona.dateFrom,
    toDate: state.dataCorona.dateTo,
    dataCountries: state.dataCorona.dataCountries,
  };
};

export default connect(mapStateToProps, {
  fetchDataCorona,
  fetchCountries,
  handleChangeDate,
})(CountryPicker);
