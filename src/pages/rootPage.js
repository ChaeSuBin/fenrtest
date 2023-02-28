import React, { useEffect, useState } from "react";
import { getStoreList } from "../api";
import { ItemListCpnt } from "../components/itemListCpnt";
import { MapView } from "../components/mapViewCpnt";

export const HomePage = () => {
  const [zoomap, getZoomLevel] = useState(17);
  const [mapIns, getMapIns] = useState(null);
  const [rangeIndicatior, setRangeIndi] = useState(null);
  const [mapCenter, setCenter] = useState({positionX: null,positionY: null});
  const [searchedItems, setItems] = useState([]);
  const [viewList, setViewList] = useState([]);
  const [storeXY, setPosition] = useState([{name: "", coordinates: [0,0]}]);
  const [pageNum, setPage] = useState(1);
  const [wholePage, setWpage] = useState(1);
  const [pFlag, setPageFlag] = useState(false);
  const [noResult, setNo] = useState(false);

  //auto detect a mapScailing and display searchRange based od zoom level
  useEffect(() => {
    let searchRange;
    try{
      searchRange = setSearchRange(zoomap);
    }
    catch(err){
      searchRange = 20;
    }

    switch(searchRange){
      case 10:
        setRangeIndi('検索半径：回り');
        break;
      case 20:
        setRangeIndi('検索半径：通り');
        break;
      case 50:
        setRangeIndi('検索半径：町');
        break;
      default:
        setRangeIndi('検索半径：区');
    }
  },[zoomap])

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

  const nextPage = (_page) => {
    if(_page < wholePage){
      const pageNum = _page+1;
      setPage(pageNum);
      setResultView(searchedItems, pageNum);
    }
  }
  const prevPage = (_page) => {
    if(_page > 1){
      const pageNum = _page-1;
      setPage(pageNum);
      setResultView(searchedItems, pageNum);
    }
  }

  //set search Range base on zoom level on map
  const setSearchRange = (_zoom) => {
    switch(_zoom){
      case 15:
        return 100;
			case 16:
				return 50;
			case 17:
				return 20;
			case 18:
				return 10;
			default:
				return 100;
		}
  }

  const noSearchResult = (_itemList) => {
    if(_itemList.length === 0){
      setNo(true);
      setPageFlag(false);
    }
    else{
      setNo(false);
      setPageFlag(true);
    }
  }
  const searchButton = async() => {
    const zoomLevel = mapIns.getZoom();
    const coordinateX = mapIns.getCenter().lat;
    const coordinateY = mapIns.getCenter().lng;
    const numberOfResult = setSearchRange(zoomLevel);
    const loadedShopList = await getStoreInfoP(pageNum, numberOfResult, coordinateX, coordinateY);
    setItems(loadedShopList);
    setPage(1);
    setStoreLocation(loadedShopList, numberOfResult);
    setResultView(loadedShopList, pageNum);
    noSearchResult(loadedShopList);
  }
  const testbtn = () => {
    // setResultView();
  }

  return(
    <section className="Align-center">
      <button onClick={testbtn}>test</button>
      <MapView setMapIns={getMapIns} setMapLevel={getZoomLevel} storeLocations={storeXY} />
      {rangeIndicatior}<br/>
      <button onClick={searchButton}>地図から探す</button><br/>
      {noResult ? (<p>
        検索結果がありません<br/>位置を変更してやり直してください。
      </p>):null}
      {pFlag ? (<>
        <a onClick={()=>prevPage(pageNum)} style={{cursor: "pointer"}} >prev ←</a>
        {' '+(pageNum)+' / ' + (wholePage) + ' '}
        <a onClick={()=>nextPage(pageNum)} style={{cursor: "pointer"}} >→ next</a>
      </>):null}
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