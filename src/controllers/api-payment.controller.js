const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const PaymentInfo = require("../database/models/PaymentInfo.model");
const { asyncHandler } = require("../middlewares/middlewares");

const router = Router();

function initRouters() {
    
}

async function getPaymentInfos(req,res) {
    let infos = await PaymentInfo.findAll({
        where: {
            userId: req.userId
        }
    })
    if(!infos){
        throw new ErrorResponse("Not found", 404);
    }
    res.status(200).json({infos});
}

async function getPaymentInfoByPk(req,res){
    let info = await PaymentInfo.findByPk(req.params.id);
    if(!info){
        throw new ErrorResponse("Not found", 404);
    }
    res.status(200).json(info);
}

async function createPaymentInfo(req,res) {
    let info = await PaymentInfo.create({
        userId: req.userId,
        ...req.body
    })
    res.status(200).json(info);
}

async function updatePaymentInfo(req,res) {
    let info = await PaymentInfo.findByPk(req.params.id);
    if(!info){
        throw new ErrorResponse("Not found", 404);
    }
    await info.update(req.body);
    res.status(200).json(info);
}

async function deletePaymentInfos(req, res){
    await PaymentInfo.delete({
        where: {
            userId : req.userId
        }
    })
    let infos = await PaymentInfo.findAll({
        where: {
            userId: req.userId
        }
    })
    res.status(200).json({infos});
}

async function deletePaymentInfoById(req,res) {
    await PaymentInfo.delete({
        where: {
            id : req.params.id
        }
    })
    let infos = await PaymentInfo.findAll({
        where: {
            userId: req.userId
        }
    })
    res.status(200).json({infos});
}

initRouters();

module.exports = router;