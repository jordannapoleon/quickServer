const express = require('express');
const {Client} = require('pg');
const connectionString = "postgres://postgres:docker@localHost:5432/quickserverdb"
const client = new Client(
    connectionString
);
client.connect();

const app = express();
const PORT = 5025;
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.get('/api/clothes', (req, res) => {
client.query('SELECT * FROM quickserver')
    .then(result => {
        res.send(result.rows);
    })
    .catch (e => console.error(e.stack))
});

app.post('/api/clothes', (req, res) => {
    console.log(req, req.body);
    client.query(`INSERT INTO quickserver (item_name, item_price, item_avail) VALUES ('${req.body.item_name}', ${req.body.item_price}, ${req.body.item_avail})`)
    .then(result =>{
        res.send(result.rows)
    })
    .catch (e => console.error(e.stack))
});

app.patch(`/api/clothes/:item_id`, (req,res) =>{
    console.log(req);
    client.query(`UPDATE quickserver SET item_name='${req.body.item_name}' WHERE item_id=${req.params.item_id}`)
    .then(result =>{
        res.send(result.rows);
    })
    .catch(e => console.error(e.stack));
})

app.delete('/api/clothes/:item_id', (req,res) => {
    client.query(`DELETE FROM quickserver WHERE item_id=${req.params.item_id}`)
    .then(result =>{
        res.send('Successful')
    })
    .catch (e => console.error(e.stack))
        res.send('Bad Request')
});
  
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })