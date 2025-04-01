const posts = require('../data/posts');

//
// INDEX – restituisce tutti i post, con filtro opzionale per tag (?tag=...)
//
function index(req, res) {
  let tags = req.query.tag;

  if (tags) {
    if (!Array.isArray(tags)) {
      tags = [tags];
    }

    const tagList = tags.map(tag => tag.toLowerCase());

    const filteredPosts = posts.filter(post =>
      post.tags.some(tag => tagList.includes(tag.toLowerCase()))
    );

    console.log(`🔍 Post filtrati per tag [${tagList.join(', ')}]:`, filteredPosts);

    return res.json({
      message: `Post trovati con i tag: ${tagList.join(', ')}`,
      results: filteredPosts
    });
  }

  console.log('📋 Nessun filtro applicato, restituisco tutti i post:', posts);

  return res.json({
    message: 'Tutti i post disponibili',
    results: posts
  });
}

//
// SHOW – restituisce un post specifico per ID
//
function show(req, res) {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    console.log(`❌ Post con ID ${id} non trovato`);
    return res.status(404).json({ error: 'Post non trovato' });
  }

  console.log(`📄 Post trovato con ID ${id}:`, post);

  return res.status(200).json({
    message: `Post trovato con ID: ${id}`,
    post
  });
}

//
// CREATE – crea un nuovo post
//
function create(req, res) {
  // Calcolo nuovo ID in modo didattico (incrementando l’ultimo ID esistente)
  const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;

  // Validazione: controlla che i campi obbligatori siano presenti
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ error: 'Titolo e contenuto sono obbligatori' });
  }

  const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags
  };

  posts.push(newPost);

  console.log('✅ Nuovo post creato:', newPost);
  console.log('📦 Lista aggiornata:', posts);

  return res.status(201).json({
    message: 'Post creato con successo',
    post: newPost
  });
}

//
// UPDATE – modifica completa di un post (PUT)
//
function update(req, res) {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    console.log(`❌ Nessun post trovato con ID ${id}. Aggiornamento non eseguito.`);
    return res.status(404).json({ error: `Post con ID ${id} non trovato` });
  }

  const updatedPost = {
    id: id,
    title: req.body.title || '',
    content: req.body.content || '',
    image: req.body.image || '',
    tags: req.body.tags || []
  };

  posts[index] = updatedPost;

  console.log(`✏️ Post con ID ${id} aggiornato con successo.`);
  console.log('📄 Nuovo contenuto del post:', updatedPost);
  console.log('📦 Lista aggiornata:', posts);

  return res.status(200).json({
    message: 'Post aggiornato con successo (completo)',
    post: updatedPost
  });
}

//
// MODIFY – modifica parziale di un post (PATCH)
//
function modify(req, res) {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    console.log(`❌ Post con ID ${id} non trovato per modifica parziale.`);
    return res.status(404).json({ error: `Post con ID ${id} non trovato` });
  }

  if (req.body.title !== undefined) post.title = req.body.title;
  if (req.body.content !== undefined) post.content = req.body.content;
  if (req.body.image !== undefined) post.image = req.body.image;
  if (req.body.tags !== undefined) post.tags = req.body.tags;

  console.log(`🩹 Post con ID ${id} modificato parzialmente.`);
  console.log('📄 Contenuto aggiornato:', post);

  return res.status(200).json({
    message: `Post modificato con successo (parziale)`,
    post
  });
}

//
// DESTROY – elimina un post
//
function remove(req, res) {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(post => post.id === id);

  if (index === -1) {
    console.log(`❌ Tentativo di eliminazione fallito: post con ID ${id} non trovato.`);
    return res.status(404).json({ error: 'Post non trovato' });
  }

  const deletedPost = posts.splice(index, 1)[0];

  console.log(`🗑️ Post con ID ${id} eliminato con successo.`);
  console.log('📦 Lista aggiornata:', posts);

  return res.status(200).json({
    message: `Post con ID ${id} eliminato con successo`,
    post: deletedPost
  });
}

module.exports = {
  index,
  show,
  create,
  update,
  modify,
  remove
};
