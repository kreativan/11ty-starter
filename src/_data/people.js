const axios = require("axios");

module.exports = async function() {
  const req = await axios.get("https://randomuser.me/api/?results=5&nat=us,fr,gb,es");
  const data = req.data.results;
  // console.log(data);
  return data;
}