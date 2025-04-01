
# Progetto Express API - Blog REST

Questo progetto è una semplice API REST costruita con **Node.js** e **Express** che simula la gestione di un blog. Ogni post è rappresentato da un oggetto in un array locale (`posts.js`), senza connessione a un database.

---

##  Funzionalità principali (CRUD)

- `GET /posts` → Elenco di tutti i post (filtro opzionale per `?tag=`)
- `GET /posts/:id` → Dettaglio di un post per ID
- `POST /posts` → Creazione di un nuovo post
- `PUT /posts/:id` → Aggiornamento completo di un post
- `PATCH /posts/:id` → Aggiornamento parziale di un post
- `DELETE /posts/:id` → Eliminazione di un post

---

## Struttura del progetto

```
.
├── app.js                 # Entry point
├── routers/
│   └── posts.js           # Definizione delle rotte
├── controllers/
│   └── postsController.js # Funzioni logiche (CRUD)
├── data/
│   └── posts.js           # Array simulato dei post
├── middlewares/
│   └── checkError.js      # Middleware personalizzato
├── public/                # File statici
├── package.json
└── .gitignore
```

---

## Middleware utilizzati

- `express.json()` → parsing del body JSON
- `checkError.js` → middleware personalizzato (es. logger)
- Middleware 404 → risposta JSON se rotta non trovata
- Middleware 500 → gestione errori interni (`err.stack`)

---

##  Test consigliati

Usa **Postman** per testare le rotte CRUD:

- `GET /posts`
- `POST /posts` con JSON body
- `GET /posts/:id`
- `PUT /posts/:id`
- `PATCH /posts/:id`
- `DELETE /posts/:id`

Rotta di errore:
- `GET /errore-test`

---

##  Script utili

- `npm install` → installa le dipendenze
- `npm start` → avvia il server
- `npm run dev` → avvia il server in modalità sviluppo con `--watch`

---


##  Requisiti

- Node.js (v18+)
- Express

---

## Autore

Fabio Bianco

Sviluppato per scopo didattico e presentazione a colloqui tecnici.