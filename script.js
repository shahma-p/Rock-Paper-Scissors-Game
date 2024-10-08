let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};


updateScoreElement()
/*
if(!score){
score={
  wins: 0,
  losses: 0,
  ties: 0
}
}
*/
let isAutoPlaying = false;
let intervalId;

//const autoPlay = (){

//};
function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(()=> {
      const playerMove = pickComputerMove();
    playGame(playerMove);
    }, 1000);
    isAutoPlaying=true; 

  }else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
.addEventListener('click',() =>{
  playGame('rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click',() =>{
  playGame('paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click',() =>{
  playGame('scissors');
});

document.body.addEventListener('keydown',(event)=>{
 if(event.key ==='r'){
  playGame('rock');
 }else if(event.key ==='p'){
  playGame('paper');
 }else if(event.key ==='s'){
  playGame('scissors');
 }
});

function playGame(playerMove){
const computerMove = pickComputerMove();

let result='';
if(playerMove == 'Scissors'){
if (computerMove === 'rock') {
result='you lose';
} else if (computerMove == 'paper'){
  result='you win';
}else if (computerMove === 'Scissors'){
result='tie';
}
}else if(playerMove == 'paper'){
  if (computerMove === 'rock') {
  result='you win';
} else if (computerMove == 'paper'){
    result='tie';
}else if (computerMove === 'Scissors'){
  result='you lose';
}
}else if(playerMove == 'rock'){
if (computerMove === 'rock') {
  result='tie';
} else if (computerMove == 'paper'){
    result='you lose';
}else if (computerMove === 'Scissors'){
  result='you win';
}

}
if(result =='you win'){
score.wins += 1;
}else if(result =='you lose'){
score.losses += 1;
}else if(result =='tie'){
score.ties += 1;
}

localStorage.setItem('score',JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result')
.innerHTML= result;

document.querySelector('.js-moves').innerHTML
= `  you
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  computer` ;


}

function updateScoreElement(){
document.querySelector('.js-score')
  .innerHTML =`wins:${score.wins}, losses:${score.losses}, ties:${score.ties}`;
}

function pickComputerMove(){
const randomNumber= Math.random() ;

let computerMove = '';
  if(randomNumber >= 0 &&  randomNumber < 1 / 3)
  {
  computerMove='rock';
  } else if(randomNumber >= 1 / 3 &&  randomNumber < 2 / 3)
  {
    computerMove='paper';
  } else if (randomNumber >= 2 / 3 &&  randomNumber < 1)
  {
  computerMove='Scissors';
  }
return computerMove;
}