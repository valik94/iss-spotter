/*** Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188" */
const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Respnse: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const location = data.ip;
    callback(null, location);

  });
};
  
const fetchCoordsByIP = function(ip , callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body)=>{
    if (error) {
      callback(error,null);
      return;
    }

    //checking for status code other than 200, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const {latitude, longitude} = JSON.parse(body);
    callback(null,  {latitude, longitude});
    // console.log(`latitide is ${latitude} and longitude is ${longitude}`);
  });
};

const fetchISSFlyOverTimes = function(coords, callback){
request("https://iss-pass.herokuapp.com/json/?lat=49.2643&lon=-123.0961", (error, response, body) =>{
    if (error) {
        callback(error,null);
        return;
      }
  
      //checking for status code other than 200, assume server error
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      
      const passes = JSON.parse(body).response;
    //   console.log(passes);
      callback(null,  passes);
    //   console.log(`risetime is ${passes.risetime} and duration is ${passes.duration}`);
})
}
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };