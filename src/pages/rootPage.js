import React, { useEffect, useState } from "react";
import { getStoreList } from "../api";
import { ItemListCpnt } from "../components/itemListCpnt";
import { MapView } from "../components/mapViewCpnt";

export const HomePage = () => {
  const [mapIns, getMapIns] = useState(null);
  const [mapCenter, setCenter] = useState({positionX: null,positionY: null});
  const [viewList, setViewList] = useState([]);
  const [storeXY, setPosition] = useState([{name: "", coordinates: [0,0]}]);
  const [pageNum, setPage] = useState(1);
  const [wholePage, setWpage] = useState(1);
  const [pFlag, setPageFlag] = useState(false);

  const nextPage = (_page) => {
    
  }
  const prevPage = (_page) => {
    if(_page > 1){
      
    }
  }

  //get store info using server api
  const getStoreInfoP = async(_pageNum, _searchCount, _lat, _lng) => {
    const searchFrom = ((_pageNum-1)*10)+1;
    return new Promise(resolve => {
      getStoreList(searchFrom, _searchCount, _lat, _lng).then(storeInfoFromDB => {
        resolve(storeInfoFromDB.results.shop)
      })
    })
  }

  //create tuple of store location from store info
  const setStoreLocation = (_shopList, _searchCount) => {
    console.log(_shopList.length);
    let iterINT = 0;
    let storeLocateBatch = [];
    
    try{
      while(_searchCount > iterINT){
        let storeLocation = {
          name: _shopList[iterINT].name,
          coordinates: [_shopList[iterINT].lat, _shopList[iterINT].lng]
        }
        storeLocateBatch.push(storeLocation);
        ++iterINT;
      }
    }
    catch(err){
      console.log('not allowed Reference');
    }
    setPosition(storeLocateBatch);
    setWpage(Math.ceil(_shopList.length / 10));
  }
  
  //create 10 tuple of store list for Render
  const setResultView = (_shopList, _pageNum) => {
    console.log(_pageNum);
    let iterINT = (_pageNum - 1) * 10;
    let storeViewList = [];

    try{
      while(iterINT < _pageNum * 10){
        let searchItem = {
          name: _shopList[iterINT].name,
          desc: _shopList[iterINT].catch,
          addr: _shopList[iterINT].address,
          photo: _shopList[iterINT].photo.pc.m,
        }
        storeViewList.push(searchItem);
        ++iterINT;
      }
    }
    catch(err){
      console.log(err);
    }
    setViewList(storeViewList);
  }

  //set search Range base on zoom level on map
  const setSearchRange = (_zoom) => {
    switch(_zoom){
			case 16:
				return 100;
			case 17:
				return 30;
			case 18:
				return 10;
			default:
				return 100;
		}
  }

  const searchButton = async() => {
    const zoomLevel = mapIns.getZoom();
    const coordinateX = mapIns.getCenter().lat;
    const coordinateY = mapIns.getCenter().lng;
    const numberOfResult = setSearchRange(zoomLevel);
    const loadedShopList = await getStoreInfoP(pageNum, numberOfResult, coordinateX, coordinateY);
    setStoreLocation(loadedShopList, numberOfResult);
    setResultView(loadedShopList, pageNum);
    setPageFlag(true);
  }
  const testbtn = () => {
    // setResultView();
  }

  return(
    <section className="Align-center">
      <button onClick={testbtn}>test</button>
      <MapView setMapIns={getMapIns} storeLocations={storeXY} />
      <button onClick={searchButton}>地図から探す</button><br/>
      {viewList.map((searchItems, index) => (
        <ItemListCpnt
          key={index}
          name={searchItems.name}
          desc={searchItems.desc}
          addr={searchItems.addr}
          photo={searchItems.photo}
        />
      ))}
      {pFlag ? (<>
        <a onClick={()=>prevPage(pageNum)} style={{cursor: "pointer"}} >prev ←</a>
        {' '+(pageNum)+' / ' + (wholePage) + ' '}
        <a onClick={()=>nextPage(pageNum)} style={{cursor: "pointer"}} >→ next</a>
      </>):null}
    </section>
  )
}