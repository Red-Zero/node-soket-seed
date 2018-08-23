let qiniu = require("qiniu");
let _config = {
  ACCESS_KEY: "ak",
  SECRET_KEY: "sk"
};
exports.getQiniuToken = async params => {
  // let bucket = params;
  let options = {
    scope: "scan-app",
    expires: 7200
  };
  let mac = await new qiniu.auth.digest.Mac(
    _config.ACCESS_KEY,
    _config.SECRET_KEY
  );
  let putPolicy = await new qiniu.rs.PutPolicy(options);
  let uploadToken = await putPolicy.uploadToken(mac);
  return uploadToken;
};
