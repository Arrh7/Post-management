// 连接 MongoDB

// 引入 mongoose
const mongoose = require("mongoose");

// 定义连接地址
const url = "mongodb://127.0.0.1:27017/express";

// 连接
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch(error => {
    console.log("嘤嘤嘤，数据库连接失败了");
    console.log(error);
  });

// 暴露
module.exports = mongoose;
