var start1MButton = document.querySelector('#start-1-game');
var start15SButton = document.querySelector('#start-15-game');
var start30SButton = document.querySelector('#start-30-game');
var statistics = document.querySelector('#statistics');
var gameBoard = document.querySelector('#game-place');
var startTemplate = document.querySelector('.start-template');
var time = document.querySelector('#time');
var speedOutput = document.querySelector('#speed_count');
var speed;
var clicksCounterOutput = document.querySelector('#clicks_count');
var clicksCount = 0;
var levelOutput = document.querySelector('#level');
var level = ["frown","meh","smile","laugh"];
var commentOutput = document.querySelector('#comment');
var actualTime;
var circles = [];
var timeInterval;
var seconds;
var deviceOutput = document.querySelector('#device');
var device;
var variant;

start1MButton.addEventListener('touch', startOnTouch);
start15SButton.addEventListener('touch', startOnTouch);
start30SButton.addEventListener('touch', startOnTouch);

start1MButton.addEventListener('click', startOnClick);
start15SButton.addEventListener('click', startOnClick);
start30SButton.addEventListener('click', startOnClick);

function startOnClick(){
    variant = this;
    device = "click";
    startGame(variant);
}
function startOnTouch(){
    variant = this;
    device = "touch";
    startGame(variant);
}
function startGame(vrnt){
    if(vrnt == start1MButton){
        gameBoard.style.display = 'block';
        actualTime = 60;
        seconds = 60;
    }
    else if(vrnt == start30SButton){
        gameBoard.style.display = 'block';
        actualTime = 30;
        seconds = 30;
    }
    else if(vrnt == start15SButton){
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
        clicksCount += 1;
        console.log(clicksCount);
        gameBoard.innerHTML = '';
        genereteCircle();
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
    clearInterval(timeInterval);
    genereteStatistics();
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

function genereteStatistics(){
    document.querySelector('.game-statistics').style.display = 'block';
    clicksCounterOutput.innerHTML = clicksCount + " kliknięć";
    speed = ((clicksCount / seconds)*60);
    speedOutput.innerHTML = speed + " kliknięć/min";
    deviceOutput.innerHTML = device;
    var nrCom = Math.floor(Math.random()*4);
    if(speed < 30){
        levelOutput.innerHTML = '<i class="far fa-' + level[0] + '"></i>';
        commentOutput.innerHTML = commentsBad[nrCom];
    }
    else if(speed >= 30 && speed < 45){
        levelOutput.innerHTML = '<i class="far fa-' + level[1] + '"></i>';
        commentOutput.innerHTML = commentsNeutral[nrCom];
    }
    else if(speed >= 45 && speed < 60){
        levelOutput.innerHTML = '<i class="far fa-' + level[2] + '"></i>';
        commentOutput.innerHTML = commentsGood[nrCom];
    }
    else{
        levelOutput.innerHTML = '<i class="far fa-' + level[3] + '"></i>';
        commentOutput.innerHTML = commentsBest[nrCom];
    }
    document.querySelector('#home_button').addEventListener("touchstart", function(){
        commentOutput.innerHTML = "właśnie dotknięto ekranu";
    });
}

function randomParameters(par){
    switch(par){
        case 'top':
            return Math.floor((Math.random()*90)+5);
            break;
        case 'left': 
            return Math.floor((Math.random()*90)+5);
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
            if(window.innerWidth >= 900)
            return Math.floor((Math.random()*50)+10);
            else
            return Math.floor((Math.random()*70)+30);
    }
}
var commentsBad = [
    "Niestety, przed Tobą daleka droga aby móc powiedzieć, że jesteś prawdziwym bogiem refleksu",
    "Spokojnie, to że zasnąłeś w połowie testu nie oznacza, że nie możesz spróbować ponownie!",
    "Ćwicz, ćwicz, ćwicz i jeszcze raz ćwicz, a będzie z Ciebie mistrz",
    "Pamiętaj, ostatni będą pierwszymi! Po wielu wielu latach..."
];
var commentsNeutral = [
    "Widywałem gorszych od Ciebie ale mistrzostwo świata to to jeszcze nie jest",
    "Lepiej od mojego 2 letniego kuzyna ale do drugiego 7-letniego Ci jeszcze brakuje",
    "Przynajmniej nie jesteś najgorszy... Trochę praktyki, a będzie można pogratulować",
    "Rozpędzasz się, dogrzej jeszcze palce, wypij monsterka na koncentrację i lecisz dalej!"
];
var commentsGood = [
    "Mmm ktoś już tu jest trochę doświadczony! PRAWIE mistrzowski poziom",
    "Tylko parę kliknięć dzieliło Cię od zostania mistrzem... Może następnym razem!",
    "Depczesz klasie mistrzowskiej po piętach, oby tak dalej!",
    "Możesz już bez wstydu pochwalić się tym wynikiem przed mamą, GRATULACJE"
];
var commentsBest = [
    "Lepiej już być nie może oficjalny MISTRZU",
    "Położyłeś konkurencję na łopatki, światowa klasa",
    "No i to się nazywa refleks! Możesz śmiało mówić o sobie 'Szybki Bill'",
    "Osobiście jako twórca biję pokłony i gratuluję sukcesu!"
];
