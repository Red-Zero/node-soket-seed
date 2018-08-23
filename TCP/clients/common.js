let tagLength = require("../transfrom/tagLength.json");
let object = require("lodash/fp/object");
let headLenth =4 
//创建返回报文头
exports.createHead = (length, head) => {

  let lenBuf = Buffer.allocUnsafe(2);
  lenBuf.writeInt16BE(length, 0);
  let typeBuf = Buffer.allocUnsafe(2);
  typeBuf.write(head.type)
  return Buffer.concat(
    [lenBuf,typeBuf],headLenth
  );
};
//创建返回报wen
exports.createBody = model => {
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

//解析头
exports.analyzeHead = head => {
  return {
    length: head.readInt16BE(0),
    responseCode:head.toString("utf8",2,4),
    errCode:head.toString("utf8",4,6),
  };
};
//报文解析
exports.analyzeBody = body => {
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