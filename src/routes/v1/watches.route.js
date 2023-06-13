const express = require('express');
//const upload = require('../config/multer');

const {
  search,
  getWatchDataForCompare,
  getWatchDataForAnalysis,
  getCardDataForAnalysis,
  getWatchPricePerformance,
  getAverageHighAndLowPriceForModel,
  getAverageTradeAndPrivateSellPrice,
  getBrandMarketMovement,
  getRolexMarketMovement,
  getOmegaMarketMovement,
  getPatekPhilippeMarketMovement,
  getAudemarsPiguetMarketMovement,
  getVacheronConstantinMarketMovement 

} = require('../../controllers/watchspecifications.controller');

//const { protectUser } = require('../../middlewares/authMiddleware');

const router = express.Router();

//base route /api/v1/watches/

router.get('/search/:searchKey', search);
router.get('/getWatchDataForCompare/:watchId', getWatchDataForCompare);
router.get('/getWatchDataForAnalysis/:watchId', getWatchDataForAnalysis);
router.get('/getCardDataForAnalysis/:watchId', getCardDataForAnalysis);
router.get('/getWatchPricePerformance/:watchId', getWatchPricePerformance);
router.get('/getAverageHighAndLowPriceForModel/:watchId', getAverageHighAndLowPriceForModel);
router.get('/getAverageTradeAndPrivateSellPrice/:watchId', getAverageTradeAndPrivateSellPrice);
router.get('/getBrandMarketMovement', getBrandMarketMovement);
router.get('/getRolexMarketMovement', getRolexMarketMovement);
router.get('/getOmegaMarketMovement', getOmegaMarketMovement);
router.get('/getPatekPhilippeMarketMovement', getPatekPhilippeMarketMovement);
router.get('/getAudemarsPiguetMarketMovement', getAudemarsPiguetMarketMovement);
router.get('/getVacheronConstantinMarketMovement', getVacheronConstantinMarketMovement);


module.exports = router;
