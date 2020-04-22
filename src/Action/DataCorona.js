import { coronaAPI } from '../Utils/Contents';
import {
  FETCHING_DATA_CORONA,
  FETCHING_DATA_CORONA_DAILY,
  FETCHING_DATA_CORONA_COUNTRIES,
  HANDLE_CHANGE_DATE,
} from '../Utils/ActionTypes';
import axios from 'axios';
export const fetchDataCorona = (country) => {
  let changeableURL = coronaAPI;
  if (country) {
    changeableURL = `${coronaAPI}/countries/${country}`;
  }
  return (dispatch) => {
    axios
      .get(changeableURL)
      .then((res) => {
        dispatch(fetchDataSuccess(res.data, country));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
const fetchDataSuccess = (data, country) => {
  return { type: FETCHING_DATA_CORONA, payload: data, country: country };
};

export const fetchDailyData = () => {
  return (dispatch) => {
    axios
      .get(`${coronaAPI}/daily`)
      .then(({ data }) => {
        const modifiedData = data.map((dailyData) => ({
          confirmed: dailyData.confirmed.total,
          recovered: dailyData.recovered.total,
          deaths: dailyData.deaths.total,
          date: dailyData.reportDate,
        }));
        dispatch(fetchDailyDataSuccess(modifiedData));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const fetchDailyDataSuccess = (data) => {
  return { type: FETCHING_DATA_CORONA_DAILY, payload: data };
};

export const fetchCountries = () => {
  return (dispatch) => {
    axios
      .get(`${coronaAPI}/countries`)
      .then(({ data: { countries } }) => {
        dispatch(
          fetchCountriesDataSuccess(countries.map((country) => country.name))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const fetchCountriesDataSuccess = (data) => {
  return { type: FETCHING_DATA_CORONA_COUNTRIES, payload: data };
};
export const handleChangeDate = (e) => {
  return (dispatch) => {
    dispatch({
      type: HANDLE_CHANGE_DATE,
      name: e.target.name,
      value: e.target.value,
    });
  };
};
