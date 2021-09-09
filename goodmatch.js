//Get input from the user
// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
   
// readline.question('Enter players: ', userInput => {
  	
//   	let regex = /^[a-zA-Z ]*$/;
//   	let matchUp = (userInput.trim()).toLowerCase().split(' ');
//   	// regex.test(userInput.trim()) && 
//   	if(regex.test(userInput.trim()) && matchUp.length == 3 && matchUp[1].toLowerCase() == "matches"){
//   		findMatch(userInput.toLowerCase());
//   	}else{
//   		console.log("Please enter valid input:\n{Name1} matches {Name2}");
//   	}
     
//     readline.close();
// })
  
function main(){
	//console.log(readCSV("./players.csv"));

	let players = readCSV("./players.csv");
	let males = players[0].sort();
	let females = players[1].sort();
	let results = new Map();

	for(let i = 0; i < males.length-1; i++){
		for(let j = 0; j < females.length-1; j++){
			// results.push(match([males[i], females[j]]).slice(0,-2).trim());
			let score = match([males[i], females[j]]).slice(-2,).trim();
			let matchUp = match([males[i], females[j]]).slice(0,-2).trim();
			results.set(parseInt(score), matchUp);
		}
	}
	results = new Map([...results.entries()].sort().reverse());
	// console.log(results);

	let resultsArray = Array.from(results.values());
	console.log(resultsArray);
	
	let fs = require('fs');
	const writeStream = fs.createWriteStream('output.txt');
	const pathName = writeStream.path;

	resultsArray.forEach(value => writeStream.write(`${value}\n`));

	// handle errors on the write process
	writeStream.on('error', (err) => {
	    console.error(`There is an error writing the file ${pathName} => ${err}`)
	});

	// close the stream
	writeStream.end();
}

main();

//Read csv file and return gender grouped arrays 
function readCSV(filename){
	let fs = require('fs');
	let content = fs.readFileSync(filename).toString();
	let players = content.split("\r\n");
	let males = [];
	let females = [];
	let regex = /^[a-zA-Z ]*$/;

	for(let i = 0; i < players.length; i++){
		let gender = players[i].trim().slice(-1);
		player = players[i].slice(0,-1).trim().replace(/,/g, '').toLowerCase();
		
		// console.log(gender);
		if(regex.test(player) && gender === "m" && !males.includes(player)){
			males.push(player);
		}else if(regex.test(player) && gender === "f" && !females.includes(player)){
			females.push(player);
		}
	}
	// console.log(females);
	// console.log(males)
	return([males,females]);
}

// console.log(readCSV("./players.csv"));
  
//Reduce array to a two digit number
function reduceArray(valueArray){
    let halfWay = 0;

    //Base Case: return two digits that are less than 10
    if(valueArray.length == 2 && valueArray[0] < 10 && valueArray[1] < 10){
    	return valueArray[0].toString()+valueArray[1].toString(); 
	    // return valueArray.length;
	}else if(valueArray.length < 2){
		return valueArray[0].toString();
	}

	//Find the "halfway" mark
	if(valueArray.length%2 === 0){
		halfWay = valueArray.length/2;
	}else{
		halfWay = Math.floor(valueArray.length/2)+1;
	}

	// console.log("Halfway: %d", halfWay);
	// console.log("Original: ", valueArray);

	let tempArray = [];
	
	//Split arrays with the length of two to single digits
	if(valueArray.length == 2){
		//console.log((valueArray.length == 2 && valueArray[0] < 10 && valueArray[1] < 10));
		let d = valueArray[0].toString() + valueArray[1].toString();
		let s = d.split("");
		for(let a = 0; a < s.length; a++){
			valueArray[a] = parseInt(s[a]);
		}
		// console.log("New Original: ",valueArray)
	}
	
	for(let l = 0, r = valueArray.length-1; l < halfWay, r > halfWay-1; l++, r--){
		let temp = 0;
		// console.log(valueArray.length);
		// console.log("l: %d, r: %d", l,r);
		temp = valueArray[l] + valueArray[r];
		tempArray.push(temp);
		
		//Get middle value when the length is odd
		if(valueArray.length%2 !== 0 && l+1 == r-1 && r != l){
			temp = valueArray[l];
			tempArray.push(valueArray[l+1]);
			return reduceArray(tempArray);
		}
		
		// console.log("New Array: ", tempArray);
	}

	return reduceArray(tempArray);
}

function match(players){
	let player1 = players[0];
    let player2 = players[1];
    let letters = (players[0] + "matches" + players[1]).split('');

    let freq =  new Map();

    //Iterate throught letters and make each character a key of the freq map 
    for(let i=0; i < letters.length; i++){
        //If the character is in the map increment value
        if(freq.has(letters[i])){
            freq.set(letters[i],parseInt(freq.get(letters[i]))+1);
        } else{
        //If it's not create a new pair
            freq.set(letters[i],1);
        }
    }

    let valueArray = Array.from(freq.values());
    // console.log(valueArray);
    // console.log("Value Array Length = %d",valueArray.length);
    // console.log(reduceArray(valueArray));

    //Calculate the score
    let score = reduceArray(valueArray);

    if(score >= 80){
    	return `${player1} matches ${player2} ${score}\%, good match! ${score}`;
    }else{
    	return `${player1} matches ${player2} ${score}\% ${score}`;
    }
}

// match(["Jack", "Jill"]);