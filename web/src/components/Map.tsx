import {useEffect, useState} from "react";
import {MapContainer, Marker, TileLayer, useMapEvents} from "react-leaflet";

let initialPosition = { lat: -20.830005267560356, lng: -49.36816513538361 }

const MakerMap = () => {  
  const [mapPosition, setMapPosition] = useState(initialPosition)
  
  useEffect(() => {
  }, [])
  

  const map = useMapEvents({
    click: (() => {
      setMapPosition(map.getCenter())
    })
  })

  useEffect(() => {
    if (!map) return

    map.setView(mapPosition)
  
  }, [mapPosition, map])

  return (
    <div id="blind">
      <span>{[`${mapPosition.lat}, ${mapPosition.lng}`]}</span>
      <Marker position={mapPosition} />
    </div>
  )
}


const Map = () => {
  return (
    <MapContainer center={initialPosition} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    <MakerMap />
    </MapContainer>
  )
}

export {Map};

