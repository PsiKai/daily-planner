import React, {useState, useContext} from 'react'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import pen1 from '../sounds/Pen1.wav';
import pen2 from '../sounds/Pen2.wav';
// import Axios from 'axios';
import AppContext from "../context/AppContext";

const Input = (props) => {
    const appContext = useContext(AppContext);
    const {list} = appContext;

    const [inputText, setInputText] = useState("");

    let newItem = {
        list: list,
        item: inputText
    }

    const typing = (e) => {
        const {value} = e.target;
        setInputText(value);
    }

    const create = (e) => {
        e.preventDefault();
        // console.log(list);
        appContext.setItem(newItem)
        setInputText("");  
        var penNoises = [pen1, pen2];
        var audio = new Audio(
            penNoises[Math.floor(Math.random() * penNoises.length)]
          );
          audio.volume = 0.1;
          audio.play();
    }

    return (
        <li>
        <form className="button" onSubmit={create}>
            <input
                    name="newItem"
                    className="new-item"
                    type="text"
                    placeholder="Plan your day"
                    autoComplete="off"
                    autoFocus
                    value={inputText}
                    onChange={typing}
                  />
                  <Fab type="submit" mini="true"><AddIcon /></Fab>
        </form>
        </li>
    )
}

export default Input