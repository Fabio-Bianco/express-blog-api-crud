const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/', postsController.index);
router.get('/:slug', postsController.show);
router.post('/', postsController.create);
router.put('/:slug', postsController.update);
router.delete('/:slug', postsController.remove);

module.exports = router;
