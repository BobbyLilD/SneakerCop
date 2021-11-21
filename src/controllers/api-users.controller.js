const { Router } = require("express");
const User = require("../dataBase/models/User.model");
const Token = require("../dataBase/models/Token.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

const router = Router();

function initRouters() {
  router.get("/me", asyncHandler(requireToken), asyncHandler(getUserInfo));
  router.patch("/me", asyncHandler(requireToken), asyncHandler(updateUserByID));
  router.delete("/logout", asyncHandler(requireToken), asyncHandler(logout));
}

async function getUserInfo(req, res, next) {
  let user = await User.findByPk(req.userId);
  res.status(200).json(user);
}

async function updateUserByID(req, res, next) {
  let user = await User.findByPk(req.userId);
  await user.update(req.body);
  res.status(200).json(user);
}

async function logout(req, res, next) {
  await Token.destroy({ where: { value: req.headers["token"] } });
  res.status(200).json("logged out");
}

initRouters();

module.exports = router;
