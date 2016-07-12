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
    var introMichael = new Audio("michael.mp3");
    var wait = new Audio("wait.mp3");
    var fire = new Audio("fire.mp3");
    var shot = new Audio("shot.mp3");
    // var shotFoul = new Audio("shot-foul.mp3");
    var death = new Audio("death.mp3");
    var inTime;
    var outTime;
    var dt = 0;
    var scoreGunman;
    var scoreYou;

    function moveToCenter() {
        positionObject = gunmanContainer.getBoundingClientRect();
        gunmanContainer.style.right = "47%";
         intro.play();

    };

    function gunmanStay() {
        gunman.style.backgroundPosition = "-225px 0px";
        wait.play();
    };
    
    function gunmanReady() {
        gunman.style.backgroundPosition = "-457px 0px";
        fire.play();

    };

    function win() {
        container.style.boxShadow = "inset 0 0 300px white";
        gunman.style.backgroundPosition = "-837px 0px";
        var win = new Audio("win.mp3");
        fightMessage = document.createElement("div");
        fightMessage.className = "fightMessage";
        container.appendChild(fightMessage);
        fightMessage.innerHTML = "You win!";
        win.play();

        setTimeout(function () {
            nextLevel();
            newGame();
        }, 1500);

    };

    function lost() {
        container.style.animation = "shake 0.1s";
        container.style.boxShadow = "inset 0 0 300px red";
        gunman.style.backgroundPosition = "-608px 0px";
        fightMessage = document.createElement("div");
        fightMessage.className = "fightMessage";
        container.appendChild(fightMessage);
        fightMessage.innerHTML = "GAME OVER";
        death.play();
        newGame();

    };

    function scrCount() {
        setInterval(function () {
            scoreCount.innerHTML = dt;

        },10)
    }

    function nextLevel() {
        nextLevelBtn = document.createElement("button");
        nextLevelBtn.className = "nextLevel";
        container.appendChild(nextLevelBtn);
        nextLevelBtn.innerHTML = "Next level >>";
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

    function playRound() {
        moveToCenter();
        setTimeout(gunmanStay, 5000);

        setTimeout(function () {
            gunmanReady();
            canFire();
        }, 6000);

        function canFire() {
            inTime = new Date().getTime();
            scrCount();
            var lostTime = setTimeout(function () {
                lost();
            },1000);
            function userFire() {
                clearTimeout(lostTime);
                outTime = new Date().getTime();
                dt = outTime - inTime;
                console.log(dt);
                if(check) {
                    shot.play();
                    check();
                }
            };
            function check() {
                if(dt < delayFight) {
                    win();
                    check = null;
                    gunman.removeEventListener("mousedown", check);
                } else if(dt >= delayFight){
                     lost();
                    var foul = new Audio("foul.mp3");
                    foul.play();

                    check = null;
                }
            };
            gunman.addEventListener("mousedown", userFire);

        };

    };

    playRound();





})();





