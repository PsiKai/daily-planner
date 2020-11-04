import React, {useContext} from 'react'
import AppContext from "../context/AppContext"

const Day = () => {

    const appContext = useContext(AppContext);
    const {date} = appContext;
    var dayOptions = { weekday: "long" }
    var dateOptions = { month: "long", day: "numeric", year: "numeric" }; 
    var day = new Date(date).toLocaleDateString("en-US", dayOptions);
    var fullDate = new Date(date).toLocaleDateString("en-US", dateOptions)
    
    return (
            <h1 className="date">{day} <br/> {fullDate}</h1>
    )
}

export default Day
