var start1MButton = document.querySelector('#start-1-game');
var start15SButton = document.querySelector('#start-15-game');
var start30SButton = document.querySelector('#start-30-game');
var statistics = document.querySelector('#statistics');
var gameBoard = document.querySelector('#game-place');
var startTemplate = document.querySelector('.start-template');
var time = document.querySelector('#time');
//var speed = document.querySelector('#speed');
//var record = document.querySelector('#record');
var actualTime;
var circles = [];
var timeInterval;
var seconds;

start1MButton.addEventListener('click', startGame);
start15SButton.addEventListener('click', startGame);
start30SButton.addEventListener('click', startGame);

function startGame(){
    if(this == start1MButton){
        gameBoard.style.display = 'block';
        actualTime = 60;
        seconds = 60;
    }
    else if(this == start30SButton){
        gameBoard.style.display = 'block';
        actualTime = 30;
        seconds = 30;
    }
    else if(this == start15SButton){
        gameBoard.style.display = 'block';
        actualTime = 15;
        seconds = 15;
    }
    startTemplate.style.display = 'none';
    setTimeout(genereteCircle,1000);
    timeInterval = setInterval(startTime,1000);
}

function genereteCircle(){
    circles.push({
        top: ''+randomParameters('top')+'%',
        left: ''+randomParameters('left')+'%',
        color: 'rgb('+randomParameters('r')+','+randomParameters('g')+','+randomParameters('b')+')',
        size: ''+randomParameters('size')+'px'
    });
    gameBoard.innerHTML += '<div class="circle circle'+circles.length+'"></div>';
    var newCircle = document.querySelector(".circle"+circles.length+"");
    newCircle.style.top = circles[circles.length-1].top;
    newCircle.style.left = circles[circles.length-1].left;
    newCircle.style.backgroundColor = circles[circles.length-1].color;
    newCircle.style.width = circles[circles.length-1].size;
    newCircle.style.height = circles[circles.length-1].size;
    newCircle.addEventListener('click',function(){
        gameBoard.innerHTML = '';
        genereteCircle();
////            var counter = circles.length / actualTime;
////            speed.innerHTML = counter + ' clicks/s';
//            if(counter > actualRecord){
//                actualRecord = counter;
//            }
//            record.innerHTML = actualRecord + " clicks/s is your best!";
    });
}

function startTime(){
    if(actualTime >= 0){
        time.innerHTML = actualTime + ' s';
        actualTime--;
    }
    else {
        endGame();
    }
}

function endGame(){
    gameBoard.innerHTML = ' ';
    console.log(circles.length);
    clearInterval(timeInterval);
    statistics.innerHTML = (circles.length / seconds) + 'clicks/s, congratulations!';
    for(var i = 0; i < circles.length; i++){
        gameBoard.innerHTML += '<div class="circle circle'+i+'"></div>';
        var newCircle = document.querySelector(".circle"+i+"");
        newCircle.style.top = circles[i].top;
        newCircle.style.left = circles[i].left;
        newCircle.style.backgroundColor = circles[i].color;
        newCircle.style.width = circles[i].size;
        newCircle.style.height = circles[i].size;
    }
}

function randomParameters(par){
    switch(par){
        case 'top':
            return Math.floor((Math.random()*100)+1);
            break;
        case 'left': 
            return Math.floor((Math.random()*100)+1);
            break;
        case 'r': 
            return Math.floor((Math.random()*255)+10);
            break;
        case 'g':
            return Math.floor((Math.random()*255)+10);
            break;
        case 'b':
            return Math.floor((Math.random()*255)+10);
            break;
        case 'size':
            return Math.floor((Math.random()*50)+10);
    }
}

