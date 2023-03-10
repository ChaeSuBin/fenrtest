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
		<button className='Btn-help' onClick={(evt) => openAlert(evt, 0)}>ご利用方法の説明</button>
		<AlertModal showFlag={modalFlag} display={0}/>
	</div>
	)
}