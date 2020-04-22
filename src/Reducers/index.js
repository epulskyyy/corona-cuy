import { combineReducers } from 'redux';
import DataCorona from './DataCorona';
const RootReducer = combineReducers({
  dataCorona: DataCorona,
});
export default RootReducer;
