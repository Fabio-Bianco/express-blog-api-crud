const express = require('express');
const router = express.Router();
const postsController = require('../controllers/controllerPosts.js');


// INDEX – GET /posts
router.get('/', postsController.index);

// SHOW – GET /posts/:id
router.get('/:id', postsController.show);

// CREATE – POST /posts
router.post('/', postsController.create);

// UPDATE – PUT /posts/:id
router.put('/:id', postsController.update);

// DELETE – DELETE /posts/:id
router.delete('/:id', postsController.remove);

module.exports = router;
