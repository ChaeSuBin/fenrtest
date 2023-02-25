async function request(path, options = {}) {
    const secret = process.env.REACT_APP_HOTPEPPER_API_KEY;
    const url = `/gourmet/v1/?key=${secret}&format=json${path}`;
    const response = await fetch(url, options);
    return response.json();
}

// export async function getStoreInfo(_pageNum, _largeArea){
//     return request(`&large_area=Z011&start=${_pageNum}`, {mode: 'cors', credentials: 'include'});
// }
export async function getStoreList(_pageNum, _lat, _lng){
    // console.log(_pageNum, _lat, _lng);
    return request(`&lat=${_lat}&lng=${_lng}&range=1&order=1&start=${_pageNum}`);
}