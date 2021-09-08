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
    let tempArray = [];

	if(myArray.length%2 === 0){
		halfWay = myArray.length/2;
	}else{
		halfWay = Math.floor(myArray.length/2)+1;
	}

	console.log("Halfway: %d", halfWay);
	console.log("Original: ", myArray);

	for(let l = 0, r = myArray.length-1; l < halfWay, r > halfWay-1; l++, r--){
		let temp = 0;
		console.log("l: %d, r: %d", l,r);
		temp = myArray[l] + myArray[r];
		tempArray.push(temp);
		
		if(myArray%2 !== 0 && l+1 == r-1){
			temp = myArray[l];
			tempArray.push(myArray[l+1]);
		}
		
		console.log("New Array: ", tempArray);
	}
}

function findMatch(players){
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
    reduceArray(valueArray);
}