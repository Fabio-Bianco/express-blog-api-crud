
const express = require("express"); // Importa il modulo Express

const app = express();// Crea un'applicazione Express

const port = 4000;// Imposta la porta su cui il server ascolterà


app.use(express.json()); // Middleware per abilitare il parsing del body JSON nelle richieste (necessario per leggere req.body)

// Importa il router dei post
const postsRouter = require("./routers/posts");

// Associa il router alla rotta base "/posts"
// Tutte le rotte nel file postsRouter partiranno con "/posts"
app.use("/posts", postsRouter);

// Middleware per servire file statici dalla cartella "public"
app.use(express.static("public"));

// Rotta di base: risponde alla richiesta GET su "/"
app.get("/", (req, res) => {
  res.send("Benvenuto sul blog");
});

// Avvia il server e ascolta sulla porta definita
app.listen(port, () => {
  console.log("Server attivo sulla porta " + port);
});
