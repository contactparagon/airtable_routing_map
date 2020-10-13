import Service from "./service";
const Geocode = async (addresses) => {
  const latlons = [];
  await addresses.map(async (address) => {
    await Service.getLatLon(address.getCellValue("Address"))
      .then((res) => {
        if (res && res.data) {
          latlons.push({
            address: address.getCellValue("Address"),
            lon: res.data.results[0].geometry.location.lng,
            lat: res.data.results[0].geometry.location.lat,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  // return latlons;
  return latlons;
};

export default Geocode;
