const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const Wish = require("../database/models/Wish.model");
const { asyncHandler } = require("../middlewares/middlewares");

const router = Router();

function initRouters() {
    
}

async function getWishes(req,res) {
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

async function createWish(req,res) {
    let wish = await Wish.create({
        userId: req.userId,
        ...req.body
    })
    if(!wish){
        throw new ErrorResponse("Failed to create", 500);
    }
    res.status(200).json(wish);
}

async function deleteWishes(req,res) {
    await Wish.delete({
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
    await Wish.delete({
        where: {
            userId: req.userId,
            itemId: req.body.itemId
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

initRouters();

module.exports = router;

