//Variables to store most money won and rolls
var mostWon = 0;
var mostRolls = 0;

function clearErrors() {
    for (var loopCounter = 0; 
        loopCounter < document.forms["inputForm"].elements.length; 
        loopCounter++) {
        if (document.forms["inputForm"].elements[loopCounter]
           .parentElement.className.indexOf("has-") != -1) {
            
            document.forms["inputForm"].elements[loopCounter]
               .parentElement.className = "form-group";
        }
    }    
} 

/*
This is the main function. It takes a starting bet and will simulate rolling
dice until the user runs out of money.
*/
function playGame() {
	clearErrors();
	var startingBet = document.forms["inputForm"]["startingBet"].value;
	var numRolls = 0;
	var gameMoney = 0;
	var roll1 = 0;
	var roll2 = 0;
	
	//Check to see if startingBet is a number
	if (startingBet == "" || isNaN(startingBet)) {
        alert("Starting Bet must be filled in with a number.");
        document.forms["inputForm"]["startingBet"]
           .parentElement.className = "form-group has-error";
        document.forms["inputForm"]["startingBet"].focus();
        return false;
    }
	
	//Check to see if startingBet is a valid bet
	if (startingBet < 0) {
		alert("Enter a valid bet");
		return false;
	} else { 
		//startingBet is greater than 0 so now we can simulate all the rolls
		//sets money being played with while keeping starting seperate
		/*
		I was getting errors where sometimes gameMoney would be treated like 
		a string and instead of 1+4=5, I would get "1"+"4"="14. Using 
		Number() function to force gameMoney to be a number
		*/
		gameMoney = Number(startingBet);
		//makes sure roll count accurate between games
		numRolls = 0; 
		while (gameMoney > 0) {
			//increments numRolls
			numRolls++; 
			roll1 = rollDice();
			roll2 = rollDice();
			//checks for winning condition
			if (roll1 + roll2 === 7) { 
				gameMoney = gameMoney + 4;
				//checks for higher winning and updates vars
				if (gameMoney > mostWon) { 
					mostWon = gameMoney;
					mostRolls = numRolls;
				}
			} else {
				gameMoney = gameMoney - 1;
			}
		}
		
	}
	showTable();
	//this section writes the results to the table
	document.getElementById("startBet").innerHTML = "$" + startingBet + ".00";
	document.getElementById("numRolls").innerHTML = numRolls;
	document.getElementById("mostWon").innerHTML = "$" + mostWon + ".00";
	document.getElementById("mostRolls").innerHTML = mostRolls;
	document.getElementById("submitButton").innerHTML = "Play Again";
	return false;
}

//dice simulation, returns a number between 1 and 6
function rollDice() {
    return Math.ceil(Math.random() * (1 + 6 - 1));
}

//function not used, was used for control testing
function hideResults () {
	//alert("hiding form");
	var x = document.getElementById("results");
	x.style.display = "none";
	return false;
}

//funtion used to 
function showTable () {
	var x = document.getElementById("results");
	x.style.display = "block";
	return false;
}