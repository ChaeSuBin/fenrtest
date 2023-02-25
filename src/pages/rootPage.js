import React, { useEffect, useState } from "react";
import { getStoreList } from "../api";
import { ItemListCpnt } from "../components/itemListCpnt";
import { MapView } from "../components/mapViewCpnt";

export const HomePage = () => {
  const [mapIns, getMapIns] = useState(null);
  const [mapCenter, setCenter] = useState({positionX: null,positionY: null});
  const [restaurantList, setList] = useState([]);
  const [storeXY, setPosition] = useState([{name: "", coordinates: [0,0]}]);
  const [pageNum, setPage] = useState(0);
  const [pFlag, setPageFlag] = useState(false);

  const getStoreInfo = async(_pageNum, _lat, _lng) => {
    let iterINT = 0;
    let storeLocateBatch = [];
    const searchCount = 10;
    const storeInfo = await getStoreList(_pageNum, _lat, _lng);
    while(searchCount > iterINT){
      let storeLocation = {
        name: storeInfo.results.shop[iterINT].name,
        coordinates: [storeInfo.results.shop[iterINT].lat, storeInfo.results.shop[iterINT].lng]
      }
      storeLocateBatch.push(storeLocation);
      ++iterINT;
    }
    setPosition(storeLocateBatch);
    setList(storeInfo.results.shop);
  }

  const nextPage = (_page) => {
    setPage(pageNum+10);
    getStoreInfo(pageNum+10, mapCenter.coordinateX, mapCenter.coordinateY);
  }
  const prevPage = (_page) => {
    if(_page > 1){
      setPage(pageNum-10);
      getStoreInfo(pageNum-10, mapCenter.coordinateX, mapCenter.coordinateY);
    }
  }
  
  const searchButton = () => {
    //console.log(mapIns.getCenter());//getBounds
    const coordinateX = mapIns.getCenter().lat;
    const coordinateY = mapIns.getCenter().lng;
    setCenter({coordinateX, coordinateY});
    getStoreInfo(pageNum, coordinateX, coordinateY);
    setPageFlag(true);
  }
  const setLatlngTuple = () => {
    let searchedObj;
    
  }

  return(
    <section className="Align-center">
      <MapView setMapIns={getMapIns} storeLocations={storeXY} />
      <button onClick={searchButton}>地図から探す</button><br/>
      {restaurantList.map((searchItems, index) => (
        <ItemListCpnt
          key={index}
          name={searchItems.name}
          desc={searchItems.catch}
          addr={searchItems.address}
          photo={searchItems.photo.pc.m}
        />
      ))}
      {pFlag ? (<>
        <a onClick={()=>prevPage(pageNum)} style={{cursor: "pointer"}} >prev ←</a>
        {' '+(pageNum/10 +1)+' '}
        <a onClick={()=>nextPage(pageNum)} style={{cursor: "pointer"}} >→ next</a>
      </>):null}
    </section>
  )
}