import React from 'react';
import '../styleSheets/card.css';
import { Link } from "react-router-dom";

export const ItemListCpnt = ({name, desc, addr, photo, id}) => {
  return (
    <><div className="ItemList">
      <Link to={`/storeinfo/${id}` } target="_blank" style={{ textDecoration: 'none' }}>
      <section className='ItemList-titleLine'>
        <div><img src={photo} /></div>
        <div className="ItemList-title">{name}</div>
      </section></Link>
      <div className="ItemList-description">{desc}<br/>{addr}</div>
      </div>
    </>
  );
}