exports.router = async (head, body) => {
  console.log(head,body)
  switch (head.funcCode) {
    default:
      result = {
        head:{
          responseCode:"00",
          errCode:"00"
        },
        body:{"0x10":"this is return result"}
      };
  }
  return result;
};
