const express = require ('express'); // importazione di express 
const app = express (); // invocazione di express;
const port = 4000; // variabile che identifica la porta;


// aggiungo la rotta
app.get ('/', (req, res) => {
    console.log (' Rotta principale del blog')

  res.send ('Benvenuto sul blog')  // risposta

} )
 

app.listen(port, () => {
    console.log('server attivo sulla porta ' + port)
    
})// il server resta in ascolto sulla porta 4000 