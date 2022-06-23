////////////////////////
// INITIATIVE SECTION //
////////////////////////
{
// var to store inititatives div
let inititaives = document.querySelector('#initiatives');

// var to store players div
let players = document.querySelector('#players');

// function to make new player slots
function makePlayerSlot() {
    // make new player slot div
    let playerSlot = document.createElement('div');
    playerSlot.setAttribute('class', 'player-slot');

    // add area to input players name
    let name = document.createElement('textarea');
    name.setAttribute('class', 'name');
    name.setAttribute('rows', '1');
    name.setAttribute('cols', '20');
    playerSlot.append(name);

    // add drop down menu for rolls
    let initRoll = document.createElement('select');
    initRoll.setAttribute('name', 'init-roll');
    initRoll.setAttribute('id', 'init-roll');
    for(let i = -4; i < 35; i++) { // -3 is smalles roll, 35 is highest
        let rollOption = document.createElement('option');
        rollOption.textContent = `${i + 1}`;
        rollOption.setAttribute('value', (i + 1));
        // set zero to default roll
        if(i == -1) {
            rollOption.setAttribute('selected', 'selected');
        }
        initRoll.append(rollOption);
    }
    playerSlot.append(initRoll);

    // append to players
    players.append(playerSlot);
}

// start with at least one player
makePlayerSlot();

// add functionality to buttons for adding/removing players
// variables to hold + and - buttons
let addPlayer = document.querySelector('.add-player');
let removePlayer = document.querySelector('.remove-player');
// add player
addPlayer.addEventListener('click', function() {
    makePlayerSlot();
})
// remove player
removePlayer.addEventListener('click', function() {
    // playerSlots is used to check the ammount of players so the bottom one gets removed
    let playerSlots = document.querySelectorAll('.player-slot');

    // make sure theres at least one player
    if(playerSlots.length > 1) {
        playerSlots[playerSlots.length - 1].remove();
    }
})

// make go button do something
let initGoButton = document.querySelector('.go-init');
let initResultDiv = document.querySelector('#result');
let firstPushInit = true;
initGoButton.addEventListener('click', function() {
    // clear play order unless this is the first time the button is pushed
    if(!firstPushInit) {
        document.querySelector('#play-order').remove();
    }
    firstPushInit = false;

    // add an ordered list to the result div
    let playOrder = document.createElement('ol');
    playOrder.setAttribute('id', 'play-order');

    // make a list of names from the text boxes
    let nameTextAreas = document.querySelectorAll('.name');
    let nameList = [];
    for(let i = 0; i < nameTextAreas.length; i++) {
        nameList.push(nameTextAreas[i].value);
    }

    // make a list of the roll values
    let rolls = document.querySelectorAll('#init-roll');
    let rollValues = [];
    for(let i = 0; i < rolls.length; i++) {
        rollValues.push(parseInt(rolls[i].value));
    }

    // sort array of names in order from highest to lowest using roll values
    for(let i = 1; i < rollValues.length; i++) {
        for(let c = 0; c < i; c++) {
            if(rollValues[i] > rollValues[c]) {
                [rollValues[i], rollValues[c]] = [rollValues[c], rollValues[i]];
                [nameList[i], nameList[c]] = [nameList[c], nameList[i]];
            }
        }
    }

    // use nameList to make a play order list
    for(let i = 0; i < nameList.length; i++) {
        let nameItem = document.createElement('li');
        nameItem.setAttribute('class', 'name-item');
        nameItem.textContent = nameList[i];
        playOrder.append(nameItem);
    }
    
    // add play order to result div
    initResultDiv.append(playOrder);
})
}

