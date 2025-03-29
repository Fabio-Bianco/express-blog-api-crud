const express = require("express"); // importazione di express
const app = express(); // invocazione di express;
const port = 4000; // variabile che identifica la porta;

// aggiungo la rotta home page blog
app.get("/", (req, res) => {
  console.log(" Rotta principale del blog");

  res.send("Benvenuto sul blog"); // risposta
});

// aggiungo una rotta per i post

app.get("/posts", (req, res) => {
  console.log(" Rotta principale i posts"); // rotta che deve risp ad una arrow function con una richiesta ed una risposta

  res.send("Tutti i posts");
});

app.listen(port, () => {
  console.log("server attivo sulla porta " + port);
}); // il server resta in ascolto sulla porta 4000
