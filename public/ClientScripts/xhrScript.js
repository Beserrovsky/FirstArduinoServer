//COMMANDS DATA SENDING REQUESTS (POSTS)

function sendCommand(command){
	var cmd = {
		value: command
	}
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/cmd", true);
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	xhr.send(JSON.stringify(cmd));
	setTimeout(updateLog,1000);
}

//DATA UPDATE REQUESTS (GET)

function updateLog(){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/log", true);
	xhr.responseType = 'json';
	xhr.onload = function() {
		var status = xhr.status;
		if (status === 200 || status === 304) {
			document.getElementById("log").innerHTML = "";
			var r = xhr.response;
			for(i = 0; i<r.length;i++){
				document.getElementById("log").innerHTML += "{"+r[i].user+"}:"+r[i].data+"\n";
			}
			setTimeout(updateLog,10000);
		}
	};
	xhr.send();
}

function verifyLogin(id,logado,deslogado){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/login/?id="+id, true);
	xhr.responseType = 'json';
	xhr.onload = function() {
		var status = xhr.status;
		if (status === 200 || status === 304) {
			if(xhr.response){
				logado();
			}else{
				deslogado();
			}
		}
	};
	xhr.send();
}

//DB RELATED REQUESTS
function login(name,password){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/login", true);
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	var user = {
		name,
		password
	}
	xhr.onload = function() {
		var status = xhr.status;
		if (status === 200 || status === 304) {
			alert(xhr.response);
		}
	};
	xhr.send(JSON.stringify(user));
}

function logout(){
	document.cookie="userId=0";
	alert("Deslogado com sucesso!");
}