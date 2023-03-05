import React, { useEffect, useState } from 'react';
import '../styleSheets/storePage.css';
import { useParams } from 'react-router-dom';
import { getStoreInfo } from '../api';
import { UseWindowSize } from '../components/layoutDetectorCpnt'
import { MapViewOneStore } from '../components/mapViewCpnt';

export const StoreInfo = () => {
	const uriLocate = useParams();
	const mobile = UseWindowSize();
	const [storeInfo, setInfo] = useState({
		addr: "", 
		name: "", 
		open: "",
		close: "",
		location: {lat: 0, lng: 0},
		photo: "",
	});

	useEffect(() => {
		loadStoreInfo();
	}, [mobile])

	const loadStoreInfo = async() => {
		const storeId = uriLocate.storeid;
		const store = await getStoreInfoP(storeId);
		let loadedStore = {
			addr: store.address,
			name: store.name,
			open: store.open,
			close: store.close,
			location: {lat: store.lat, lng: store.lng},
			photo: null
		}
		
		if(mobile)
			loadedStore.photo = store.photo.mobile.l
		else
			loadedStore.photo = store.photo.pc.l
		
		setInfo(loadedStore);
	}

	const getStoreInfoP = async(_id) => {
    return new Promise(resolve => {
      getStoreInfo(_id).then(storeInfoFromDB => {
        resolve(storeInfoFromDB.results.shop[0])
      })
    })
  }

	const testbtn = async() => {
		console.log(mobile);
	}

	return(<section className="store-page">
		<p>店名</p>{storeInfo.name} <br/>
		<img src={storeInfo.photo} /><br/>
		<p>位置</p>{storeInfo.addr}<br/>
		<MapViewOneStore location={storeInfo.location} storeName={storeInfo.name} />
		<p>営業時間</p>{storeInfo.open} <br/>
		<p>店休日</p>{storeInfo.close}
	</section>)
}