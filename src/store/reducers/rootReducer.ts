import { combineReducers } from 'redux';
import list from './shipmentsList';
import details from './shipmentDetails';

const rootReducer = combineReducers({
  list,
  details,
});

export default rootReducer;
