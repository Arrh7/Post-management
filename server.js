//1.引入express
const express=require("express")
//引入dotenv
require("dotenv").config();
// const dotenv=require("dotenv");
// //配置dotenv
// dotenv.config();
//引入express-async-errors
require("express-async-errors")
//引入抽离出去的路由文件
const postRouter=require("./routers/postRouter");
const userRouter=require("./routers/userRouter")

//实例化一个express的实例
const app=express();

//req.body中间件处理
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//静态资源托管处理
app.use(express.static("./public"))

//调用路由文件，并设置好前缀
app.use("/posts",postRouter)
app.use(userRouter)


//统一错误处理
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
  });


//监听端口，启动服务
app.listen(4000,()=>{
    console.log("服务启动成功");
    
})