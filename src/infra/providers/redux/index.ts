import {configureStore} from '@reduxjs/toolkit';
import {
  useDispatch as useReduxDispatch,
} from 'react-redux'
import {reducer} from './rootReducer';

export const store = configureStore({
  reducer,
});

export const useDispatch = () => useReduxDispatch<ReduxDispatch>()
export type ReduxDispatch = typeof store.dispatch
