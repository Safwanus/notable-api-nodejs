var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db){
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id' : new ObjectID(id)};
        db.collection('notes').findOne(details, (err, item)=> {
            if (err) {
                res.send({'error': 'Error occured'});
            } else {
                res.send(item)
            }
        });
    });

    app.delete('/notes/:id', (req,res)=>{
        const id = req.params.id;
        const details = {'_id' : new ObjectID(id)};
        db.collection('notes').remove(details, (err, item)=>{
            if (err) {
                res.send({'error': 'Error occured'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id' : new ObjectID(id)};
        const note = { title: req.body.title, text: req.body.body};
        db.collection('notes').update(details, note, (err, item)=> {
            if (err) {
                res.send({'error': 'Error occured'});
            } else {
                res.send(item)
            }
        });
    });
    app.post('/notes', (req, res) => {
        const note = { title: req.body.title, text: req.body.body};
        db.collection('notes').insert(note, (err, result)=>{
            if (err) {
                res.send({'error': 'Error occured'});
            } else {
                 res.send(result.ops[0])
            }
        });
    });
};

