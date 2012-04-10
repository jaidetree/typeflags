var Controller = function(app) {}; 

Controller.prototype = {
    'index': function(req, res) {
        res.render('index', { title: 'Controller Works!' });
    }
};
module.exports = new Controller();
