const uri = 'mongodb://localhost:27017';

const mongoose = require('mongoose');

mongoose.connect(uri+"/Arduino", {useNewUrlParser: true, useUnifiedTopology: true})

const User = mongoose.model('users', { name: String, password:String});

console.log(loginUser('h2o','123'));

function saveUser(user){
	user._id instanceof mongoose.Types.ObjectId;
	user.save().then(()=>console.log('{Servidor WEB}:Usuario cadastrado no banco'));
}

function findUserById(userId){
	User.findById(userId, function (err, user) {
		if(!err){
			return user[0];
		}
			return 0;
	});
}

function loginUser(name,password){
	User.find({name,password}, function (err, user) {
		if(!err){
			user[0]._id;
		}
	});
}