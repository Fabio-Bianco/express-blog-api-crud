const express = require("express"); // importazione di express
const app = express(); // invocazione di express;
const port = 4000; // variabile che identifica la porta;
const postsRouter = require('./routers/posts'); 
// Importa il file posts.js dalla cartella routers che contiene tutte le rotte per gestire l'entità "post"

app.use('/posts', postsRouter); 
// Registra il router importato, assegnandogli il prefisso '/posts'




const posts = require('./posts'); // importazione dell'array dei post

// istruzione per l'accesso del serverer alla cartella pubblic

app.use (express.static ('public'));

// aggiungo la rotta home page blog
app.get("/", (req, res) => {
  console.log(" rotta principale del blog");

  res.send("Benvenuto sul blog"); // risposta
});

 

// aggiungo una rotta restituisce tutti i post
app.get('/posts', (req, res) => {
    console.log('Rotta per i posts');
   
    res.json(posts); // restituisce l'array in formato JSON
  });

app.listen(port, () => {
  console.log("server attivo sulla porta " + port);
}); // il server resta in ascolto sulla porta 4000
