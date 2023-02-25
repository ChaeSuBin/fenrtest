import React, { useEffect, useState } from "react";
import { getStoreList } from "../api";
import { ItemListCpnt } from "../components/itemListCpnt";

export const HomePage = () => {
  const [restaurantList, setList] = useState([]);
  const [pageNum, setPage] = useState(0);

  useEffect(() => {
    getStoreInfo(pageNum,'Z011');
  },[pageNum]);

  const getStoreInfo = async(_pageNum) => {
    const storeInfo = await getStoreList(_pageNum);
    setList(storeInfo.results.shop);
  }

  const nextPage = (_page) => {
    setPage(pageNum+10);
  }
  const prevPage = (_page) => {
    if(_page > 1){
      setPage(pageNum-10);
    }
  }

  const testButton = () => {
    console.log(restaurantList);
  }
  return(
    <>
      <button onClick={testButton}>test</button>
      {restaurantList.map((searchItems, index) => (
        <ItemListCpnt
          key={index}
          name={searchItems.name}
          desc={searchItems.catch}
          addr={searchItems.address}
          photo={searchItems.photo.pc.m}
        />
      ))}
      <section className="PageSelector">
        <a onClick={()=>prevPage(pageNum)} style={{cursor: "pointer"}} >prev ←</a>
        {' '+(pageNum/10 +1)+' '}
        <a onClick={()=>nextPage(pageNum)} style={{cursor: "pointer"}} >→ next</a>
      </section>
    </>
  )
}