// 演示 jwt 的使用

// 引入 jsonwebtoken
const jsonwebtoken = require("jsonwebtoken");

//定义要存放到 token中的数据
const payload={
    id:"123",
    nickname:"我的天"
}

//定义一个秘钥
//注意：一般不能直接在代码中明确的写上这些敏感的信息
const secret = "asdfasd234rasd34qraeazfsdvc";

/**
 * 签发一个token
 * jsonwebtoken.sign(payload, secret, options?)
 *    - payload 要存放到token中的数据
 *    - secret  秘钥
 *    - options 配置选项，比如配置过期时间之类的东西
 */
const token = jsonwebtoken.sign(payload, secret, {
    // 过期时间，以秒为单位，一般是 2h
    //          或者以描述时间跨度的字符串表示
    //          60              => 60s
    //          "2 days"        => 2天
    //          "10h"           => 10小时
    //          "2d"            => 2天
    expiresIn: 10
  });
  
  console.log(token);

  //每一块令牌都是独一无二的
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsIm5pY2tuYW1lIjoi5oiR55qE5aSpIiwiaWF0IjoxNTg1NjcwNjgzLCJleHAiOjE1ODU2NzA2OTN9.L9QjWGMAeBEkUyhDr8ue_iSQlGTh6UvQvX6GQ3NBdek

  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsIm5pY2tuYW1lIjoi5oiR55qE5aSpIiwiaWF0IjoxNTg1NjcwNzAzLCJleHAiOjE1ODU2NzA3MTN9.kTCnXR7dTJ6rZo3myebWLzUehntiMjoBtQHRr5UekL8

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsIm5pY2tuYW1lIjoi5oiR55qE5aSpIiwiaWF0IjoxNTg1NjcwOTUyLCJleHAiOjE1ODU2NzA5NjJ9.Mvxn4BJPHlEUV3pVdANXjpN8uJ4VRuYB3cPzKZVBPQA

  /**
 * 解析token。得到藏在token中的信息 (异步的方法，没有同步的方式)
 * jsonwebtoken.verify(token, secret, callback)
 *    - token 要解析的token字符串
 *    - secret 秘钥，必须使用生成token时一致的秘钥
 *    - callback  回调函数
 *          - err   错误对象，没有错误的话，它就是 undefined
 *          - data  解析出来的信息。一般可以理解为就是之前签发token时提供的 payload
 *                  可能会有一些官方字段在里面
 */

jsonwebtoken.verify(
    token,
  
    secret,
  
    (err, data) => {
      if (err) {
        console.log("解析失败");
        console.log(err.message);
      } else {
        console.log("解析成功");
        console.log(data);
      }
    }
  );
  