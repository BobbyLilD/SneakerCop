const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const BuyRequest = require("../database/models/BuyRequest.model");
const { asyncHandler } = require("../middlewares/middlewares");

const router = Router();

function initRouters() {
    
}

async function getBuyRequests(req,res){
    let requests = await BuyRequest.findAll({
        where: {
            userId: req.userId
        }
    })
    if(!requests){
        throw new ErrorResponse("Not found", 404);
    }
    res.status(200).json({requests});
}

async function getBuyRequestById(req,res){
    let certainRequest = await BuyRequest.findByPk(req.params.id);
    if(!certainRequest){
        throw new ErrorResponse("Not found", 404);
    }
    res.status(200).json(certainRequest);
}

async function createBuyRequest(req,res){
    let buyRequest = await certainRequest.create({userId : req.userId, ...req.body});
    res.status(200).json(buyRequest); 
}

async function updateBuyRequest(req,res){
    let certainRequest = await BuyRequest.findByPk(req.params.id);
    if(!certainRequest){
        throw new ErrorResponse("Not found", 404);
    }
    await certainRequest.update(req.body);
    res.status(200).json(certainRequest); 
}

async function deleteBuyRequests(req,res){
    await BuyRequest.delete({
        where: {
            userId: req.userId,
            status: 'active'
        }
    })
    let requests = await BuyRequest.findAll({
        where: {
            userId: req.userId
        }
    })
    res.status(200).json({requests});
}

async function deleteBuyRequestById(req,res) {
    await BuyRequest.delete({
        where: {
            id: req.params.id
        }
    })
    let requests = await BuyRequest.findAll({
        where: {
            userId: req.userId
        }
    })
    res.status(200).json({requests});
}

initRouters();

module.exports = router;

