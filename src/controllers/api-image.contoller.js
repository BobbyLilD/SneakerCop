const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const { nanoid } = require("nanoid");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");
const Image = require('../database/models/Image.model')

const router = Router();

function initRouter(){
    router.get('/:itemId', asyncHandler(getFrontImage))
    router.get('/:itemId/all', asyncHandler(getImages))
}

async function getImages(req,res) {
    let images = await Image.findAll({
        where: {
            itemId: req.params.itemId
        }
    })
    if(!images){
        throw new ErrorResponse("Not found", 404);
    }
    res.status(200).json({images});
}

async function getFrontImage(req, res) {
    let image = await Image.findOne({
        where: {
            itemId: req.params.itemId,
            isFront: true
        }
    })
    if(!image){
        throw new ErrorResponse("Not found!", 404);
    }
    res.status(200).json(image)
}

async function createImage(req, res) {
    let image = await Image.create(req.body);
    if(!image){
        throw new ErrorResponse("Failed to create", 500);
    }
    res.status(200).json(image)
}

async function updateImage(req,res) {
    let image = await Image.findByPk(req.body.src);
    if(!image){
        throw new ErrorResponse("Not found", 404);
    }
    await image.update(req.body);
    res.status(200).json(image);
}

async function deleteImage(req,res) {
    await Image.delete({
        where: {
            location: req.body.src
        }
    })
    let images = await Image.findAll({
        where: {
            itemId: req.body.itemId
        }
    })
    if(!images){
        throw new ErrorResponse("Not found", 404);
    }
    res.status(200).json({images});
}

async function deleteImages(req,res){
    await Image.delete({
        where: {
            itemId: req.body.itemId
        }
    })
    let images = await Image.findAll({
        where: {
            itemId: req.body.itemId
        }
    })
    if(!images){
        throw new ErrorResponse("Not found", 404);
    }
    res.status(200).json({images});
}

initRouter();

module.exports = router;