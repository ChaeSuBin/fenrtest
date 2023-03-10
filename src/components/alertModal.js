import React from "react"
import '../styleSheets/alertModal.css';

export const AlertModal = ({showFlag, display}) => {

  const Description = () => {
      if(display === 0){
				return(<>
          <section className='Help-section'>
          <p style={{fontSize: 'smaller'}}>画面をタッチしたら閉じます</p>

          <button className="Btn-mylocation" style={{cursor: "default"}}>
            <span className="outerCircle"></span>
            <span className="horiLine"></span>
            <span className="vertLine"></span>
            <span className="innerCircle">?</span>
          </button>
          <p>{'地図を今あなたの位置で移動します'}</p>

          <a className="leaflet-zoom-btn" >+  -</a><br/>
          <p>マップの蓄積と検索半径の調節を調節します</p>

          <button className="Btn-search" style={{cursor: "default"}}>地図から探す</button><br/>
          <p>地図の中心地から店を探します</p>
          
          <section className="Btn-search-sub" >
            <span className='help-search-sub'>さらに検索</span>
          </section>
          <p>探した位置・半径から他の店をもっと探します</p>
        </section>
				</>)
			}
  }
  return(<>
    {showFlag ? ( // showFlagがtrueだったらModalを表示する
    <div id="overlay" className='overlay'>
      <div id="modalcontents" className="modalcontents">
        <Description />
      </div>
    </div>
    ) : (
      <></>// showFlagがfalseの場合はModalは表示しない)
    )}
  </>)
}