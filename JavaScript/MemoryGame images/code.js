//functie de sortare la care ii dam ca si comparator un numar care poate fi atat pozitiv cat si negativ => shuffle
var activeNow = 0;
var lastItemClicked = 0;
var timeToFlip;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function createMatrix(lines,columns){
	//Ca sa asignez fiecarei celule un numar de aici. am 4*4 matrice => 16 celule => 8 dubluri
	var array =[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
	//le amestecam si scoatem pe rand cate un numar cand le asignam
	shuffle(array);
	
	var canvas = document.getElementById("canvas");

	var table = document.createElement("TABLE");
	table.setAttribute("id","table");

	for(var i = 0;i < lines; i++){
		var tr = document.createElement("TR");
		for(var j = 0; j < columns; j++)
		{
			var td = document.createElement("TD");
			var idTd = String(i)+String(j);
			td.setAttribute("id",idTd);
			
			var img = document.createElement("img");
			img.src = String(array.pop())+".jpg";
			img.setAttribute("class","img2");


			td.appendChild(img);
			td.onclick= function(){flipCard(this.id);};

			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	console.log(table);
	canvas.appendChild(table);
}

function flipCard(id){
	//daca nu am niciun card intors ma intereseaza sa intorc unul,sa-l setez sa se intoarca singur inapoi si sa ii tin minte valoarea ca sa-l compar cu al doilea
	if(activeNow==0){
		var cell = document.getElementById(id); 
		cell.children[0].setAttribute("class","img1");
		activeNow++;
		//tin minte id-ul ca sa le compar valorile cand avem 2 intoarse
		lastItemClicked = id;
		console.log("Ultimul id salvat: " + lastItemClicked);
		//tin minte pentru anularea executiei daca trebuie
		timeToFlip = setTimeout(function() {flipBack(id)},2000);
	}//daca am doar un card intors il intorc pe al doilea
	else if(activeNow == 1){
		var cell = document.getElementById(id);
		var lastCell = document.getElementById(lastItemClicked);
		cell.children[0].setAttribute("class","img1");
		activeNow++;
		console.log("Am ajuns in cazul cu 2 carti. last cell: " + lastCell.innerHTML + " current cell: " + cell.innerHTML);
		//verific daca au aceleasi valori, daca da, anulez executia functiei flipback pentru primul card, ca sa ramana ambele neintoarse
		if(cell.children[0].src == lastCell.children[0].src && cell.id != lastCell.id)
			{
				clearTimeout(timeToFlip);
				activeNow =0;
			}
		else
			setTimeout(function() {flipBack(cell.id)},1500);
		
		lastCell=0;
	}
}

function flipBack(id){
	var cell = document.getElementById(id);
	cell.children[0].setAttribute("class","img2");	
	activeNow--;

}


