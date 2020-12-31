const router = require('express').Router();
const UserController = require('../controllers/userController');

router.post('/login', UserController.login);
router.post('/signup', UserController.signup);



module.exports = router;