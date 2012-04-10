var Controller = function(app) {}; 
function success(message, data)
{
    if( ! data )
    {
        data = false;
    }
    return response( 'ok', message, data);
}
function error(message)
{
    return response( 'error', message, false);
}
function response(status, message, data) {
    var response_data = {
        'status': status,
        'msg': message
    };

    if( data )
    {
        response_data['data'] = data;
    }
    return response_data;
}

function get_ip_address()
{
    var ip_address;

    try {
        ip_address = req.headers['x-forwarded-for'];
    }
    catch ( error ) {
        ip_address = req.connection.remoteAddress;
    }

    return ip_address;
}

Controller.prototype = {
    'index': function(req, res) {
        var WordSet = mongoose.model('WordSet');

        WordSet.find({}, function(err, docs){
            res.send( success('Documents retrieved.', docs) );
        });
    },
    'words': function( req, res) {
        var WordSet = mongoose.model('WordSet');

        WordSet.find({}, ['words'], function(err, docs){
            var words = [];
            docs.forEach(function(doc){
                words.concat(doc.words);
            });
            res.send( success('All words retrieved.', words) );
        });
    },
    'create': function(req, res){
        var model = mongoose.model('WordSet');
        var WordSet = new model();
        WordSet.date = Date.now();
        WordSet.words = req.body.words;
        WordSet.status = "public";

        req.send();
            
        WordSet.save(function(err){ 
            if( err )
            {
                req.send(err);
            }
            else
            {
                res.send(success('Item created', WordSet));
            }
        });
    },
    'show': function(req, res){
        var WordSet = mongoose.model('WordSet');
        WordSet.findById(req.params.id, function (err, doc){
            if( err )
            {
                res.send(error(err));
            }
            else
            {
                res.send(success('Item found', doc));
            }
        });
    },
    'update': function(req, res){
        var WordSet = mongoose.model('WordSet');
        var data = {
            date: Date.now(),
            words: req.body.words,
            status: "public"
        };
        Wordset.update( { '_id': req.params.id }, data, function(err, numAffected){  
            if( err )
            {
                res.send(error(err));
            }
            else
            {
                res.send(success('Item: ' + req.parms.id + ' updated.', data));
            }
        });
    },
    'delete': function(req, res){
        var WordSet = mongoose.model('WordSet');

        WordSet.findById( req.params.id, function(err, doc){
            WordSet.remove(doc, function(err){ 
                if( err )
                {
                    res.send( error(err) );
                }else{
                    res.send( success('Item removed', req.params.id) );
                }
            });
        });

    },
    'destroy': function(req, res){
        var WordSet = mongoose.model('WordSet');

        WordSet.remove({}, function(err){
            if( err )
            {
                res.send( error(err) );
            }else{
                res.send( success('Database destroyed.') );
            }
        });
    }
};
module.exports = new Controller();
