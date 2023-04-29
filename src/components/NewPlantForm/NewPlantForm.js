import React, {useState}from 'react';
import { useDispatch } from 'react-redux';

const NewPlantForm = () => {
    const dispatch = useDispatch();
    
    //Initial state is an OBJECT, with keys id and name
    let [newPlant, setPlant] = useState({ name: '', kingdom: ''});

    const handleChangeFor = (key, value) => {
       
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setPlant({...newPlant, [key]: value })
    }

    const addNewPlant = event => {
        event.preventDefault();
        dispatch({ type: 'SEND_PLANT_TO_SERVER', payload: newPlant });
        //updates the next plant to have a new id
        setPlant({name:'', kingdom: '' });
    }


    return (
        <div>
            <h3>This is the form</h3>
            {/* <pre>{JSON.stringify(newPlant)}</pre> */}
            <form onSubmit= {addNewPlant}>
            <input 
                type='text' 
                value={newPlant.name} 
                onChange={(event)=> handleChangeFor('name', event.target.value)} />
                <input 
                type='text' 
                value={newPlant.kingdom} 
                onChange={(event)=> handleChangeFor('kingdom', event.target.value)} />
                <input type='submit' value='Add New Plant'/>
            </form>
            
        </div>
    );
}


export default NewPlantForm;
