const router = require('express').Router();
const BookController = require('../controllers/bookController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');


router.post('/', authentication, authorization, BookController.createBook);
router.get('/', BookController.getAllBooks);
router.put('/:id', authentication, authorization, BookController.updateBook);
router.delete('/:id', authentication, authorization, BookController.deleteBook);



module.exports = router;