////////////////
// HP SECTION //
////////////////
{
// get enemy types div from index.html
let enemyTypes = document.querySelector('.enemy-types');

// function to make new enemy type
function newEnemyType() {
    // make new div for type
    let enemyType = document.createElement('div');
    enemyType.setAttribute('class', 'type');
    
    // get name
    let enemyName = document.createElement('h3');
    enemyName.textContent = window.prompt('Enter the name of the enemy: ');
    enemyName.style.fontWeight = 700; // bold
    enemyType.append(enemyName);
    
    // add a variable to remember how many enemies of this type there are
    let numberOfType = 1;

    // make new hp section (start with at least one)
    let hpDiv = document.createElement('div');
    hpDiv.setAttribute('class', 'hp-div');
    enemyType.append(hpDiv);
    makeNewHPSection(hpDiv, numberOfType, enemyName.textContent);

    // add buttons for additional enemies of the same type
    let subtractHelthBar = document.createElement('button');
    subtractHelthBar.setAttribute('class', 'subtract-health-bar');
    subtractHelthBar.textContent = '-';
    enemyType.append(subtractHelthBar);
    let addHealthBar = document.createElement('button');
    addHealthBar.setAttribute('class', 'add-health-bar');
    addHealthBar.textContent = '+';
    enemyType.append(addHealthBar);

    // add functionality to buttons
    subtractHelthBar.addEventListener('click', function() {
        if(numberOfType > 1) {
            numberOfType--;
            document.querySelectorAll('.hp-section')[document.querySelectorAll('.hp-section').length - 1].remove();
        }
    })
    addHealthBar.addEventListener('click', function() {
        numberOfType++;
        makeNewHPSection(hpDiv, numberOfType, enemyName.textContent);
    })

    // add section for notes about enemy
    let notesHeader = document.createElement('h4');
    notesHeader.textContent = `Notes on ${enemyName.textContent}:`;
    enemyType.append(notesHeader);
    let notesSection = document.createElement('textarea');
    enemyType.append(notesSection);

    // add button to remove enemy type
    let xButton = document.createElement('button');
    xButton.setAttribute('class', 'x-button');
    xButton.textContent = 'X';
    enemyType.append(xButton);
    xButton.addEventListener('click', function() {
        enemyType.remove();
    })

    // append to enemyTypes
    enemyTypes.append(enemyType);
}

// function to make a new hp section (used in newEnemyType)
function makeNewHPSection(hpDiv, numberOfType, enemyName) {
    // make a div for hp section
    let hpSection = document.createElement('div');
    hpSection.setAttribute('class', 'hp-section');
    
    // get max hp
    let hp = document.createElement('label');
    hp.setAttribute('for', 'hp-changer');
    // make sure maxHP is a number
    let isValid = true;
    let maxHP = 0;
    do {
        maxHP = Number(window.prompt('Enter max HP: '));
        console.log(maxHP);
        if(maxHP === 0 || maxHP < 0) {
            isValid = false;
            window.alert(`HP cannot be zero or negative.`);
        } else if (isNaN(maxHP)) {
            isValid = false;
            window.alert(`That is not a number.`);
        } else {
            isValid = true;
        }
    } while(!isValid);
    let currentHP = maxHP; // create var for current hp to be used later
    hp.textContent = (`${enemyName} ${numberOfType} HP: ${currentHP}/${maxHP} `);
    hpSection.append(hp);

    // make a minus button for hp
    let minusHPButton = document.createElement('button');
    minusHPButton.setAttribute('name', 'minus-button');
    minusHPButton.textContent = '-';
    hpSection.append(minusHPButton);

    // make a drop down for what to chang hp by
    let hpChangeSelection = document.createElement('select');
    hpChangeSelection.setAttribute('name', 'hp-change-selection');
    hpChangeSelection.setAttribute('id', 'hp-change-selection');
    // give set values to change hp by (1, 5, 10, 50, and 100)
    let i = 1;
    while(i !== 0) {
        let hpChangeOption = document.createElement('option');
        hpChangeOption.setAttribute('value', `${i}`);
        hpChangeOption.textContent = i;
        hpChangeSelection.append(hpChangeOption);
        switch(i) {
            case 1:
                i = 5;
                break;
            case 5:
                i = 10;
                break;
            case 10:
                i = 50;
                break;
            case 50:
                i = 100;
                break;
            case 100:
                i = 0;
                break;
        }
    }
    hpSection.append(hpChangeSelection);

    // make a plus button
    let plusHPButton = document.createElement('button');
    plusHPButton.setAttribute('name', 'plus-button');
    plusHPButton.textContent = '+';
    hpSection.append(plusHPButton);

    // add funcitonality to minus button
    minusHPButton.addEventListener('click', function() {
        // dont change if zero
        if(currentHP != 0) {
            currentHP -= parseInt(hpChangeSelection.value);
            if(currentHP < 0) {
                currentHP = 0;
            }
            hp.textContent = (`${enemyName} ${numberOfType} HP: ${currentHP}/${maxHP} `);
        }
    })

    // add functionality to plus button
    plusHPButton.addEventListener('click', function() {
        // there is no cap for hp, even if over max bc of temp hp points
        currentHP += parseInt(hpChangeSelection.value);
        hp.textContent = (`${enemyName} ${numberOfType} HP: ${currentHP}/${maxHP} `);
    })

    // append hp section to enemy
    hpDiv.append(hpSection);
}

// make the button to add new types work
let newEnemy = document.querySelector('.new-enemy-type-button');
newEnemy.addEventListener('click', function() {newEnemyType()});


}


