const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const StoreOffer = require("../database/models/StoreOffer.model");
const { asyncHandler } = require("../middlewares/middlewares");

const router = Router();

function initRouter() {
    
}

async function getStoreOffers(req,res) {
    let offers = await StoreOffer.findAll({
        where: {
            itemId: req.params.itemId
        }
    })
    if(!offers){
        throw new ErrorResponse("Failed to get", 500);
    }
    res.status(200).json({offers});
}

async function getStoreOfferById(req,res) {
    let offer = await StoreOffer.findByPk(req.params.id);
    if(!offer){
        throw new ErrorResponse("Not found", 404);
    }
    res.status(200).json(offer);
}

async function createStoreOffer(req,res){
    let offer = await StoreOffer.create(req.body);
    if(!offer){
        throw new ErrorResponse("Not created", 400);
    }
    res.status(200).json(offer);
}

async function updateStoreOffer(req,res) {
    let offer = await StoreOffer.findByPk(req.params.id);
    if(!offer){
        throw new ErrorResponse("Not found", 404);
    }
    await offer.update(req.body);
    res.status(200).json(offer);
}

async function deleteStoreOffers(req,res) {
    await StoreOffer.delete({
        where: {
            itemId: req.params.itemId
        }
    })
    let offers = await StoreOffer.findAll({
        where: {
            itemId: req.params.itemId
        }
    })
    if(!offers){
        throw new ErrorResponse("Failed to get", 500);
    }
    res.status(200).json({offers});
}

async function deleteStoreOfferById(req,res){
    await StoreOffer.delete({
        where: {
            id: req.params.id
        }
    })
    let offers = await StoreOffer.findAll({
        where: {
            itemId: req.params.itemId
        }
    })
    if(!offers){
        throw new ErrorResponse("Failed to get", 500);
    }
    res.status(200).json({offers});
}

initRouter();

module.exports = router;