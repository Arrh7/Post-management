const express=require("express");
const userController=require("../controllers/userController")
const multer=require("multer")

const auth=require('../middlewares/auth')
 
const upload=multer({
  dest:"./uploads"
})


  const router=express.Router();
/**
 * @api {post} http://localhost:3000/register 用户注册
 * @apiGroup 用户
 *
 * @apiParam  (body ){String} email 用户邮箱
 * @apiParam  (body) {String} possword 用户密码
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 */
router.post("/register",userController.register);

/**
 * @api {post} http://localhost:3000/login 用户登录
 * @apiGroup 用户
 *
 * @apiParam  (body ){String} email 用户邮箱
 * @apiParam  (body) {String} possword 用户密码
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 * @apiSuccess {String} token  tonke
 */
router.post("/login",userController.login);


/**
 * @api {get} http://localhost:3000/getInfo 获取当前登入用户基本信息
 *
 * @apiGroup 用户
 *
 * @apiParam (Headers) {String} Authorization token信息
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 * @apiSuccess {Object} data  当前用户基本信息
 */
  router.get("/getInfo",auth,userController.getInfo);

  
/**
 * @api {put} http://localhost:3000/users/update 修改用户基本信息
 *
 * @apiGroup 用户
 *
 * @apiParam (Headers) {String} Authorization token信息
 * @apiParam (Headers) {String} Authorization token信息
 * 
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 * @apiSuccess {Object} data  修改后用户基本信息
 */
router.put(
"/users/update",
auth,upload.single("avatar"),
userController.update
)

module.exports=router;