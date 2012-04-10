module.exports = function(app) {
    app.get('/', require('../../controllers/app').index);
    //app.get('/about', require('../../controllers/app').about);
}
