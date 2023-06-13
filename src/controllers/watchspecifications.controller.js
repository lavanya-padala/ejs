const asyncHandler = require('express-async-handler');

const { WatchSpecification } = require('../models/watch_specification.model');

const { generateToken } = require('../utils/generateToken');


module.exports.search = asyncHandler(async (req, res) => {

    const watchModels = await WatchSpecification.find({ "model": { "$regex": req.params.searchKey, "$options": "i" }});

    res.status(201);
    res.json({ watchModels });
});


module.exports.getWatchDataForCompare = asyncHandler(async (req, res) => {

    const watchModel = await WatchSpecification.findById(req.param.watchModelId);

    res.status(201);
    res.json({ watchModel });
    
});
  

module.exports.getWatchDataForAnalysis = asyncHandler(async (req, res) => {

  const watchModel = await WatchSpecification.findById(req.param.watchModelId);

  res.status(201);
  res.json({ watchModel });
  
});

module.exports.getCardDataForAnalysis = asyncHandler(async (req, res) => {

  //const watchModel = await WatchSpecification.findById(req.param.watchModelId);

  res.status(201);
  res.json({ cards:{} });
  
});


module.exports.getWatchPricePerformance = asyncHandler(async (req, res) => {

  //const watchModel = await WatchSpecification.findById(req.param.watchModelId);

  res.status(201);
  res.json({ cards:{} });
  
});

module.exports.getAverageHighAndLowPriceForModel = asyncHandler(async (req, res) => {

  //const watchModel = await WatchSpecification.findById(req.param.watchModelId);

  res.status(201);
  res.json({ cards:{} });
  
});

module.exports.getAverageTradeAndPrivateSellPrice = asyncHandler(async (req, res) => {

  //const watchModel = await WatchSpecification.findById(req.param.watchModelId);

  res.status(201);
  res.json({ cards:{} });
  
});

module.exports.getBrandMarketMovement = asyncHandler(async (req, res) => {

  //const watchModel = await WatchSpecification.findById(req.param.watchModelId);

  res.status(201);
  res.json({ cards:{} });
  
});


module.exports.getRolexMarketMovement = asyncHandler(async (req, res) => {

  //const watchModel = await WatchSpecification.findById(req.param.watchModelId);

  res.status(201);
  res.json({ cards:{} });
  
});

module.exports.getOmegaMarketMovement = asyncHandler(async (req, res) => {

  //const watchModel = await WatchSpecification.findById(req.param.watchModelId);

  res.status(201);
  res.json({ cards:{} });
  
});


module.exports.getPatekPhilippeMarketMovement = asyncHandler(async (req, res) => {

  //const watchModel = await WatchSpecification.findById(req.param.watchModelId);

  res.status(201);
  res.json({ cards:{} });
  
});

module.exports.getAudemarsPiguetMarketMovement = asyncHandler(async (req, res) => {

  //const watchModel = await WatchSpecification.findById(req.param.watchModelId);

  res.status(201);
  res.json({ cards:{} });
  
});

module.exports.getVacheronConstantinMarketMovement = asyncHandler(async (req, res) => {

  //const watchModel = await WatchSpecification.findById(req.param.watchModelId);

  res.status(201);
  res.json({ cards:{} });
  
});