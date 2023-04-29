import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import './PlantList'

function PlantList() {
    //dispatch sends actions to the store in order to update the state of the application
    const dispatch = useDispatch();
    const reduxState = useSelector(store => store);
    //reduxState gets its value from Redux store. usSelector will select specifially plantList from the store
    const plantList= useSelector(store => store.plantList);
   
    


    useEffect(() => { //useEffect is a module that will run a function when the component mounts or loads for the first time 
        console.log('component did mount');
        // dispatch an action to request the plantList from the API
        dispatch({ type: 'FETCH_PLANTS' });
        }, []); // tells uneEffect to run only once when the component mounts and not to run again after that

    const removePlant = (id) => {
        dispatch({ type: 'REMOVE_PLANT', payload: id });
    }

    return ( //what will display on page
        <div>
            <h3>This is the Plant list</h3>
            {/* <pre>{JSON.stringify(reduxState)}</pre> */}
            {plantList.map(plant => (
                    <div key={plant.id}>
                       <p> {plant.name} </p>
                       <p>{plant.kingdom}</p> 
                        <button onClick={() => removePlant(plant.id)}>
                            Remove
                        </button>
                        </div>
                ))
            }
           
        </div>
    );
}

export default PlantList;
