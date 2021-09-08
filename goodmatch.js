const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
   
  readline.question('Enter players: ', players => {
    findMatch(players);  
    readline.close();
  })

function findMatch(players){
    let playersArray = (players.replace(/\s+/g, '')).split('');
    console.log(playersArray);
    let freq =  new Map();
    for(let i=0; i < playersArray.length; i++){
        if(freq.has(playersArray[i])){
            freq.set(playersArray[i],parseInt(freq.get(playersArray[i]))+1);
        } else{
            freq.set(playersArray[i],1);
        }

        // console.log(playersArray[i]);
        //Player1 matches Player2
    }

    let valueArray = Array.from(freq.values());

    // for(let a = 0; a < freq.length; a++){
    //     console.log(freq[a]);
    // }
    console.log(valueArray);
    console.log(freq.values());
}