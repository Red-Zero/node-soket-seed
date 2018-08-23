const common = require("./common");
const moment = require("moment");
var net = require("net");
const headLength = 4
const returnHeadLength = 6

var HOST = "127.0.0.1";
var PORT = 6969;

var client = new net.Socket();
client.connect(
  PORT,
  HOST,
  function() {
    console.log("CONNECTED TO: " + HOST + ":" + PORT);
    // 建立连接后立即向服务器发送数据，服务器将收到这些数据
    let buf = tagFun();
    console.log(buf);
    client.write(buf);
  }
);

// 为客户端添加“data”事件处理函数
// data是服务器发回的数据
client.on("data", function(data) {
  console.log("DATA:",data)
   let head = data.slice(0, returnHeadLength)
   let hedaModel = common.analyzeHead(head);
   let bodyModel = common.analyzeBody(data.slice(returnHeadLength, data.length));
   console.log(hedaModel,bodyModel)
});

// 为客户端添加“close”事件处理函数
client.on("close", function() {
  console.log("Connection closed");
});

tagFun = () => {
  let model = {
    "0x10": "this is test",
  };
  let head = {
    type: "ty",
  };

  let bodyRes = common.createBody(model);
  let totalLength = bodyRes.length + headLength;
  let headRes = common.createHead(totalLength, head);
  let res = Buffer.concat([headRes, bodyRes], totalLength);
  return res;
};
