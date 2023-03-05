// async function request(path, options = {}) {
//     const secret = process.env.REACT_APP_HOTPEPPER_API_KEY;
//     const url = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${secret}&format=json${path}`;
//     const response = await fetch(url, options);
//     return response.json();
// }

async function request(path, options = {}) {
    const secret = process.env.REACT_APP_HOTPEPPER_API_KEY;
    const url = `/hotpepper/gourmet/v1/?key=${secret}&format=json${path}`;
    const response = await fetch(url, options);
    return response.json();
}

export async function getStoreList(_searchFrom, _searchCount, _lat, _lng){
    return request(`&lat=${_lat}&lng=${_lng}&range=${_searchCount[1]}&order=1&start=${_searchFrom}&count=${_searchCount[0]}`);
}
export async function getStoreInfo(_storeId){
    return request(`&id=${_storeId}`);
}