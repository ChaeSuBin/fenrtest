import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';

export const MapView = ({ setMapIns, setMapLevel, myLocation, activeFlag, setFlag, storeLocations }) => {
  const [position, setXY] = useState([35.689, 139.692]);
  const zoom = 17;

  return (
  <>
    <MapContainer 
      center={position}
      zoom={zoom}
			minZoom={10}
      scrollWheelZoom={false}
      ref={setMapIns}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomLevelChangeDetector levelSetter={setMapLevel} flagSetter={setFlag} />
      <ChangeMapCenter position={myLocation} activate={activeFlag}/>
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
const ZoomLevelChangeDetector = ({ levelSetter, flagSetter }) => {
  const map = useMapEvent({
    zoomend: () => {
      levelSetter(map.getZoom());
      flagSetter(false);
    }
  })
}
const MapCenterChangeDetector = ({ moveSetter }) => {
  const map = useMapEvent({
    moveend: () => {
      moveSetter(map.getCenter());
    }
  })
}
const ChangeMapCenter = ({ position, activate }) => {
  const map = useMap();
  if(activate){
    // map.panTo(position);
    map.setView(position, 15, {
      animate: true,
    })
  }
  return null;
}