import React from 'react';
import './card.css';
import { Link } from "react-router-dom";

export const ItemListCpnt = ({name, desc, addr, photo}) => {
  return (
    <><div className="ItemList">
      <Link to={'/itemdetails/token/' + 'temp' } style={{ textDecoration: 'none' }}>
      <div><img src={photo} /></div>
      <div className="ItemList-title">店名: {name}</div></Link>
      <div className="ItemList-description">{desc}</div>
      </div>
    </>
  );
}