import React, { useEffect, useState } from 'react';
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

	return(<>
		{/* <button onClick={testbtn}>test</button> */}
		店名<br/>{storeInfo.name} <br/>
		<img src={storeInfo.photo} /><br/>
		位置<br/>{storeInfo.addr}<br/>
		<MapViewOneStore location={storeInfo.location} storeName={storeInfo.name} />
		<section>
			営業時間<br/>{storeInfo.open} <br/>
			店休日<br/>{storeInfo.close}
		</section>
	</>)
}