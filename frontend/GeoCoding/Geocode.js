import Service from "./service";
const Geocode = async (address) => {
  console.log("address", address);
  return await Service.getLatLon(address)
    .then((res) => {
      if (res && res.data) {
        return {
          lat: res.data.results[0].geometry.location.lat,
          lon: res.data.results[0].geometry.location.lng,
        };
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export default Geocode;
