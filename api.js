const axios = require("axios");

const apiConfig = {
  base_url: "https://pmfby.gov.in/"
};

/**
 * This API is used to get the district lists for a particular state with sssyID
 * To understand sssyID, see formData.js - point number 3 in comments at the top
 *
 * @param {string} stateID
 * @param {number} sssyID
 */
async function getDistrictList(stateID, sssyID) {
  const response = await axios({
    url: `${apiConfig.base_url}landingPage/districtState?stateID=${stateID}&sssyID=${sssyID}`,
    method: "get"
  });
  return response;
}

/**
 * This API is used to get crop list for a particular district
 * To understand sssyID, see formData.js - point number 3 in comments at the top
 *
 * @param {string} districtID
 * @param {number} sssyID
 */
async function getCropList(districtID, sssyID) {
  const response = await axios({
    url: `${apiConfig.base_url}cropNotification/cropList?districtID=${districtID}&sssyID=${sssyID}`,
    method: "get"
  });
  return response;
}

/**
 * This API is used to get the premium for each combination of scheme + year + season + state + district + crop
 * To understand sssyID, see formData.js - point number 3 in comments at the top
 *
 * @param {string} districtID
 * @param {string} cropID
 * @param {number} sssyID
 */
async function getPremium(districtID, cropID, sssyID) {
  const response = await axios({
    url: `${apiConfig.base_url}landingPage/calculatePremium?districtID=${districtID}&sssyID=${sssyID}&cropID=${cropID}`,
    method: "get"
  });
  return response;
}

module.exports = { getDistrictList, getCropList, getPremium };
