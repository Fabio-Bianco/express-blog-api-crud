// controllers/postsController.js

// INDEX – restituisce tutti i post
function index(req, res) {
    res.send('GET: Lista di tutti i post');
  }
  
  // SHOW – restituisce un post specifico
  function show(req, res) {
    const slug = req.params.slug;
    res.send(`GET: Dettagli del post con slug: ${slug}`);
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
    res.send(`DELETE: Eliminazione del post con slug: ${slug}`);
  }
  
  module.exports = {
    index,
    show,
    create,
    update,
    remove
  };
  