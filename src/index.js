import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import axios from 'axios';


// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' }
];

const plantList = (state = startingPlantArray, action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [ ...state, action.payload ]
      case 'SET_PLANTS':
        return action.payload;
    default:
      return state;
  }
};

function* fetchPlantList() {
  try{
    const plants = yield axios.get('/api/plant');
    yield put({ type: 'ADD_PLANT', payload: plants.data});
  } catch (error) {
    console.log(`Error in fetchPlantList ${error}`);
    alert('Something went wrong, dude')
  }
}
//middleware helps manage the data 
const sagaMiddleware = createSagaMiddleware();

//this function manages all the different sagas in our program
function* rootSaga() {
yield takeEvery ('SET_PLANT_LIST', fetchPlantList);
}

//this store holds all the data
const store = createStore(
  combineReducers({ plantList }),

applyMiddleware(sagaMiddleware, logger)
);


//ReactDOM.createRoot this function renders our website on the screen. it takes the store ovject and passes it to the "provider" component wich allows us to share data between different parts of the program. StrictMode compnent helps us catch potential problems 
sagaMiddleware.run(rootSaga);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);