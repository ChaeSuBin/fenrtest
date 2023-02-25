import React, { useEffect, useState } from "react";
import { getStoreList } from "../api";
import { ItemListCpnt } from "../components/itemListCpnt";
import { MapView } from "../components/mapViewCpnt";

export const HomePage = () => {
  const [mapIns, setMapIns] = useState(null);
  const [mapCenter, setCenter] = useState({positionX: null,positionY: null});
  const [restaurantList, setList] = useState([]);
  const [pageNum, setPage] = useState(0);
  const [pFlag, setPageFlag] = useState(false);

  const getStoreInfo = async(_pageNum, _lat, _lng) => {
    const storeInfo = await getStoreList(_pageNum, _lat, _lng);
    console.log(storeInfo.results.shop[0].lat);
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
  
  const testButton = () => {
    //console.log(mapIns.getCenter());//getBounds
    const coordinateX = mapIns.getCenter().lat;
    const coordinateY = mapIns.getCenter().lng;
    setCenter({coordinateX, coordinateY});
    getStoreInfo(pageNum, coordinateX, coordinateY);
    setPageFlag(true);
  }

  return(
    <section className="Align-center">
      <MapView setBound={setMapIns}/>
      <button onClick={testButton}>地図から探す</button><br/>
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