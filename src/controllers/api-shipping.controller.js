const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const ShippingAddress = require("../database/models/ShippingAddress.model");
const { asyncHandler } = require("../middlewares/middlewares");

const router = Router();

function initRouters() {
    
}

async function getShippingAddresses(req,res) {
    let infos = await ShippingAddress.findAll({
        where: {
            userId: req.userId
        }
    })
    if(!infos){
        throw new ErrorResponse("Not found", 404);
    }
    res.status(200).json({infos});
}

async function getShippingAddressByPk(req,res){
    let info = await ShippingAddress.findByPk(req.params.id);
    if(!info){
        throw new ErrorResponse("Not found", 404);
    }
    res.status(200).json(info);
}

async function createShippingAddress(req,res) {
    let info = await ShippingAddress.create({
        userId: req.userId,
        ...req.body
    })
    res.status(200).json(info);
}

async function updateShippingAddress(req,res) {
    let info = await ShippingAddress.findByPk(req.params.id);
    if(!info){
        throw new ErrorResponse("Not found", 404);
    }
    await info.update(req.body);
    res.status(200).json(info);
}

async function deleteShippingAddresses(req, res){
    await ShippingAddress.delete({
        where: {
            userId : req.userId
        }
    })
    let infos = await ShippingAddress.findAll({
        where: {
            userId: req.userId
        }
    })
    res.status(200).json({infos});
}

async function deleteShippingAddressById(req,res) {
    await ShippingAddress.delete({
        where: {
            id : req.params.id
        }
    })
    let infos = await ShippingAddress.findAll({
        where: {
            userId: req.userId
        }
    })
    res.status(200).json({infos});
}

initRouters();

module.exports = router;