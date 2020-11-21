const nodeRoutes = require('./node-route');

module.exports = function(app, db){
    nodeRoutes(app, db);
}