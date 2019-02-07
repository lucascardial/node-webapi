const objectID = require('mongodb').ObjectID
const mongoClient = require('mongodb').MongoClient.connect("mongodb://root:secret@localhost:27017/admin")
    .then(conn => global.conn = conn.db("workshop"))
    .catch(error => console.log(error))


function allCustomers(callback) {
    global.conn.collection('customers').find().toArray(callback)
}

function findCustomer(id, callback) {
    global.conn.collection('customers').findOne(new objectID(id), callback)
}

module.exports = {}
module.exports = {allCustomers, findCustomer}