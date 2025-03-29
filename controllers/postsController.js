const posts = require('../data/posts');

// INDEX – restituisce tutti i post
function index(req, res) {
  res.json(posts);
}

// SHOW – restituisce un post specifico
function show(req, res) {
  const slug = req.params.slug;
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return res.status(404).send('Post non trovato');
  }

  res.json(post);
}

// CREATE – crea un nuovo post
function create(req, res) {
  res.send('POST: Creazione di un nuovo post');
}

// UPDATE – aggiorna un post specifico
function update(req, res) {
  const slug = req.params.slug;
  res.send(`PUT: Aggiornamento del post con slug: ${slug}`);
}

// DELETE – elimina un post specifico
function remove(req, res) {
  const slug = req.params.slug;
  const index = posts.findIndex(p => p.slug === slug);

  if (index === -1) {
    return res.status(404).send('Post non trovato');
  }

  posts.splice(index, 1);
  console.log('Lista aggiornata dei post:', posts);
  res.status(204).send(); // 204 = eliminazione andata a buon fine
}

module.exports = {
  index,
  show,
  create,
  update,
  remove
};
