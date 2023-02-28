import React, { useState }from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';

export const MapView = ({ setMapIns, setMapLevel, storeLocations }) => {
  const [position, setXY] = useState([35.689, 139.692]);
  const zoom = 17;

  return (
  <>
    <MapContainer 
      center={position}
      zoom={zoom}
			minZoom={12}
      scrollWheelZoom={false}
      ref={setMapIns}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeZoomLevel levelSetter={setMapLevel}/>
			{storeLocations.map((marker, idx) => (
				<Marker key={idx} position={marker.coordinates}>
					<Popup>
						{marker.name} <br /> test
					</Popup>
				</Marker>
			))}
    </MapContainer>
  </>
  )
}
const ChangeZoomLevel = ({ levelSetter }) => {
  const map = useMapEvent({
    zoomend: () => {
      levelSetter(map.getZoom());
    }
  })
}
const ChangeMapCenter = ({ position }) => {
  const map = useMap();
  map.panTo(position);

  return null;
}