var express = require('express');
var router = express.Router();
let userController = require('../controllers/users')
var { CreateSuccessRes, CreateErrorRes } = require('../utils/ResHandler')
let {check_authentication,check_authorization} = require('../utils/check_auth')
let constants = require('../utils/constants')

/* GET users listing. */
router.get('/', check_authentication, check_authorization(['mod']),  async function (req, res, next) {
  try {
    let users = await userController.GetAllUser();
    CreateSuccessRes(res, 200, users);
  } catch (error) {
    next(error)
  }
});
router.get('/:id', check_authentication, check_authorization(['mod']), async function (req, res, next) {
  try {
    // Không cho phép xem chính mình
    if (req.user._id.toString() === req.params.id) {
      return CreateErrorRes(res, 403, new Error("Không thể xem thông tin chính bạn"));
    }
    let user = await userController.GetUserById(req.params.id);
    CreateSuccessRes(res, 200, user);
  } catch (error) {
    CreateErrorRes(res, 404, error);
  }
});
router.post('/', check_authentication, check_authorization(['admin']), async function (req, res, next) {
  try {
    let body = req.body
    let newUser = await userController.CreateAnUser(body.username, body.password, body.email, body.role);
    CreateSuccessRes(res, 200, newUser);
  } catch (error) {
    next(error);
  }
})
router.put('/:id', check_authentication, check_authorization(['admin']), async function (req, res, next) {
  try {
    let updateUser = await userController.UpdateUser(req.params.id, req.body);
    CreateSuccessRes(res, 200, updateUser);
  } catch (error) {
    next(error);
  }
})
router.delete('/:id', check_authentication, check_authorization(['admin']), async function (req, res, next) {
  try {
    let deletedUser = await userController.DeleteUser(req.params.id); // hàm xóa mềm hoặc cứng tuỳ bạn định nghĩa
    CreateSuccessRes(res, 200, deletedUser);
  } catch (error) {
    next(error);
  }
});



module.exports = router;