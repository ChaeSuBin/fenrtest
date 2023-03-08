import React, { useState } from 'react';
import { AlertModal } from './alertModal';

export const HelpCpnt = () => {
	const [modalFlag, setFlag] = useState(false);

	const openAlert = (evt, _displayMode) => {	//not use param _displayMode
    setFlag(true);
    document.addEventListener('click',closeModal);
    evt.stopPropagation();
  }
  const closeModal = () => {
    setFlag(false);
    document.removeEventListener('click',closeModal);
  }

  return(
	<div>
		<section className='Help-section'>
			<br/><p>機能説明</p>

			<button className="Btn-mylocation" onClick={(evt) => openAlert(evt, 0)} style={{cursor: "default"}}>
				<span className="outerCircle"></span>
				<span className="horiLine"></span>
				<span className="vertLine"></span>
				<span className="innerCircle">?</span>
			</button>
			<p>{'地図を今あなたの位置で移動します'}</p>

			<a className="leaflet-zoom-btn" onClick={(evt) => openAlert(evt, 0)}>+  -</a><br/>
			<p>マップの蓄積と検索半径の調節を調節します</p>

			<button className="Btn-search" onClick={(evt) => openAlert(evt, 0)} style={{cursor: "default"}}>地図から探す</button><br/>
			<p>地図の中心地から店を探します</p>
			
			<section className="Btn-search-sub" onClick={(evt) => openAlert(evt, 0)}>
				<span className='help-search-sub'>さらに検索</span>
			</section>
			<p>探した位置・半径から他の店をもっと探します</p>
		</section>
		<AlertModal showFlag={modalFlag} display={0}/>
	</div>
	)
}