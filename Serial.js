const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM3', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));
var Logs = [];

module.exports ={
	cmd:function(cmd,ip){
		if(ip!=null && cmd!=null){
			port.write(cmd, (err) => {
				if (err) {
					return console.log('Error on write: ' + err.message + ', from {'+ip+'}');
				}
				console.log('{'+ip+'}:', cmd);
				return true;
			});
		}else{
			console.log('User null, that shouldnt happen');
		}
	},
	log:function(Log){
	  Logs.push(Log);
	},
	Logs
}

port.on("open", () => {
  console.log('Serial port open');
});

parser.on('data', data =>{
  console.log('{A}:', data);
  var log = {
	  user:"Arduino",
	  data:data	  
  }
  Logs.push(log);
});
