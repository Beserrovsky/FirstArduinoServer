//AUXILIARY FUNCTIONS

function off(bit){
	bit.setAttribute("value",0);
	bit.setAttribute("class","bitoff");
}
function on(bit){
	bit.setAttribute("value",1);
	bit.setAttribute("class","biton");
}
function clean(){
	var rows = document.getElementsByClassName("byte");
	for(i = 0; i<rows.length;i++){
		var bits = rows[i].children;
		for(is=0;is<bits.length;is++){
			var bit = bits[is].children[0];
			off(bit);
		}
	}
}
//GRADE FUNCTIONS

function createGrade(){
	var table = document.createElement("TABLE");
	table.setAttribute("id", "gradeTable");
	table.setAttribute("class","grade");
	document.getElementById("grade").appendChild(table);
	for(var i=0;i<8;i++){
		var row = document.createElement("TR");
		row.setAttribute("id", "row"+1);
		row.setAttribute("class","byte");
		table.appendChild(row);
		for(var is=0;is<8;is++){
			var cell = document.createElement("TD");
			cell.setAttribute("class","cell");
			var bit = document.createElement("DIV");
			bit.setAttribute("class","bitoff");
			bit.setAttribute("value",0);
			bit.addEventListener("click",function(e){
				if(e.target.getAttribute("value")==0){
					on(e.target);
				}else{
					off(e.target);
				}
			},false);
			cell.appendChild(bit);
			row.appendChild(cell);
		}
	}
}
//GRADE DATA SENDING FUNCTIONS

function getGradeDots(){
	var dots = '';
	var command = '';
	var rows = document.getElementsByClassName("byte");
	for(i = 0; i<rows.length;i++){
		var bits = rows[i].children;
		var row ='';
		var currentByte = 0;
		for(is=0;is<bits.length;is++){
			var bit = bits[is].children[0].getAttribute("value");
			currentByte += bit=='1'? 1<<is:0;
			row+=bit;
		}
		dots+= String.fromCharCode(currentByte);
		command+="lc.setRow(0,"+i+",B"+row+");\n";
	}
	console.log(command);
	return dots;
}
