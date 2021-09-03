const axios = require('axios');
const HttpError = require('./httpError');
// 此組件可將地址轉為地理座標(lat & lng)
// send new post location as argument
const Location = async(location) => {
    // encodeURIComponent 轉換輸入String部分符號為特定編碼後回傳新String(URI編碼) ex: space -> %20, + -> %2B
    const coords = await axios
        .get(`https://maps.googleapis.com/maps/api/geocode/json?address=
        ${encodeURIComponent(location)}
        &key=${process.env.GOOGLEMAP_APIKEY}`)
    // 透過axios獲取的data須以.data存取結果
    const resultData = coords.data;
    // check resultData is exist or not
    // ZERO_RESULTS indicate the geocode was successful but returned no result
    if(!resultData || resultData.status === "ZERO_RESULTS"){
        throw new HttpError(422, "Can't find specify location")
    }
    // access lat & lng
    const coordinates = resultData.results[0].geometry.location;
    return coordinates;
}
module.exports = Location;