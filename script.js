
let random = Math.floor((Math.random()*100)+1);

const submit = document.querySelector('#submit')
const userInput = document.querySelector('#guessField')
const prevGuesses = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const display = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.result')

const p = document.createElement('p')


let prevGuess = []
let numGuesses = 1
let playGame = true

if(playGame){
    submit.addEventListener('click',(x)=>{
        x.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    })
}

function validateGuess(guess){
    // ye validation karega ki value 1 aur 100 ke beech me hai ya nahi 
    if(isNaN(guess)){
        alert('Please enter a valid number ✖️')
    }
    else if(guess<1){
        alert('Please enter a number more than 1 ➕')
    }
    else if(guess>100){
        alert('Please enter a number less than 100 ➖')
    }
    else{
        prevGuess.push(guess)
        if(numGuesses === 10){
            displayGuess(guess)
            displayMessage(`Game Over, Random number was ${random} 😩`)
            endGame()
        }
        else{
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}



function checkGuess(guess){
    // ye check karega whether number is equal to random number 
    if(guess === random){
        displayMessage(`You guessed it right 💐🫡`)
        endGame()
    }
    else if(guess < random){
        displayMessage(`Number is TOOO low! 🫣`)
    }
    else if(guess > random){
        displayMessage(`Number is TOOO high! 🫣`)
    }    
}

function displayGuess(guess){
    // ye user input vale box ko clear karega 
    userInput.value = ''
    prevGuesses.innerHTML += `${guess} `;
    remaining.innerHTML = `${10 - numGuesses}`
    numGuesses++;
}

function displayMessage(message){
    // ye low or high message print karega!!
    display.innerHTML = `<h3 style="color: red;">${message}</h3>`
}

function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled','')
    p.classList.add('button')
    p.innerHTML = '<button id="newGame">Start new Game</button>';
    startOver.appendChild(p)
    playGame = false;
    newGame()
}

function newGame(){
    const newGameButton = document.querySelector('#newGame')
    newGameButton.style.background = 'linear-gradient(to right, #6a0dad, #a64bf4)';
    newGameButton.style.color = 'white';
    newGameButton.style.fontWeight = 'bold';
    newGameButton.style.padding = '10px 20px';
    newGameButton.style.borderRadius = '8px';
    newGameButton.style.border = 'none';
    newGameButton.style.cursor = 'pointer';
    newGameButton.style.boxShadow = '0 0 12px rgba(128, 0, 128, 0.4)';

    newGameButton.addEventListener('click',(e)=>{
        random = Math.floor((Math.random()*100)+1);
        prevGuess = []
        numGuesses = 1
        prevGuesses.innerHTML = '';
        remaining.innerHTML = `${11 - numGuesses}`
        userInput.removeAttribute('disabled') 
        startOver.removeChild(p)
        displayMessage('')
        playGame = true
    })
}
