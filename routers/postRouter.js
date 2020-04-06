//引入express
const express = require("express");



// 引入 postController
const {
  index,
  create,
  update,
  remove,
  show
} = require("../controllers/postController");
//引入auth中间件
const auth=require('../middlewares/auth')

//生成express.Router();
const router = express.Router();

//定义帖子相关路由
/**
 * @api {get} /posts 查询帖子
 * @apiGroup Post
 *
 * @apiParam (query) {String} pageNum=1 页码<可选>
 * @apiParam (query) {String} pageSize=2 每页显示条数<可选>
 * @apiParam (query) {String} title 搜索关键字<可选>
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 * @apiSuccess {Object} data 数据
 * @apiSuccess {Array} data[list] 帖子数据
 * @apiSuccess {Number} data[totalPage] 总的页数
 */
router.get("/", index);


/**
 * @api {post} http://localhost:3000/posts 创建一个帖子
 * @apiName create
 * @apiGroup Post
 *
 * @apiParam {String} title 帖子标题
 * @apiParam {String} content 帖子内容
 *  @apiParam (Headers) {String} Authorization token信息
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 */
router.post("/", auth,create);
//先进入token 

/**
 * @api {put} http://localhost:3000/posts/:id 编辑帖子
 * @apiName update
 * @apiGroup Post
 *
 * @apiParam {String} title 帖子标题
 * @apiParam {String} content 帖子内容
 *  @apiParam (Headers) {String} Authorization token信息
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 */
router.put("/:id",auth, update);

/**
 * @api {delete} http://localhost:3000/posts/:id 删除帖子
 * @apiGroup Post
 * 
 *  @apiParam (Headers) {String} Authorization token信息
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 */
 router.delete("/:id",auth, remove);


/**
 * @api {get} http://localhost:3000/posts/:id 帖子详情
 * @apiGroup Post
 * 
 *  @apiParam (Headers) {String} Authorization token信息
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 */
 router.get("/:id", show);

module.exports = router;
