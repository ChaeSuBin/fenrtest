async function request(path, options = {}) {
    const secret = process.env.REACT_APP_HOTPEPPER_API_KEY;
    const url = `/gourmet/v1/?key=${secret}&format=json${path}`;
    const response = await fetch(url, options);
    return response.json();
}

// export async function getStoreInfo(_pageNum, _largeArea){
//     return request(`&large_area=Z011&start=${_pageNum}`, {mode: 'cors', credentials: 'include'});
// }
export async function getStoreList(_searchFrom, _searchCount, _lat, _lng){
    return request(`&lat=${_lat}&lng=${_lng}&range=5&order=1&start=${_searchFrom}&count=${_searchCount}`);
}