//homeopatia2016
const MongoClient =  require('mongodb');
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url,(err, client) =>{

    assert.equal(err,null);

    console.log('Connected correcly to server');

     const db = client.db(dbname);
     const collection = db.collection('dishes');

     dboper.insertDocument(db,{name:'Vadonut', description: 'Test'},'dishes', (result) => {

        console.log('Insert Document:\n',result.ops);

        dboper.findDocuments(db, 'dishes', (docs) =>{
            console.log('Found Documents:\n', docs);

            dboper.updateDocument(db, {name:"Vadonut"},{description: "Updeted Test"},"dishes",(result) =>{
                console.log("Updated Document:\n", result.result);

                dboper.findDocuments(db, "dishes", (docs) => {
                    console.log("Found Updated Documents:\n",docs);

                    db.dropCollection("dishes", (result) => {
                        console.log("Dropped Collection: ", result);

                        client.close();
                    });
                });
            });
        });
     });
});