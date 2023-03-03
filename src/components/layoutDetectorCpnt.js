import React, { useLayoutEffect, useState } from 'react';

//detect of window size
export const UseWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  const [mobile, setViewMode] = useState(false);

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    const updateViewMode = () => {
        const mode = viewMode(window.innerWidth);
        setViewMode(mode);
    }
    // window.addEventListener('resize', updateSize);
    // updateSize();
    window.addEventListener('resize', updateViewMode);
    updateViewMode();    

    return () => window.removeEventListener('resize', updateViewMode);
  }, []);
  return mobile;
};

//Differentiate between mobile and PC versions
const viewMode = (_windowWidth) => {
    if(_windowWidth > 700)
        return false;
    else
        return true;
}