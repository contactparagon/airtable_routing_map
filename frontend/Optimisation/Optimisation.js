import axios from "axios";

const Optimisation = async (data) => {
  console.log("data", JSON.stringify(data));

  return await axios({
    method: "post",
    url: "https://api.openrouteservice.org/optimization",
    headers: {
      Authorization: "5b3ce3597851110001cf62489ef5080ba23b4f219831b4978a8fc842",
      "Content-Type": "application/json",
    },
    data: data,
  })
    .then((res) => {
      console.log("Optimisation result", res);
      return res;
    })
    .catch((err) => console.log("err,", err));
};

export default Optimisation;
