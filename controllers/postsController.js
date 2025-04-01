const posts = require('../data/posts');

// INDEX – restituisce tutti i post, con filtro opzionale per tag
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

    console.log(` Post filtrati per tag [${tagList.join(', ')}]:`, filteredPosts);

    return res.json({
      message: `Post trovati con i tag: ${tagList.join(', ')}`,
      results: filteredPosts
    });
  }

  console.log(' Nessun filtro applicato, restituisco tutti i post:', posts);

  return res.json({
    message: 'Tutti i post disponibili',
    results: posts
  });
}

// SHOW – restituisce un post specifico per ID
function show(req, res) {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    console.log('Post non trovato')
    return res.status(404).json({ error: 'Post non trovato' });
  }

  console.log(`Post trovato con ID ${id}:`, post);

  return res.status(200).json({
    message: `Post trovato con ID: ${id}`,
    post: post
  });
}

// CREATE – crea un nuovo post
function create(req, res) {
  //Creiamo un nuovo id incrementando l'ultimo id presente (didattico)
  const newId = posts[posts.length - 1].id + 1;

  //  Controllo campi obbligatori
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ error: 'Titolo e contenuto sono obbligatori' });
  }

  // Costruzione del nuovo oggetto post
  const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags
  };

  // Aggiungiamo il nuovo post all’array dei post
  posts.push(newPost);

  //  Stampiamo nel terminale la lista aggiornata dei post
  console.log(' Nuovo post creato:', newPost);
  console.log(' Lista aggiornata:', posts);

  //  Risposta al client
  res.status(201).json({
    message: 'Post creato con successo',
    post: newPost
  });
}


// UPDATE – modifica completa di un post
function update(req, res) {
  const id = parseInt(req.params.id);
 
   // Trova l'indice del post con l'ID specificato
   const index = posts.findIndex(p => p.id === id);
  // Se non lo trova, restituisce errore 404
  if (index === -1) {
    console.log(`Nessun post trovato con ID: ${id}. Aggiornamento non eseguito.`);
    return res.status(404).json({ error: `Post con ID ${id} non trovato` });
  }

   // Nuovo oggetto post da sovrascrivere
   const updatedPost = {
    id: id,
    title: req.body.title || '',
    content: req.body.content || '',
    image: req.body.image || '',
    tags: req.body.tags || []
  };

    // Sovrascrive il vecchio post con quello aggiornato
    posts[index] = updatedPost;

    console.log(`Post con ID ${id} aggiornato con successo.`);
    console.log('Nuovo contenuto del post:', updatedPost);
    console.log('Lista aggiornata dei post:', posts)

    // Risposta al client
    return res.status(200).json({
      message: 'Post aggiornato con successo (completo)',
      post: updatedPost
    });
  }

// MODIFY – modifica parziale di un post
function modify(req, res) {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    console.log(`Post con ID ${id} non trovato per modifica parziale.`);
    return res.status(404).json({ error: `Post con ID ${id} non trovato` });
  }

  // Applica solo i campi presenti
  if (req.body.title !== undefined) post.title = req.body.title;
  if (req.body.content !== undefined) post.content = req.body.content;
  if (req.body.image !== undefined) post.image = req.body.image;
  if (req.body.tags !== undefined) post.tags = req.body.tags;

  console.log(`Post con ID ${id} modificato parzialmente.`);
  console.log('Contenuto aggiornato:', post);

  return res.status(200).json({
    message: `Post modificato con successo (parziale)`,
    post: post
  });
}

// DESTROY – elimina un post
function remove(req, res) {
  // Estrae l'ID dai parametri della richiesta e lo converte in intero
  const id = parseInt(req.params.id);

  // Cerca l'indice del post con l'ID corrispondente
  const index = posts.findIndex(post => post.id === id);

  // Se il post non esiste, restituisce errore 404
  if (index === -1) {
    console.log(`Tentativo di eliminazione fallito: post con ID ${id} non trovato.`);
    return res.status(404).json({ error: 'Post non trovato' });
  }

  // Rimuove il post dall'array e lo salva in una variabile
  const deletedPost = posts.splice(index, 1)[0];

  // Log di conferma nel terminale
  console.log(`Post con ID ${id} eliminato con successo.`);
  console.log('Lista aggiornata dei post:', posts);

  // Risposta JSON al client con il post eliminato
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
