import {
  FETCHING_DATA_CORONA,
  FETCHING_DATA_CORONA_DAILY,
  FETCHING_DATA_CORONA_COUNTRIES,
  HANDLE_CHANGE_DATE,
} from '../Utils/ActionTypes';

const initialState = {
  data: null,
  dataDaily: [],
  dataCountries: [],
  country: '',
  dateFrom: '',
  dateTo: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA_CORONA:
      return { ...state, data: action.payload, country: action.country };
    case FETCHING_DATA_CORONA_DAILY:
      const fromDate = { ...action.payload[0] };
      const from = Object.assign(fromDate);
      const toDate = { ...action.payload[action.payload.length - 1] };
      const to = Object.assign(toDate);

      return {
        ...state,
        dataDaily: action.payload,
        dateFrom: from.date,
        dateTo: to.date,
      };
    case FETCHING_DATA_CORONA_COUNTRIES:
      return { ...state, dataCountries: action.payload };
    case HANDLE_CHANGE_DATE:
      let dateFrom = '';
      let dateTo = '';
      if (action.name === 'dateFrom') {
        dateFrom = action.value;
      } else if (action.name === 'dateTo') {
        dateTo = action.value;
      }

      const dto = state.dataDaily.filter(
        (data) =>
          data.date >= (dateFrom === '' ? state.dateFrom : dateFrom) &&
          data.date <= (dateTo === '' ? state.dateTo : dateTo)
      );
      console.log(dateFrom);
      console.log(dateTo);
      return { ...state, dataDaily: dto, [action.name]: action.value };
    default:
      return state;
  }
}
