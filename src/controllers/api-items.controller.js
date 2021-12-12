const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");
const Item = require("../database/models/Item.model");
const User = require("../database/models/User.model");

const router = Router();

function initRouter() {
  router.get("/", asyncHandler(requireToken), asyncHandler(getItems));
  router.get("/:id", asyncHandler(getItemById));
}

async function getItems(req, res) {
  let items = await Item.findAll();
  res.status(200).json({ items });
}

async function getItemById(req, res) {
  let item = await Item.findByPk(req.params.id);
  res.status(200).json(item);
}

async function getItemsByTime(req, res) {
  let user = await User.findOne({
    where: {
      id: req.userId,
    },
  });
  if (!user) {
    throw new ErrorResponse("Something went wrong", 500);
  }
  let items = await Item.findAll({
    where: {
      publishDate: { [Op.gte]: user.lastChecked },
    },
  });
  res.status(200).json(items);
}

async function updateItemById(req, res) {
  let item = await Item.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!item) {
    throw new ErrorResponse("No item found", 404);
  }
  await item.update(req.body);
  res.status(200).json(item);
}

async function deleteItems(req, res) {
  await Item.destroy();
  let items = await Item.findAll();
  res.status(200).json(items);
}

async function deleteItemById(req, res) {
  await Item.destroy({
    where: {
      id: req.params.id,
    },
  });

  let items = await Item.findAll();
  res.status(200).json({ items });
}

initRouter();

module.exports = router;
