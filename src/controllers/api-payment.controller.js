const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const PaymentInfo = require("../database/models/PaymentInfo.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

const router = Router();

function initRouter() {
    router.get('/', asyncHandler(requireToken), asyncHandler(getPaymentInfos));
    router.get('/:id', asyncHandler(requireToken), asyncHandler(getPaymentInfoByPk));
    router.post('/', asyncHandler(requireToken), asyncHandler(createPaymentInfo));
    router.patch('/:id', asyncHandler(requireToken), asyncHandler(updatePaymentInfo));
    router.delete('/:id', asyncHandler(requireToken), asyncHandler(deletePaymentInfoById));
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

initRouter();

module.exports = router;