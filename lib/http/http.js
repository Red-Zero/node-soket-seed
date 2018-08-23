const axios = require("axios");
var env = process.env.NODE_ENV || "development";
var server = require("../../config/config.js")[env].scanAppHost;

exports.get = async (url, params) => {
   let res = await axios.get(`${server}${url}`, { params: params });
  return res.data;
};
exports.post = async (url, data) => {
  let res = await axios.post(`${server}${url}`, data);
  return res.data;
};
