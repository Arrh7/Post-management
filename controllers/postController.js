// 帖子的控制器，暴露一系列中间件方法给到帖子的路由去使用

// 引入 PostModel
const PostModel = require("../models/postModel");
const jsonwebtoken=require("jsonwebtoken")
/**
 * 查询帖子
 */
exports.index = async (req, res) => {
  // res.send("获取帖子列表")
  //Model.find()

  const pageNum = parseInt(req.query.pageNum) || 1;
  const pageSize = parseInt(req.query.pageSize) || 3;
  //获取前端传递来的搜索数据
  const title=req.query.title;

  //查询数据库model.find()
  ///title/是模糊搜索，标题中含有title这个字符串的数据
  //需要使用正则对象来生成正则表达式title=张三  new RegExp(title)=>/张三/

    // populate(字段名, 字段选择) 中文意思叫做填充，接受的 userId 是 PostModel 的 schema 中定义的一个字段名字
  // 并且这个 userId 字段关联的是 user 模型。
  // 所以这块会将 userId 填充为 对应的用户信息
  const data = await PostModel.find( {title:new RegExp(title)})
    .populate("userId","nickname")
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)

  //前端还需要知道一共有几页
  //totalPage = Math.ceil(总条数 / 每页显示条数) = Math.ceil(总条数/pageSize)
  //先计算出总条数 total

  const total = await PostModel.find({title:new RegExp(title)}).countDocuments();
  //再计算出totalPage
  const totalPage = Math.ceil(total / pageSize)


  //响应
  res.send({
    code: 0,
    msg: "ok",
    data:{
      list:data,
      totalPage:totalPage
    }
  })

};


/**
 * 创建帖子
 */
exports.create = async (req, res) => {
  //获取前端传递过来的参数
  // const { title, content } = req.body;
  // await PostModel.create({ title, content });
  // res.send({ code: 0, msg: "成功" })

   // 获取出 req.auth 中的 userId
   const { userId } = req.auth;
   req.body.userId = userId;
 
   await PostModel.create(req.body);
   res.send({ code: 0, msg: "成功" });

}

/**
 * 更新帖子
 */
exports.update = async (req, res) => {
  const { id } = req.params;

  //更新的内容 req.boby
  // const{title,content}=req.body;

  //Model.updateOne()

  await PostModel.updateOne({ _id: id }, req.body);
  res.send({ code: 0, msg: "成功" })

}

/**
 * 删除帖子
 */
exports.remove = async (req, res) => {
  // res.send("删除帖子")
  const { id } = req.params;

  //Model.dateOne()

  await PostModel.deleteOne({ _id: id });
  res.send({ code: 0, msg: "成功" })

}

/**
 * 帖子详情
 */
exports.show = async(req,res)=>{
  //获取id
  const { id } = req.params;

  //model.findOne()=>{}
  const data=  await PostModel.findOne({_id:id}).populate("userId","nickname")
  res.send({code:0,msg:"ok",data})
}


