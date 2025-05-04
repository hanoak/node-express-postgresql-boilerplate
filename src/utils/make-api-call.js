const axios = require("axios");
const utils = require("./index.js");
const config = require("../config");

const makeApiCall = async ({
  url,
  method,
  headers,
  data,
  timeout = config.AXIOS_TIMEOUT,
}) => {
  try {
    const res = await axios({
      url,
      timeout,
      method,
      ...(!utils.isEmpty(headers) && { headers }),
      ...(["PUT", "POST", "DELETE", "PATCH"].includes(method) && {
        data,
      }),
    });

    return res?.data;
  } catch (e) {
    console.error(JSON.stringify(e));
    throw e;
  }
};

module.exports = makeApiCall;
