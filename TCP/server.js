var net = require("net");
let tansfromer = require("./transfrom/transform");

// 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// 传入net.createServer()的回调函数将作为”connection“事件的处理函数
// 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的

// 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// 传入net.createServer()的回调函数将作为”connection“事件的处理函数
// 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
let server = net.createServer(function (sock) {
  let allbuffer = Buffer.alloc(0)
  let result = Buffer.alloc(0);

  //管道控制，默认结束调用end事件，若要关闭则sock.pipe(sock,{end:false});
  // sock.pipe(
  //   sock,
  //   { end: false }
  // );
  sock.setTimeout(15000);
  sock.on("timeout", () => {
    let err = Buffer.from("timeout");
    sock.write(err);
  });
  sock.on("data", async data => {
    allbuffer = Buffer.concat([allbuffer, data]);
    try {
      let res = await tansfromer.analyze(allbuffer);
      allbuffer = res.newbuf;
      result = Buffer.concat([result, res.res],result.length + res.res.length);
      if (allbuffer.length < 1) {
        console.log(result)
        sock.write(result);
        sock.end()
        sock.destroy()
      }
    } catch (err) {
      console.log(err);
    }
  });
  sock.on("error", function (err) {
    console.log(err.stack);
  });
  sock.on("close", function (data) {
    console.log("CLOSED");
  });
  sock.on("end", () => {
    console.log("end");
  });
});
module.exports = server;

