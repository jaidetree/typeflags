var app = require('../app');
exports.testWordSet = function(beforeExit, assert) {
    this.callback = function(){};
    assert.response( app, {
        url: '/wordset',
        timeout: 1
    }, function(res){ 
        assert.ok(res.body.indexOf('Documents retrieved') >= 0, '/wordset did not retrieve the documents.');
    });
};