/////////////////////////
// DICE ROLLER SECTION // 
/////////////////////////
{
// make drop down menus for the number of dice for each die
let diceOptions = document.querySelector('.dice-options');
for(let i = 0; i < 7; i++) { // there are 7 types of dice
    // make a div for each die
    let dieDiv = document.createElement('div');
    dieDiv.setAttribute('class', 'die-div');

    // figure out which die it is
    let nameOfDie = 'null';
    switch(i) {
        case 0:
            nameOfDie = 'd100';
            break;
        case 1:
            nameOfDie = 'd20';
            break;
        case 2:
            nameOfDie = 'd12';
            break;
        case 3:
            nameOfDie = 'd10';
            break;
        case 4:
            nameOfDie = 'd8';
            break;
        case 5:
            nameOfDie = 'd6';
            break;
        case 6:
            nameOfDie = 'd4';
            break;   
    }

    // make labels
    let dieLabel = document.createElement('label');
    dieLabel.setAttribute('class', 'die-label');
    dieLabel.setAttribute('for', 'number-of-dice');
    dieLabel.textContent = `${nameOfDie}: `;
    dieDiv.append(dieLabel);

    // make the drop down menu
    let numberOfDiceSelector = document.createElement('select');
    numberOfDiceSelector.setAttribute('name', 'number-of-dice');
    numberOfDiceSelector.setAttribute('id', 'number-of-dice');
    for(let c = 0; c <= 35; c++) {
        let numberOfDice = document.createElement('option');
        numberOfDice.setAttribute('value', `${c}`);
        numberOfDice.textContent = c;
        numberOfDiceSelector.append(numberOfDice);
    }

    // append drop down options to the list
    dieDiv.append(numberOfDiceSelector);

    // append die div to dice options
    diceOptions.append(dieDiv);
}


// function to calculate dice rolls individually that returns a string
let overallTotal = 0;
function diceRoller(dieName, numberOfRolls) {
    // set up variables for function
    let returnString = `${dieName}: `;
    let total = 0;
    let dieValue = parseInt(dieName.slice(1));

    // roll the number of dice passed to the function and build returnString
    for(let i = 0; i < numberOfRolls; i++) {
        // simulate die roll
        let rollResult = Math.floor(Math.random() * (dieValue + 1)) + 1;
        if(numberOfRolls > 1) {
            if(i < (numberOfRolls - 1)) {
                returnString += `${rollResult} + `;
            } else {
                returnString += `${rollResult} = `;
                returnString += ` ${total}`;
            }
        } else {
            returnString += rollResult.toString();
        }
        total += rollResult;
    }
    

    // add to overall total
    overallTotal += total;
    // return string
    return returnString;
}

// make go button do its job
let diceGoButton = document.querySelector('.go-dice');
let resultCounter = 0;
diceGoButton.addEventListener('click', function() {
    // add to resultCounter for every new result
    resultCounter++;

    // make a div for the results
    let diceResultDiv = document.createElement('div'); // make a div for results
    diceResultDiv.setAttribute('class', 'dice-results');
    diceResultDiv.setAttribute('id', `result-${resultCounter}`);

    // add a button to delete the results
    let xButton = document.createElement('button');
    xButton.setAttribute('class', 'x-button');
    xButton.setAttribute('id', `${resultCounter}`);
    xButton.textContent = 'X';
    diceResultDiv.append(xButton);

    // give xButton a function
    xButton.addEventListener('click', function() {
        document.querySelector(`#result-${xButton.id}`).remove();
    })

    // reset overall total
    overallTotal = 0;

    // make array of die names and how many rolls the user wants for each
    let dieNamesList = ['d100', 'd20', 'd12', 'd10', 'd8', 'd6', 'd4'];
    let numberOfRollsSelectors = document.querySelectorAll('#number-of-dice');
    // build array of number of rolls values
    let numberOfRollsList = [];
    for(let i = 0; i < dieNamesList.length; i++) {
        numberOfRollsList[i] = parseInt(numberOfRollsSelectors[i].value);
    }

    // get rid of zeros
    // find all of the zero elements to associate names with rolls
    for(let i = 0; i < dieNamesList.length; i++) {
        if(numberOfRollsList[i] === 0) {
            dieNamesList[i] = '0'; // makes it easier to delete them
        }
    }
    // remove zero elements
    dieNamesList = dieNamesList.filter(die => die != '0');
    numberOfRollsList = numberOfRollsList.filter(roll => roll != 0);

    // print individual results
    for(let i = 0; i < dieNamesList.length; i++) {
        // make a paragraph for each rolled die
        let dieResultPara = document.createElement('p');
        dieResultPara.setAttribute('class', 'die-result');
        dieResultPara.textContent = diceRoller(dieNamesList[i], numberOfRollsList[i]);
        diceResultDiv.append(dieResultPara);
    }

    // print grand total
    let totalParagraph = document.createElement('p');
    totalParagraph.textContent = `Total: ${overallTotal}`;
    totalParagraph.style.fontWeight = 700;
    diceResultDiv.append(totalParagraph);
    
    // append div to dice roller
    document.querySelector('#dice-roller').append(diceResultDiv);
})

}
