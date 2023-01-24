import './App.css'
import "niwa-location-picker/src/style.css"
import { LocationPicker } from "niwa-location-picker";
import { useEffect, useState } from 'react';

export default function App() {
  const [location, setLocation] = useState([])

  useEffect(() => {
    document.querySelector("#map").innerHTML = "";
    const locationPicker = new LocationPicker('#map', {
      height: 350,
      countryCode: 910
    });


    locationPicker.addEventListener('MAP_CENTERED_ON_ADDRESS', (pos) => {
      console.log('Lon Lat', pos.detail)
    });

    locationPicker.addEventListener('BROWSER_GEOLOCATED', (pos) => {
      // console.log(pos)
      let { latitude, longitude } = pos.detail.msg
      // console.log(lat, lon)
      locationPicker.removeAllMarkers()
      locationPicker.addMarker(longitude, latitude, "#4444ff")
      // form.setValues({
      //   position: [latitude, longitude],
      // })

      setLocation([latitude, longitude])


    });


    locationPicker.addEventListener('CLICKED_ON_LONLAT', (pos) => {
      let { lat, lon } = pos.detail.coords
      console.log(lat, lon)
      locationPicker.removeAllMarkers()
      locationPicker.addMarker(lon, lat, "#4444ff")
      // form.setValues({
      //   position: [lat, lon],
      // })
      setLocation([lat, lon])
    })

  }, [])

  return (
    <main>
      <h2>Selected Location</h2>
      <h3>Latitude: {location[0]}</h3>
      <h3>Longitude: {location[1]}</h3>
      <div id="map">
      </div>
    </main>
  )
}
