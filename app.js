const express = require("express"); // importazione di express
const app = express(); // invocazione di express;
const port = 4000; // variabile che identifica la porta;


const posts = require('./posts'); // importazione dell'array dei post

// aggiungo la rotta home page blog
app.get("/", (req, res) => {
  console.log(" rotta principale del blog");

  res.send("Benvenuto sul blog"); // risposta
});

// aggiungo una rotta per i post

// rotta che restituisce tutti i post
app.get('/posts', (req, res) => {
    console.log('Rotta per i posts');
   
    res.json(posts); // restituisce l'array in formato JSON
  });

app.listen(port, () => {
  console.log("server attivo sulla porta " + port);
}); // il server resta in ascolto sulla porta 4000
