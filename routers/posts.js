const express = require('express');
const router = express.Router();

// Importiamo le funzioni dal controller
const postsController = require('../controllers/posts_controller');

// INDEX – GET /posts
router.get('/', postsController.index);

// SHOW – GET /posts/:slug
router.get('/:slug', postsController.show);

// CREATE – POST /posts
router.post('/', postsController.create);

// UPDATE – PUT /posts/:slug
router.put('/:slug', postsController.update);

// DELETE – DELETE /posts/:slug
router.delete('/:slug', postsController.remove);

module.exports = router;
