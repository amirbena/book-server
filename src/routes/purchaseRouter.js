const router = require('express').Router();
const PurchaseController = require('../controllers/purchaseController');
const autorization = require('../middlewares/authorization');
const authentication = require('../middlewares/authentication');


router.post('/', authentication, PurchaseController.createPurchase);
router.get('/', authentication, PurchaseController.userPurchases);
router.get('/all', authentication, autorization, PurchaseController.allUsersPurchases);



module.exports = router;