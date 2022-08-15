import './App.css';
import {useEffect, useState} from "react";

function App() {

    const [city, setCity] = useState("Tunisia")
    const [theData, setTheData] = useState([])
    useEffect(() => {
        console.log(process.env.REACT_APP_MY_API_KEY)
        const API_KEY= process.env.REACT_APP_MY_API_KEY
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`).then((response) => response.json()).then(
            (actualData) => {
                setTheData(actualData)
            }
        ).catch(err => {
            console.log('Error ', err.message)
        })
    }, [city])
    return (
        <div className="App">
            <div className="my-weather-app">My Weather App</div>
            <div className="input-container">
                <input type="text" placeholder={city} onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        setCity(event.target.value)
                    }
                }}/>
            </div>
            {theData.cod === 200 ? <>
                <div className="title">{theData.sys !== undefined ? theData.sys.country : ""}</div>
                <div className={"field"}>
                    <h3>Country:</h3><p className="country"> {theData.sys !== undefined ? theData.sys.country : ""}</p>
                </div>
                <div className={"field"}>
                    <h3>Temp: </h3><p className="temp">{theData.main !== undefined ? theData.main.temp : ""}</p>
                </div>
                <div className={"field"}>
                    <h3>Weather: </h3><p
                    className="place">{theData.weather !== undefined ? theData.weather[0].description : ""}</p>
                </div>
                <div><h2 className="coordinations">Coordinations </h2>
                    <div className={"field"}>
                        <h3>lat:</h3><p className={"field"}>
                        {theData.coord !== undefined ? theData.coord.lat : ''}</p>
                    </div>
                    <div className={"field"}>
                        <h3>lon:</h3><p className={"field"}>
                        {theData.coord !== undefined ? theData.coord.lon : ''}</p>
                    </div>
                </div>
            </> : <div>Area Not Found</div>}

        </div>
    );
}

export default App;
