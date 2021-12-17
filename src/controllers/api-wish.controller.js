const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const Wish = require("../database/models/Wish.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

const router = Router();

function initRouter() {
    router.get('/', asyncHandler(requireToken), asyncHandler(getWishes));
    router.get('/:itemId', asyncHandler(requireToken), asyncHandler(getWish));
    router.post('/:itemId', asyncHandler(requireToken), asyncHandler(createWish));
    router.delete('/:itemId', asyncHandler(requireToken), asyncHandler(deleteWish));
}

async function getWish(req,res) {
    let wish = await Wish.findOne({
        where: {
            userId: req.userId,
            itemId: req.params.itemId
        }
    })
    if(!wish) {
        res.status(200).json({wish: false});
    } else{
        res.status(200).json({wish: true});
    }
}

async function getWishes(req,res) {
    let wishes = await Wish.findAll({
        where: {
            userId: req.userId
        }
    })
    if(!wishes){
        throw new ErrorResponse("Failed to get", 500);
    }
    res.status(200).json({wishes});
}

async function createWish(req,res) {
    let wish = await Wish.create({
        userId: req.userId,
        itemId: req.params.itemId
    })
    if(!wish){
        throw new ErrorResponse("Failed to create", 500);
    }
    res.status(200).json(wish);
}

async function deleteWishes(req,res) {
    await Wish.destroy({
        where: {
            userId: req.userId
        }
    })
    let wishes = await Wish.getAll({
        where: {
            userId: req.userId
        }
    })
    if(!wishes){
        throw new ErrorResponse("Failed to get", 500);
    }
    res.status(200).json({wishes});
}

async function deleteWish(req,res) {
    await Wish.destroy({
        where: {
            userId: req.userId,
            itemId: req.params.itemId
        }
    })
    res.status(200).json("Done");
}

initRouter();

module.exports = router;

