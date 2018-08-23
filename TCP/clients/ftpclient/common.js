const Client = require('ftp');
const fs = require('fs');

exports.send = async (path, name) => {

  return new Promise(function (resolve, reject) {
    try {
      if (fs.existsSync(path)) {
        let c = new Client();
        c.on('ready', function () {
          c.put(path, name, function (err) {
            if (err) {
              reject(err);
            }
            c.end();
            resolve('传输成功');
          });
        });
        c.connect({
          host: 'cagymjc.gotoftp11.com',
          port: 21,
          user: 'cagymjc',
          password: "173542558"
        });
      } else {
        reject('文件不存在');
      }
    } catch (err) {
      reject(err)
    }
  });
}

exports.get = async (path,savePath) => {
  return new Promise(function (resolve, reject) {
    try {
      var c = new Client();
      c.on('ready', function () {
        c.get(path, function (err, stream) {
          if (err) {
            reject(err);
          }
          // stream.once('close', function () { c.end(); });
          //stream.pipe();
          fs.createWriteStream(savePath)
          c.end();
          resolve('下载成功');
        });
      });
      // connect to localhost:21 as anonymous
      c.connect(
        {
          host: 'cagymjc.gotoftp11.com',
          port: 21,
          user: 'cagymjc',
          password: "173542558"
        }
      );
    } catch (err) {
      reject(err)
    }
  });

}

