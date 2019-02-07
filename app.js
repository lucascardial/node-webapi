global.db = require('./db')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000;

// Body parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Routes
const router = express.Router()

router.get('/', (req, res) => res.json(
{
    message: "It's work baby!"
}))

router.get('/clientes', (req, res) =>
{
    global.db.allCustomers((err, docs) =>
    {
        if(err) res.status(500).json(err)
        else res.json(docs)
    })
})

router.get('/clientes/:id', (req, res) =>
{
    global.db.findCustomer(req.params.id, (err, doc) =>
    {
        if(err) res.status(500).json(err)
        else if(null == doc) res.status(404).json({error: "Not found any document with given id."})
        else res.json(doc)
    })
})

router.post('/clientes', (req, res) => 
{
    const customer = req.body
    global.db.createCustomer(customer, (err, result) =>
    {
        if(err) res.status(500).json(err)
        else res.status(201).json({
            message: 'Created'
        })
    })
})

app.use('/', router);
app.listen(port);
console.log(`Server api its working on port ${port}`);
