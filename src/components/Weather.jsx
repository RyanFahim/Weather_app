import React, { useEffect } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import { FcSearch } from 'react-icons/fc'
import { BsCloudFog, BsCloudDrizzle, BsCloudRainHeavy,BsCloudHaze } from 'react-icons/bs'
import { BiCloudSnow } from 'react-icons/bi'
import { AiOutlineThunderbolt} from 'react-icons/ai'
import { FaSmog } from 'react-icons/fa'
import styles from './Weather.module.css'
import { useState } from 'react'

import img1 from '../image/1.jpg'
import img2 from '../image/2.jpg'
import img3 from '../image/3.jpg'
import img4 from '../image/4.jpg'


const Weather = () => {

    // hooks
    const [search, setSearch] = useState("Dhaka")
    const [data, setData] = useState(1)
    const [input, setInput] = useState()
    

    // console.log(search)

    let componentMounted = true;
   
    //useEffect hook for api call
    useEffect(() => {
        const fetchWeather = async () => {

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid={Your Key}`
            const response = await fetch(url);
            
            if (componentMounted){
                setData(await response.json());
                // console.log(data)
            }
            else{
                componentMounted = false 
            }
            
        }
        fetchWeather();
        
    },[search])


    console.log(JSON.stringify(data, null, 2));



    //Dynamic emoji
    let emoji = null;
    if(typeof data.main != 'undefined'){
        if(data.weather[0].main == 'Clouds'){
            emoji = <BsCloudFog/>
        }
        else if(data.weather[0].main == 'Thunderstrom'){
            emoji = <AiOutlineThunderbolt/>
        }
        else if(data.weather[0].main == 'Drizzle'){
            emoji = <BsCloudDrizzle/>
        }
        else if(data.weather[0].main == 'Rain'){
            emoji = <BsCloudRainHeavy/>
        }
        else if(data.weather[0].main == 'Snow'){
            emoji = <BiCloudSnow/>
        }
        else if(data.weather[0].main == 'Haze'){
            emoji = <BsCloudHaze/>
        }
        else{
            emoji = <FaSmog/>
        }
    }else{
        <div>...Loading</div>
    }
    


    //Date
    let d= new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default",  {month: 'long'});
    let day = d.toLocaleString("default", {weekday: 'long'})

    //Time
    let time = d.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })

    const handleSubmit = (event) =>{
        event.preventDefault();
        setSearch(input)
        console.log(input)
    }

    

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card bg-dark text-white texxt-center border-5">

                            {/* Random picture genearation */}
                            <img className="card-img" src= 'https://source.unsplash.com/random/600x900/?weather,aesthetic' alt="Card image" />

                            <div className="card-img-overlay">

                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-4 w-75 mx-auto">
                                        <input
                                            type="search"
                                            className="form-control"
                                            placeholder="Search City"
                                            aria-label="Search CIty"
                                            aria-describedby="basic-addon2"
                                            name='search'
                                            onChange = {(e) => setInput(e.target.value)}
                                            required
                                            />

                                        <button className="input-group-text" type='submit' id="basic-addon2">
                                            <FcSearch />
                                        </button>
                                    </div>
                                    
                                </form>

                               
                                <div className="bg-dark bg-opacity-50 py-3">
                                    <center>
                                        <h5 className="card-title"> {data.name} </h5>
                                        <p> {day}, {month} {date}, {year} 
                                        <br />
                                            {time}                                        
                                         </p>
                                        <hr />
                                        <h1 className={styles['icon_size']}> {emoji} </h1>
                                        <p className="fw-bolder mb=5 fs-2"> {data?.main?.temp} &deg; C</p>
                                        <p className="fw-bolder"> {data?.weather?.[0].main} </p>
                                        <p className="lead"> {data?.main?.temp_min} &deg; C | {data?.main?.temp_max} &deg; C</p>

                                    </center>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Weather
