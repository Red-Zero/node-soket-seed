const ftp = require('./common');
/*上传*/
ftp.send('./files/foo1.txt', 'foo.remote.txt').then(res => {
  console.log(res);
}).catch(err => {
  console.log('error:' + err);
})

ftp.get('foo.remote.txt', './files/foo.remote.txt').then(res => {
  console.log(res);
}).catch(err => {
  console.log('error:' + err);
})
