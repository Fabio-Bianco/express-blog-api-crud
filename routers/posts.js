const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController.js');



// INDEX – GET /posts restituisce tutti i post disponibili
router.get('/', postsController.index);

// SHOW – GET /posts/:id restituisce un singolo post tramite il suo ID
router.get('/:id', postsController.show);

// CREATE – POST /posts crea un nuovo post
router.post('/', postsController.create);

// UPDATE – PUT /posts/:id aggiorna un post esistente in base all'ID passato nell'URL
router.put('/:id', postsController.update);

// DELETE – DELETE /posts/:id elimina un post specifico tramite il suo ID
router.delete('/:id', postsController.remove);

module.exports = router;
