import React from "react"
import '../styleSheets/alertModal.css';

export const AlertModal = ({showFlag, display}) => {

  const Description = () => {
      if(display === 0){
				return(<>
					<p>このボタンは説明のためのボタンなので動作しません。</p>
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