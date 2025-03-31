const posts = require('../data/posts');

function create(req, res) {
  // Controllo: se l'array è vuoto, partiamo da id = 1
  const newId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;

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


// INDEX – restituisce tutti i post, con filtro opzionale per tag
function index(req, res) {
  let tags = req.query.tag;

  if (tags) {
    if (!Array.isArray(tags)) {
      tags = [tags];
    }

    const tagList = tags.map(t => t.toLowerCase());

    const filteredPosts = posts.filter(post =>
      post.tags.some(t => tagList.includes(t.toLowerCase()))
    );

    return res.json(filteredPosts);
  }

  res.send('Lista dei post'); // oppure: res.json(posts);
}

// SHOW – restituisce un post specifico per ID
function show(req, res) {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({ error: 'Post non trovato' });
  }

  res.send(`Dettagli del post con ID: ${id}`);
  // oppure: res.json(post);
}

// STORE – crea un nuovo post
function create(req, res) {
  console.log('Dati ricevuti:', req.body);
  res.send('Creazione di un nuovo post');
}

// UPDATE – modifica completa di un post
function update(req, res) {
  const id = parseInt(req.params.id);
  res.send(`Modifica integrale del post con ID: ${id}`);
}

// MODIFY – modifica parziale di un post
function modify(req, res) {
  const id = parseInt(req.params.id);
  res.send(`Modifica parziale del post con ID: ${id}`);
}

// DESTROY – elimina un post
function remove(req, res) {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Post non trovato' });
  }

  posts.splice(index, 1);
  console.log('Lista aggiornata dei post:', posts);
  res.send(`Eliminazione del post con ID: ${id}`);
}

module.exports = {
  index,
  show,
  create,
  update,
  modify,
  remove
};
