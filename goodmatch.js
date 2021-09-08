//Get input from the user
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
   
  readline.question('Enter players: ', players => {
    findMatch(players); 
    readline.close();
  })

  
//Reduce array to a two digit number
function reduceArray(valueArray){
    let halfWay = 0;

    if(valueArray.length == 2 && valueArray[0] < 10 && valueArray[1] < 10){
    	return valueArray[0].toString()+valueArray[1].toString(); 
	    // return valueArray.length;
	}else if(valueArray.length < 2){
		return valueArray[0];
	}

	if(valueArray.length%2 === 0){
		halfWay = valueArray.length/2;
	}else{
		halfWay = Math.floor(valueArray.length/2)+1;
	}

	console.log("Halfway: %d", halfWay);
	console.log("Original: ", valueArray);

	let tempArray = [];
	
	if(valueArray.length == 2){
		let d = valueArray[0].toString() + valueArray[1].toString();
		let s = d.split("");
		for(let a = 0; a < s.length; a++){
			valueArray[a] = parseInt(s[a]);
		}
	}
	
	for(let l = 0, r = valueArray.length-1; l < halfWay, r > halfWay-1; l++, r--){
		let temp = 0;
		console.log("l: %d, r: %d", l,r);
		temp = valueArray[l] + valueArray[r];
		tempArray.push(temp);
		
		if(valueArray%2 !== 0 && l+1 == r-1){
			temp = valueArray[l];
			tempArray.push(valueArray[l+1]);
		}
		
		console.log("New Array: ", tempArray);
	}

	return reduceArray(tempArray);
}

function findMatch(players){

    let player1 = players.split(' ')[0];
    let player2 = players.split(' ')[2];

    //Remove white spaces and split the string to an array
    let playersArray = (players.replace(/\s+/g, '')).split('');
    console.log(playersArray);
    let freq =  new Map();

    //Iterate throught playersArray and make each character a key of the freq map 
    for(let i=0; i < playersArray.length; i++){
        //If the character is in the map increment value
        if(freq.has(playersArray[i])){
            freq.set(playersArray[i],parseInt(freq.get(playersArray[i]))+1);
        } else{
        //If it's not create a new pair
            freq.set(playersArray[i],1);
        }

        // console.log(playersArray[i]);
        //Player1 matches Player2
    }

    let valueArray = Array.from(freq.values());
    console.log(valueArray);
    console.log("Value Array Length = %d",valueArray.length);
    // console.log(reduceArray(valueArray));

    let score = reduceArray(valueArray);
    if(score >= 80){
    	console.log("%s matches %s %d\%, good match!", player1, player2, score);
    }else{
    	console.log("%s matches %s %d\%", player1, player2, score);
    }
}

// let scoreboard = 
// let twoDigits = reduceArray(valueArray);
// console.log(twoDigits)