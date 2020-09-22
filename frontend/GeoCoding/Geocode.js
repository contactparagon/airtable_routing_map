import Service from "./service";
const Geocode = async (addresses) => {
  const data = [
    {
      address: "2999 Laguna St., Concord CA 94518",
      lat: 37.9706794,
      lon: -122.0255938,
    },
    {
      address: "3099 Concord Blvd, Concord CA 94519",
      lat: 37.9775036,
      lon: -122.0208176,
    },
    {
      address: "2199 Colfax St., Concord CA 94520",
      lat: 37.9803009,
      lon: -122.0338085,
    },
    {
      address: "2354 Bonifacio St. Concord, CA 94520",
      lat: 37.980331,
      lon: -122.033268,
    },
    {
      address: "3199 Dover Way, Concord CA 94518",
      lat: 37.9707391,
      lon: -122.0212053,
    },
  ];
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
  return data;
};

export default Geocode;
