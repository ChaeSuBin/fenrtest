async function request(path, options = {}) {
    const secret = process.env.REACT_APP_HOTPEPPER_API_KEY;
    const url = `/gourmet/v1/?key=${secret}&format=json${path}`;
    const response = await fetch(url, options);
    console.log('k', secret)
    console.log('v', response)
    return response.json();
}

// export async function getStoreInfo(_pageNum, _largeArea){
//     return request(`&large_area=Z011&start=${_pageNum}`, {mode: 'cors', credentials: 'include'});
// }
export async function getStoreList(_searchFrom, _searchCount, _lat, _lng){
    console.log('dev')
    return request(`&lat=${_lat}&lng=${_lng}&range=${_searchCount[1]}&order=1&start=${_searchFrom}&count=${_searchCount[0]}`);
}
export async function getStoreInfo(_storeId){
    return request(`&id=${_storeId}`);
}