let router = require("./router");
let tagLength = require("./tagLength.json");
var object = require("lodash/fp/object");
const headLength = 4;
const returnHeadLength = 6
exports.analyze = async buffer => {
  let result = Buffer.alloc(0)
  let hasData = true;
  while (hasData) {
    hasData = buffer.length > 2;
    let realLength = buffer.readInt16BE(0);
    if (buffer.length < realLength) {
      hasData = false;
    } else {
      target = buffer.slice(0, realLength);
      let res = await ContentDelivery(target);
      result = Buffer.concat([result, res]);
      buffer = buffer.slice(realLength, buffer.length);
      if (buffer.length == 0) {
        hasData = false;
      }
    }
  }
  return {
    newbuf: buffer,
    res: result
  };
};
ContentDelivery = async buffer => {
  let result = [];
  let hedaModel = analyzeHead(buffer.slice(0, headLength));
  let bodyModel = analyzeBody(buffer.slice(headLength, buffer.length));

  let res = await router.router(hedaModel, bodyModel);

  let bodyRes = createRetunBody(res.body);


  let totalLength = bodyRes.length + returnHeadLength;
  let headRes = createReturnHead(totalLength, res.head);
  result = Buffer.concat([headRes, bodyRes], totalLength);
  console.log(headRes,bodyRes,result)
  return result;
};

//解析头
analyzeHead = head => {
  return {
    length: head.readInt16BE(0),
    type: head.toString("utf8", 2, 4),
  };
};
//报文解析
analyzeBody = body => {
  let model = {};
  while (body.length > 0) {
    let tag = "0x" + body.toString("hex", 0, 1);
    let len = body.readUInt16BE(1);
    let val = ""
    switch(tag)
    {
      default:{
        val = body.slice(3, 3 + len).toString();
      }
    }
    model[tag] = val;
    body = body.slice(len + 3);
  }
  return model;
};
//创建返回报文头
createReturnHead = (length, head) => {
  console.log(length,head)
  let lenBuf = Buffer.allocUnsafe(2);
  lenBuf.writeInt16BE(length, 0);

  let resBuf = Buffer.allocUnsafe(2);
  resBuf.write(head.responseCode);

  let errBuf = Buffer.allocUnsafe(2);
  errBuf.write(head.errCode);
  let res = Buffer.concat(
    [lenBuf, resBuf, errBuf],
    returnHeadLength
  );
  console.log(res)
  return res;
};
//创建返回报wen
createRetunBody = model => {
  let res = [];
  let totalLength = 0;
  object.keys(model).forEach(key => {
    let len = tagLength[key] === 0 ? model[key].length : tagLength[key];
    totalLength += len + 3;
    let buf = Buffer.alloc(len + 3);
    let tag = parseInt(key);
    switch (key) {
      default: {
        buf.writeUInt8(tag, 0);
        buf.writeUInt16BE(len, 1);
        buf.write(model[key], 3);
      }
    }
    res.push(buf);
  });

  return Buffer.concat(res, totalLength);
};
