import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
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
    </FormControl>
  );
};
export default CountryPicker;
