const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('162.245.144.188', (error,coordinates) =>{
    if (error){
        console.log("It didn't work", error);
        return;
    }
    console.log("It worked! Returned coordinates: ", coordinates)
})

fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, passes)=>{
    if (error){
        console.log("It didn't work!", error)
        return;
    }
    console.log("It worked! Here are the flyover times:", passes)
})