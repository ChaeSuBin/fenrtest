import React, { useState }from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

export const MapView = ({ setBound }) => {
  const [position, setXY] = useState([35.689, 139.692]);
  const zoom = 17;

  return (
  <>
    <MapContainer 
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      ref={setBound}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <GetMapBounds setBound={setBound}/> */}
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  </>
  )
}
const GetMapBounds = ({setBound}) => {
  const mapInstance = useMap();
  const mapBound = mapInstance.getBounds();
  setBound(mapBound);
  console.log(mapBound);
}
const ChangeMapCenter = ({ position }) => {
  const map = useMap();
  map.panTo(position);

  return null;
}