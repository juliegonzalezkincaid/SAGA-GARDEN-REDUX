import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    //dispatch sends actions to the store in order to update the state of the application
    const dispatch = useDispatch();
    //plantList gets its value from Redux store. usSelector will select specifially plantList from the store
    const plantList = useSelector(store => store.plantList);
   
    const getPlants = () => {
        dispatch({ type: 'SET_PLANT_LIST'})
    }
    //dispatches the type set plant list an action to the store to request a list of plants. triggers a state change in store causing it to update the plantList property with new data



    useEffect(() => { //useEffect is a module that will run a function when the component mounts or loads for the first time 
        console.log('component did mount');
        // dispatch an action to request the plantList from the API
        getPlants();// calls function 
        console.log('plant list')
    }, []); // tells uneEffect to run only once when the component mounts and not to run again after that

    return ( //what will display on page
        <div>
            <h3>This is the plant list</h3>
            <pre>{JSON.stringify(plantList)}</pre>
            <ul>
                {
                    plantList.map(plant => ( //loops through plantList array and generate a new list item for each plant 
                        <li key={plant.id}>{plant.name}
                        {/* creates a new list item element with the name */}
                        </li>

                    ))
                }
            </ul>
        </div>
    );
}

export default PlantList;
