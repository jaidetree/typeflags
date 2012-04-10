module.exports = function(app) {
    var controller = require('../../controllers/wordset');
    app.get('/wordset(/?)', controller.index);
    app.post('/wordset/create', controller.create);
    app.get('/wordset/words', controller.words);
    app.get('/wordset/:id', controller.show);
    app.put('/wordset/:id', controller.update);
    app.delete('/wordset/:id', controller.delete);
    app.get('/wordset/destroy/rock3t', controller.destroy);
}
