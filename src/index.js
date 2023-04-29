import React from 'react';
import ReactDOM from 'react-dom/client';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import createSagaMiddleware from '@redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import logger from 'redux-logger';
import axios from 'axios';


// this startingPlantArray should eventually be removed
//* TAKE this to server and create a GET route
// const startingPlantArray = [
//   { id: 1, name: 'Rose' },
//   // { id: 2, name: 'Tulip' },
//   // { id: 3, name: 'Oak' }
// ];

//* REDUCER
const plantList = (state = [], action) => {
  switch (action.type) {
    // case 'ADD_PLANT':  //action type that adds 1 plant to exixsting array
    //   return [ ...state, action.payload ]//use spread opporator above
    case 'ADD_PLANT':
      return [ ...state, action.payload ];
      case 'SET_PLANTS'://replace all existing plants
        return action.payload;
    default:
      return state;
  }
};

//* THIS IS OUR SAGA
function* fetchPlants() {
  try{
    const response = yield axios.get('/api/plant');
    const action = { type: 'SET_PLANTS', payload: response.data };
    // when we get data back from the server we dispatch 'SET_PLANTS' action type has to be different from the rootSaga action type and it will replace out plantList
    // put is the same as dispatch
    yield put(action);
  } catch (error) {
    alert('Something went wrong')
    console.log(`Error in fetchPlants: ${error}`);
  }
}

// Takes in an action with a payload and sends that payload to the server
function* sendPlantToSever(action) {
  try {
    yield axios.post('/api.plant', action.payload);
    yield put({type: 'FETCH_PLANTS'});
  } catch (error) {
    alert('Something went wrong')
    console.log(`Error in sendPlantToSever ${error}`);
    throw error;
    
  }

}

function* removePlant(action) {
  try {
    yield axios.delete(`/api/plant/${action.payload}`);
    yield put({ type: 'FETCH_PLANTS' });
  } catch (error) {
    alert('Something went wrong')
    console.log(`Error in removePlant ${error}`);
    throw error;
  }
}


//this generator function manages all the different sagas in our program
//* handles connecting up the action types with the actual Sagas. 
//* Set up all sagas here to be called! (map action based on type to saga functions) apply this to our middleware
function* rootSaga() {
  //*              action type      saga that gets called 
  yield takeEvery('FETCH_PLANTS',fetchPlants);
  yield takeEvery('SEND_PLANT_TO_SERVER', sendPlantToSever);
  yield takeEvery('REMOVE_PLANT', removePlant);
}



//middleware helps manage the data and is imported from redux
const sagaMiddleware = createSagaMiddleware();


//this store holds all the data
const store = createStore(
  combineReducers({ plantList }),

applyMiddleware(logger,sagaMiddleware)
);

sagaMiddleware.run(rootSaga)










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