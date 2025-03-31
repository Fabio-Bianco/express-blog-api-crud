const express = require("express");
const app = express();
const port = 4000;

const postsRouter = require('./routers/posts');
app.use('/posts', postsRouter);
// usa il router per tutte le rotte /posts

app.use(express.static('public')); // serve i file statici

app.get("/", (req, res) => {
  res.send("Benvenuto sul blog");
});

app.listen(port, () => {
  console.log("server attivo sulla porta " + port);
});
