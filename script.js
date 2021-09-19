var setSpeed = 2.5;
var bgScrollSpeed = setSpeed;
var gravity = 0.5;
var bird = document.querySelector('.bird');
var birdProperties = bird.getBoundingClientRect();
var background = document.querySelector('.background').getBoundingClientRect();
var score = document.querySelector('.score_val');
var hiscore = document.querySelector('.hiscore_val');
var message = document.querySelector('.message');
var hiscore_title = document.querySelector('.hiscore_title');
var score_title = document.querySelector('.score_title');
var game_level = document.querySelector('.level');
var levelContents = document.getElementsByClassName('levelContents');
var game_state = 'Start';
var currentScore = 0;	
var highScore = 0;
var initial_high_score = 0;
var game_has_started = false;
var initialMessage = document.querySelector('.message');
var restartMessage = document.querySelector('.restart');
initialMessage.onclick = function(){start_game()};
hiscore.innerHTML = '0';

levelContents[0].onclick = function(){setMinimumSpeed()};
function setMinimumSpeed(){
	setSpeed = 3;
	bgScrollSpeed = setSpeed;
	message.style.visibility = "visible";
	game_level.style.visibility = "hidden";	
	game_has_started = true;
}
levelContents[1].onclick = function(){setMedimumSpeed()};
function setMedimumSpeed(){
	setSpeed = 5;
	bgScrollSpeed = setSpeed;
	message.style.visibility = "visible";
	game_level.style.visibility = "hidden";
	game_has_started = true;
}
levelContents[2].onclick = function(){setMaximumSpeed()};
function setMaximumSpeed(){
	setSpeed = 10;
	bgScrollSpeed = setSpeed;
	message.style.visibility = "visible";
	game_level.style.visibility = "hidden";
	game_has_started = true;
}
score.style.visibility = "hidden";
hiscore.style.visibility = "hidden";
score_title.style.visibility = "hidden";
hiscore_title.style.visibility = "hidden";
window.onclick = runningGame();
function runningGame(){
	if(game_has_started == true ) {
		score.style.visibility = "visible";
		hiscore.style.visibility = "visible";
		score_title.style.visibility = "visible";
		hiscore_title.style.visibility = "visible";
		score.style.paddingRight = "6px";
		hiscore.style.paddingRight = "6px";
		score_title.style.paddingRight = "6px";
		hiscore_title.style.paddingRight = "6px";

		document.querySelectorAll('.pipes').forEach((e) => {
		e.remove();
		});
		bird.style.top = '40vh';
		game_state = 'Play';
		message.innerHTML = '';
		score_title.innerHTML = 'Score : ';
		score.innerHTML = '0';
		hiscore_title.innerHTML = 'Highscore : ';
		play();
	}
}

function start_game(){
	currentScore = 0;
	bird.style.top = '40vh';

	message.style.visibility = "hidden";
	document.addEventListener('click', (e) => {
		if (game_state != 'Play')
		{
			restartMessage.style.visibility = 'hidden';
			runningGame();
		}
	});
}
function play() {
	function move() {
		game_level.style.visibility = "hidden";
		if (game_state != 'Play') return;
		let pipes = document.querySelectorAll('.pipes');
		pipes.forEach((element) => {
			let pipeProperties = element.getBoundingClientRect();
			birdProperties = bird.getBoundingClientRect();

			if (pipeProperties.right <= 0) {
				element.remove();
			} 
			else {
				if ((birdProperties.left < pipeProperties.left + pipeProperties.width &&
				birdProperties.left + birdProperties.width > pipeProperties.left &&
				birdProperties.top < pipeProperties.top + pipeProperties.height &&
				birdProperties.top + birdProperties.height > pipeProperties.top) || (birdProperties.top <= 0 ||
					birdProperties.bottom >= background.bottom)){
					game_state = 'End';
					restartMessage.style.visibility = 'visible';
					message.style.left = '28vw';
					start_game();
					return;
				} 
				else {
				if (pipeProperties.right < birdProperties.left &&
					pipeProperties.right + bgScrollSpeed >= birdProperties.left &&
					element.increase_score == '1') {
						score.innerHTML = currentScore + 1;
						currentScore++;
						if(currentScore > highScore) {
							hiscore.innerHTML = currentScore; 
							highScore = currentScore;
						}
				}
				element.style.left = pipeProperties.left - bgScrollSpeed + 'px';
				}
			}
		});

		requestAnimationFrame(move);
	}	
	requestAnimationFrame(move);
	
	let bird_dy = 0;
	function apply_gravity(){
		if (game_state != 'Play') return;
		bird_dy = bird_dy + gravity;
		document.addEventListener('keydown', (e) => {
			if (e.key == 'ArrowUp' || e.key == ' ') {
				bird_dy = -7.6;
			}
		});
		document.addEventListener('click', (e) =>{
			bird_dy = -7.6;
		});
		bird.style.top = birdProperties.top + bird_dy + 'px';
		birdProperties = bird.getBoundingClientRect();
		requestAnimationFrame(apply_gravity);
	}
	requestAnimationFrame(apply_gravity);
	
	let pipe_seperation = 0;
	
	let pipe_gap = 35;
	function create_pipe() {
		if (game_state != 'Play') return;
		if (pipe_seperation > 115) {
		pipe_seperation = 0;
		
		let pipe_posi = Math.floor(Math.random() * 43) + 8;
		let pipes_inv = document.createElement('div');
		pipes_inv.className = 'pipes';
		pipes_inv.style.top = pipe_posi - 70 + 'vh';
		pipes_inv.style.left = '100vw';
		
		document.body.appendChild(pipes_inv);
		let pipes = document.createElement('div');
		pipes.className = 'pipes';
		pipes.style.top = pipe_posi + pipe_gap + 'vh';
		pipes.style.left = '100vw';
		pipes.increase_score = '1';
		document.body.appendChild(pipes);
		}
		pipe_seperation += setSpeed/4;
		requestAnimationFrame(create_pipe);
	}
	requestAnimationFrame(create_pipe);
}