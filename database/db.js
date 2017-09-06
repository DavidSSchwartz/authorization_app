var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const passportLocalMongoose = require('passport-local-mongoose');
 
mongoose.connect('mongodb://localhost/authorization')
	.then(() => console.log('connection successful'))
	.catch((err) => console.error(err));

var schema = mongoose.Schema;

var rowSchema = new schema ({
	username: String
});

rowSchema.plugin(passportLocalMongoose);

var Row = mongoose.model('Row', rowSchema)

module.exports=Row;