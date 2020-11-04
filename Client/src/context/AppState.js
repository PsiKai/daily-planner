import React, {useReducer} from 'react';
import Axios from 'axios';
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import {
    GET_LIST,
    SET_ITEM,
    // SET_STYLE
} from "./types";

const AppState = (props) => {
    var date = new Date();
    var options = {day: '2-digit', month: 'short', year: 'numeric'};
    var resultDate = date.toLocaleDateString('en-US', options).replace(/,/g, "").replace(/ /g, "-");

    const intitialState = {
        list: resultDate,
        items: [],
        date: resultDate
    }

    const [state, dispatch] = useReducer(AppReducer, intitialState);

    //get list
    const getList = async (listName) => {
        console.log(listName);
            const res = await Axios.get(
            `http://localhost:5000/${listName}`, 
            {list: listName},
            {"Content-Type": "*/*"}
            )
        dispatch({
            type: GET_LIST,
            payload: res.data
        })
        // console.log(res.data);
    }

    //set items
    const setItem = async (inputText) => {
        // console.log(intitialState.list);
        const res = await Axios.post("http://localhost:5000/", {item: inputText.item, list: inputText.list}, {"Content-Type": "*/(*"}
        );
        // console.log(res.data);
        dispatch({
            type: SET_ITEM,
            payload: res.data
        })
        
    }

    // set strikethrough
    const crossOff = async (item) => {
        // console.log(item);
        const res = await Axios.post("http://localhost:5000/delete", {item: item.item, list: item.list, id: item.id}, {"Content-Type": "*/(*"}
        )
        // console.log(res.data.style);
        // dispatch({
        //     type: SET_ITEM,
        //     payload: res.data
        // })
        console.log(res.data);
    }
  

    return (
        <AppContext.Provider
            value={{
                list: state.list,
                items: state.items,
                date: state.date,
                getList,
                setItem,
                crossOff
            }}>
            {props.children}
        </AppContext.Provider>
    )
}


export default AppState;