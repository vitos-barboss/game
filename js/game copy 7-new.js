(function () {
    var container = document.getElementsByClassName("container")[0];
    var gunman = document.getElementsByClassName("gunman")[0];
    var gunmanContainer = document.getElementsByClassName("gunmanContainer")[0];
    var scoreCount = document.getElementsByClassName("scoreCount")[0];
    var positionObject;
    var delayFight = 1000;
    var fightMessage;
    var newGameBtn;
    var nextLevelBtn;
    var intro = new Audio("intro.mp3");
    var winSound = new Audio("win.mp3");
    var wait = new Audio("wait.mp3");
    var fire = new Audio("fire.mp3");
    var shot = new Audio("shot.mp3");
    // var shotFoul = new Audio("shot-foul.mp3");
    var death = new Audio("death.mp3");
    var inTime;
    var outTime;
    var dt = 0;

    function scrCount() {
        dt = outTime - inTime;
        scoreCount.innerHTML = dt/1000 || 0;
    };
    function nextLevel() {
        nextLevelBtn = document.createElement("button");
        nextLevelBtn.className = "nextLevel";
        container.appendChild(nextLevelBtn);
        nextLevelBtn.innerHTML = "Next level >>";
        nextLevelBtn.addEventListener("mousedown", nextLevelGame);

    };
    function newGame() {
        newGameBtn = document.createElement("button");
        newGameBtn.className = "newGame";
        container.appendChild(newGameBtn);
        newGameBtn.innerHTML = "NEW GAME";
        newGameBtn.addEventListener("mousedown", function () {
            location.reload();
        });
    };
    
    var Gunman = function (moveRight,posStay,posReady,posWin,posLost) {
        this.moveToCenter = function () {
            positionObject = gunmanContainer.getBoundingClientRect();
            gunmanContainer.style.right = moveRight;
            intro.play();
        },
        this.gunmanStay = function () {
            gunman.style.backgroundPosition = posStay;
            wait.play();
        },

        this.playRound = function () {
            this.moveToCenter();
            setTimeout(this.gunmanStay, 5000);

            setTimeout(function () {
                gunman.style.backgroundPosition = posReady;
                fire.play();
                canFire();
            }, 6000);

            function canFire() {
                inTime = new Date().getTime();
                var lostTime = setTimeout(function () {
                    // this.lost();
                    container.style.animation = "shake 0.1s";
                    container.style.boxShadow = "inset 0 0 300px red";
                    gunman.style.backgroundPosition = posLost;
                    fightMessage = document.createElement("div");
                    fightMessage.className = "fightMessage";
                    container.appendChild(fightMessage);
                    fightMessage.innerHTML = "GAME OVER";
                    death.play();
                    scrCount();
                    newGame();
                    // this.lost();

                },delayFight);
                function userFire() {
                    clearTimeout(lostTime);
                    outTime = new Date().getTime();
                    console.log(dt);
                    if(check) {
                        shot.play();
                        check();
                    }
                };
                function check() {
                    if(dt < delayFight) {
                        this.win = function() {
                            container.style.boxShadow = "inset 0 0 300px white";
                            gunman.style.backgroundPosition = posWin;

                            fightMessage = document.createElement("div");
                            fightMessage.className = "fightMessage";
                            container.appendChild(fightMessage);
                            fightMessage.innerHTML = "You win!";
                            winSound.play();
                        };

                        setTimeout(function () {
                            nextLevel();
                            newGame();
                        }, 1500);
                        scrCount();
                        this.win();
                        check = null;
                        gunman.removeEventListener("mousedown", check);
                    } else if(dt >= delayFight){
                        this.lost = function () {
                            container.style.animation = "shake 0.1s";
                            container.style.boxShadow = "inset 0 0 300px red";
                            gunman.style.backgroundPosition = posLost;
                            fightMessage = document.createElement("div");
                            fightMessage.className = "fightMessage";
                            container.appendChild(fightMessage);
                            fightMessage.innerHTML = "GAME OVER";
                            death.play();
                            scrCount();
                            newGame();
                        };
                        this.lost();
                        var foul = new Audio("foul.mp3");
                        foul.play();
                        check = null;
                    }
                };
                gunman.addEventListener("mousedown", userFire);

            };
        }
            
    };

    var gunmanFirst = new Gunman("47%", "-225px 0px","-457px 0px","-837px 0px","-608px 0px");
    gunmanFirst.playRound();

    // function nextLevelGame() {
    //     var gunmanSecond = new Gunman("47%", "-225px 0px","-457px 0px","-837px 0px","-608px 0px");
    //     gunmanSecond.playRound();
    // }




})();





