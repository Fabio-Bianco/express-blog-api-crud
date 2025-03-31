// controllers/postsController.js

const posts = require('../data/posts');

// INDEX – restituisce tutti i post, con filtro opzionale per tag
function index(req, res) {
  const tag = req.query.tag;
  console.log('Parametro tag ricevuto:', tag);

  if (tag) {
    const tagLower = tag.toLowerCase(); // converte il tag in minuscolo
    const filteredPosts = posts.filter(post =>
      post.tags.some(t => t.toLowerCase() === tagLower) // confronto in minuscolo
    );
    return res.json(filteredPosts);
  }

 return res.json(posts);
}


// SHOW – restituisce un post specifico per ID
function show(req, res) {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ error: 'Post non trovato' });
  }

  res.json(post);
}

// CREATE – crea un nuovo post (logica da implementare)
function create(req, res) {
  res.send('POST: Creazione di un nuovo post');
}

// UPDATE – aggiorna un post specifico per ID (logica da implementare)
function update(req, res) {
  const id = parseInt(req.params.id);
  res.send(`PUT: Aggiornamento del post con ID: ${id}`);
}

// DELETE – elimina un post specifico per ID
function remove(req, res) {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Post non trovato' });
  }

  posts.splice(index, 1);
  console.log('Lista aggiornata dei post:', posts);
  res.status(204).send();
}

module.exports = {
  index,
  show,
  create,
  update,
  remove
};
