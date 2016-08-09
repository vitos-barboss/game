window.onload = function() {
    var container = document.getElementsByClassName("container")[0];
    var scoreCount = document.getElementsByClassName("scoreCount")[0];
    var playerScore = document.getElementsByClassName("playerScore")[0];
    var gunman;
    var gunmanContainer;
    var positionObject;
    var delayFight = 1200;
    var fightMessage;
    var newGameBtn;
    var nextLevelBtn;
    var cashRegister = new Audio("./sfx/cashRegister.mp3");
    var winSound = new Audio("./sfx/win.mp3");
    var intro = new Audio("./sfx/intro.mp3");
    var death = new Audio("./sfx/death.mp3");
    var wait = new Audio("./sfx/wait.mp3");
    var fire = new Audio("./sfx/fire.mp3");
    var shot = new Audio("./sfx/shot.mp3");
    var inTime;
    var outTime;
    var dt = 0;
    var fireEvent;
    var lostTime;
    var startGameBtn;
    var level = 1;
    var levelCount;
    var totalScore = 0;
    var fight = false;
    var intervalKey;
    var timeNow;

    function scrCount() {
        dt = outTime - inTime;
        totalScore += Math.round(1 / dt * 10000);
        setTimeout(function() {
            cashRegister.play();
            playerScore.innerHTML = totalScore + "$";
        }, 1300);
    };

    function nextLevel() {
        nextLevelBtn = document.createElement("button");
        nextLevelBtn.className = "nextLevel";
        container.appendChild(nextLevelBtn);
        nextLevelBtn.innerHTML = "Next level >>";
        nextLevelBtn.addEventListener("mousedown", nextLevelGame);

    };

    function startGameNow() {
        container.style.boxShadow = "inset 0 0 300px  black";
        startGameBtn = document.createElement("button");
        startGameBtn.className = "startGame";
        container.appendChild(startGameBtn);
        startGameBtn.innerHTML = "START GAME";
        startGameBtn.addEventListener("mousedown", nextLevelGame);

    };
    startGameNow();

    function newGame() {
        newGameBtn = document.createElement("button");
        newGameBtn.className = "newGame";
        container.appendChild(newGameBtn);
        newGameBtn.innerHTML = "NEW GAME";
        newGameBtn.addEventListener("mousedown", function() {
            location.reload();
        });
    };
    var gunmanDiv;
    var Gunman = function(posStay, posReady, posWin, posLost, gunmanNum, windowWidth) {
        this.create = function() {
            gunmanContainer = document.createElement("div");
            gunmanContainer.className = "gunmanContainer";
            container.appendChild(gunmanContainer);
            gunmanDiv = document.createElement("div");
            gunmanDiv.className = gunmanNum;
            gunmanContainer.appendChild(gunmanDiv);
            gunmanContainer = document.getElementsByClassName("gunmanContainer")[0];
            gunman = document.getElementsByClassName(gunmanNum)[0];

        };
        this.create();
        this.moveToCenter = function() {
            gunmanContainer.style.right = "0";
            positionObject = gunmanContainer.getBoundingClientRect();
            gunmanContainer.style.right = "46%";
            gunman.style.visibility = "visible";
            intro.play();
        };
        this.gunmanStay = function() {
            gunman.style.animationIterationCount = "0";
            gunman.style.width = " " + windowWidth;
            gunman.style.backgroundPosition = posStay;
            wait.play();
        };
        this.lost = function() {
            fight = true;
            clearInterval(intervalKey);
            container.style.animation = "shake 0.1s";
            container.style.boxShadow = "inset 0 0 300px red";
            gunman.style.backgroundPosition = posLost;
            fightMessage = document.createElement("div");
            fightMessage.className = "fightMessage";
            container.appendChild(fightMessage);
            fightMessage.innerHTML = "GAME OVER";
            death.play();
            newGame();

        };
        this.win = function() {
            container.style.boxShadow = "inset 0 0 300px white";
            gunman.style.backgroundPosition = posWin;
            delayFight -= 150;
            if (level < 5) {
                fightMessage = document.createElement("div");
                fightMessage.className = "fightMessage";
                container.appendChild(fightMessage);
                fightMessage.innerHTML = "You win!";
                winSound.play();
                nextLevel();
                level++;
            } else {
                end();
            }
        };
        this.check = function() {
            if (dt < delayFight) {
                clearInterval(intervalKey);
                if (fight) return;
                this.win();
                newGame();
                scrCount();

            } else if (dt >= delayFight) {
                clearInterval(intervalKey);
                if (fight) return;
                this.lost();
                var foul = new Audio("./sfx/foul.mp3");
                foul.play();
                fight = true;
                clearInterval(intervalKey);
            };

        };

        function userFire() {
            gunman.removeEventListener("mousedown", fireEvent);
            shot.play();
            clearTimeout(lostTime);
            outTime = timeNow;
            this.check();


        };

        this.setT = function() {
            intervalKey = setInterval(function() {
                timeNow = new Date();
                scoreCount.innerHTML = +timeNow - inTime || 0;
            }, 20);
            gunman.style.backgroundPosition = posReady;
            fire.play();
            inTime = new Date().getTime();
            lostTime = setTimeout(proxy(this.lost, this), delayFight);
            fireEvent = userFire.bind(this);
            gunman.addEventListener("mousedown", fireEvent);
        };
        this.playRound = function() {
            this.moveToCenter();
            setTimeout(proxy(this.gunmanStay, this), 5000);
            setTimeout(proxy(this.setT, this), 6000);
        }
    };

    function proxy(fn, context) {
        var proxyArgs = [];
        for (var i = 2; i < arguments.length; i++) proxyArgs.push(arguments[i]);
        return function() {
            var args = [];
            for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
            return fn.apply(context || this, args.concat(proxyArgs));
        };
    };

    function end() {
        nextLevelBtn.style.display = "none";
        fightMessage = document.createElement("div");
        fightMessage.className = "fightMessage";
        container.appendChild(fightMessage);
        fightMessage.innerHTML = "MISSION COMPLETED!";
        fightMessage.style.transform = "3s";
        var mission = new Audio("./sfx/mission.mp3");
        mission.play();
    }

    function nextLevelGame() {
        startGameBtn.style.display = "none";
        container.style.boxShadow = "none";
        levelCount = document.getElementsByClassName("levelCount")[0];
        levelCount.innerHTML = "LEVEL " + level;
        scoreCount.innerHTML = 0;

        switch (level) {
            case 1:
                var gunmanFirst = new Gunman("-225px 0px", "-457px 0px", "-837px 0px", "-608px 0px", "gunman1", "75px");
                gunmanFirst.playRound();
                break;
            case 2:
                clearWindow();
                var gunmanSecond = new Gunman("-613px -158px", "-232px -158px", "-540px -158px", "-354px -158px", "gunman2", "61px");
                gunmanSecond.playRound();
                break;
            case 3:
                clearWindow();
                var gunmanThird = new Gunman("-389px -302px", "-184px -302px", "-463px -302px", "-320px -302px", "gunman3", "72px");
                gunmanThird.playRound();
                break;
            case 4:
                clearWindow();
                var gunmanFourth = new Gunman("-452px -530px", "-229px -530px", "-526px -530px", "-304px -530px", "gunman4", "72px");
                gunmanFourth.playRound();
                break;
            case 5:
                clearWindow();
                var gunmanFifth = new Gunman("619px -689px", "830px -689px", "546px -689px", "757px -689px", "gunman5", "71px");
                gunmanFifth.playRound();
                break;
        }

    };

    function clearWindow() {
        fight = false;
        newGameBtn.style.display = "none";
        nextLevelBtn.style.display = "none";
        container.removeChild(fightMessage);
        container.removeChild(gunmanContainer);
    }
};