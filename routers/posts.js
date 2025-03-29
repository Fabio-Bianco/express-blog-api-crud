// routers/posts.js
const express = require('express');
const router = express.Router();

// INDEX – GET /posts
router.get('/', (req, res) => {
  res.send('GET: Lista di tutti i post');
});

// SHOW – GET /posts/:slug
router.get('/:slug', (req, res) => {
  const slug = req.params.slug;
  res.send(`GET: Dettagli del post con slug: ${slug}`);
});

// CREATE – POST /posts
router.post('/', (req, res) => {
  res.send('POST: Creazione di un nuovo post');
});

// UPDATE – PUT /posts/:slug
router.put('/:slug', (req, res) => {
  const slug = req.params.slug;
  res.send(`PUT: Aggiornamento del post con slug: ${slug}`);
});

// DELETE – DELETE /posts/:slug
router.delete('/:slug', (req, res) => {
  const slug = req.params.slug;
  res.send(`DELETE: Eliminazione del post con slug: ${slug}`);
});

module.exports = router;
