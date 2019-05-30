import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'device'], // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, reducers);


export const store = createStore(
  pReducer,
  applyMiddleware(thunk)
);
export const persistor = persistStore(store);
