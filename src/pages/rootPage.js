import React, { useEffect, useState } from "react";
import '../styleSheets/btnStyles.css';
import { getStoreList } from "../api";
import { ItemListCpnt } from "../components/itemListCpnt";
import { MapView } from "../components/mapViewCpnt";
import { UseWindowSize } from "../components/layoutDetectorCpnt";

export const HomePage = () => {
  const mobile = UseWindowSize();
  const [zoomap, getZoomLevel] = useState(16);
  const [mapIns, getMapIns] = useState(null);
  const [rangeIndicatior, setRangeIndi] = useState(null);
  const [myLocation, setLocation] = useState({lat: 0, lng: 0});
  const [SC, setSC] = useState(null); //search Condition
  const [searchedItems, setItems] = useState([]);
  const [viewList, setViewList] = useState([]);
  const [storeXY, setPosition] = useState([{name: "", coordinates: [0,0]}]);
  const [pageNum, setPage] = useState(1);
  const [searchPageNum, setSearchPage] = useState(3);
  const [wholePage, setWpage] = useState(1);
  const [pFlag, setPageFlag] = useState(false);
  const [sFlag, setSearchFlag] = useState(false);
  const [noResult, setNo] = useState(false);
  const [gpsFlag, setGpsFlag] = useState(false);


  //auto detect a mapZoomLevel and display searchRange based od zoom level
  useEffect(() => {
    let searchRange;
    try{
      searchRange = setSearchRange(zoomap)[0];
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
  
  //get store info from server api
  //return Promise (get グルメサーチAPI result)
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
      console.log('catch: not allowed Ref');
    }
    setPosition(storeLocateBatch);
    setWpage(Math.ceil(_shopList.length / 10));
  }

  //create 10 tuple of store list for Render
  const setResultView = (_shopList, _pageNum) => {
    console.log(_shopList);
    let iterINT = (_pageNum - 1) * 10;
    let storeViewList = [];

    try{
      while(iterINT < _pageNum * 10){
        let searchItem = {
          name: _shopList[iterINT].name,
          desc: _shopList[iterINT].catch,
          addr: _shopList[iterINT].address,
          access: null,
          photo: _shopList[iterINT].logo_image,
          storeId: _shopList[iterINT].id
        }
        if(mobile)
          searchItem.access = _shopList[iterINT].mobile_access;
        else
          searchItem.access = _shopList[iterINT].access;
        
        if(searchItem.photo == 'https://imgfp.hotp.jp/SYS/cmn/images/common/diary/custom/m30_img_noimage.gif')
          searchItem.photo = _shopList[iterINT].photo.pc.s;
        if(searchItem.desc == '')
          searchItem.desc = '説明なし';
        storeViewList.push(searchItem);
        ++iterINT;
      }
    }
    catch(err){
      console.log('catch: not allowed Ref');
    }
    setViewList(storeViewList);
  }

  const nextPage = (_page) => {
    let pageNum = _page+1;
    console.log(pageNum);
    if(_page < wholePage){
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
  //return api params [count, range]
  const setSearchRange = (_zoom) => {
    switch(_zoom){
      case 14:
        return [100, 5];
			case 15:
				return [50, 4];
			case 16:
				return [20, 2];
      case 17:
			case 18:
				return [10, 1];
			default:
				return [100, 5];
		}
  }

  // If there's nothing to render on the screen
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
  
  //get search params from map state
  const getSearchCondition = () => {
    const zoomLevel = mapIns.getZoom();
    const coordinateX = mapIns.getCenter().lat;
    const coordinateY = mapIns.getCenter().lng;
    const numberOfResult = setSearchRange(zoomLevel);
    return [coordinateX, coordinateY, numberOfResult];
  }

  //set on hook's parameters for rendering
  const renderParamsSet = (_shopList) => {
    setItems(_shopList);
    setPage(1);
    setResultView(_shopList, 1);
    noSearchResult(_shopList);
    setGpsFlag(false);
  }

  const searchButton = async(_research) => {
    const SC = getSearchCondition();
    const loadedShopList = await getStoreInfoP(1, SC[2], SC[0], SC[1]);
    setSearchPage(3);
    setStoreLocation(loadedShopList, SC[2][0]);
    renderParamsSet(loadedShopList);
    setSC(SC);
    setSearchFlag(true);
  }
  //sarani kensaku button
  const searchButton2 = async() => {
    const loadedShopList = await getStoreInfoP(searchPageNum, SC[2], SC[0], SC[1]);
    setSearchPage(searchPageNum + 2);
    setStoreLocation(loadedShopList, SC[2][0]);
    renderParamsSet(loadedShopList);
  }
  const moveMylocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      setLocation([latitude, longitude]);
      setGpsFlag(true);
    })
  }

  return(
    <section className="Align-center">
      <div>
      <button onClick={moveMylocation} className="Btn-mylocation">
        <span className="outerCircle"></span>
        <span className="horiLine"></span>
        <span className="vertLine"></span>
        <span className="innerCircle">?</span>
      </button>
      <button onClick={searchButton} className="Btn-search">地図から探す</button>
      </div>
      {rangeIndicatior}
      <MapView setMapIns={getMapIns} setMapLevel={getZoomLevel} myLocation={myLocation} activeFlag={gpsFlag} setFlag={setGpsFlag} storeLocations={storeXY} />
      {}
      {noResult ? (<p>
        検索結果がありません<br/>位置を変更してやり直してください。
      </p>):sFlag ? (<>
        <section className="Btn-search-sub">
          <p>最後の検索地点から</p>
          <span onClick={searchButton2}>さらに検索</span>
        </section><br/>
      </>):null}
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
          addr={searchItems.access}
          photo={searchItems.photo}
          id={searchItems.storeId}
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