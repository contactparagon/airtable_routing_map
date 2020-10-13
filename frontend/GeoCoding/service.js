import axios from "axios";

let baseGeoCodeURL =
  "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDZ3e4pVqA6LJHHN17btdMlQtMUN0Rs_2c";

export default {
  getLatLon(address) {
    if (address) {
      return axios.get(baseGeoCodeURL + "&address=" + address);
    }
  },
};
