const uri = 'mongodb://localhost:27017';

const mongoose = require('mongoose');

mongoose.connect(uri+"/Arduino", {useNewUrlParser: true, useUnifiedTopology: true})

const User = mongoose.model('users', { name: String, password:String});

function saveUser(user){
	user._id instanceof mongoose.Types.ObjectId;
	user.save().then(()=>console.log('{Servidor WEB}:Usuario cadastrado no banco'));
}

function loginUser(req,res){
	User.find({name:req.body.name,password:req.body.password}, function (err, user) {
		if(!err){
			if(user.length>0){
				res.cookie('userId',user[0]._id, { maxAge: 900000, httpOnly: false });
				res.send("Logado!");
				res.end();
			}else{
				res.cookie('userId',0, { maxAge: 900000, httpOnly: false });
				res.send("Usuário ou senha inválido!");
				res.end();
			}
		}
		else{
			res.send("Algo deu errado!");
			res.end();
		}
	});
}

function log(id,data,log){
	User.find({ _id: id }, function (err, user) {
		if(!err){
			if(user.length>0){
				var Log = {
					user:user[0].name,
					data:data
				}
				log(Log);
			}else{
				console.log(req.cookies.userId);
			}
		}
	});
}

function verifyLogin(id,on,off){
	id instanceof mongoose.Types.ObjectId;
	User.find({ _id: id }, function (err, user) {
		if(!err){
			if(user.length>0){
				on();
				
			}else{
				off();
			}
		}
		else{
			off();
		}
	});
}
module.exports = {
	User,
	saveUser,
	log,
	loginUser,
	verifyLogin
}