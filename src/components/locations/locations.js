import { useEffect, useState } from "react"
import "./locations.css"



export const LocationList = () => {
    const [Locations, setLocations] = useState([]);
  
    useEffect(() => {
      fetch(`http://localhost:8088/locations`)
        .then(response => response.json())
        .then(locationArray => {
          setLocations(locationArray);
        });
    }, []);
}
  
    