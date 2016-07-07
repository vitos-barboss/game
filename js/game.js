(function () {
    var container = document.getElementsByClassName("container")[0];
    var gunman = document.getElementsByClassName("gunman")[0];
    var gunmanContainer = document.getElementsByClassName("gunmanContainer")[0];
    var gameFrame = document.getElementsByClassName("gameFrame")[0];
    var positionObject;
    var delayFight;
        delayFight = 6000;
    var fightMessage;
    var intro = new Audio("intro.mp3");
    var introMichael = new Audio("michael.mp3");
    var wait = new Audio("wait.mp3");
    var fire = new Audio("fire.mp3");
    var shot = new Audio("shot.mp3");
    var shotFoul = new Audio("shot-foul.mp3");
    var death = new Audio("death.mp3");

    function moveToCenter() {
        positionObject = gunmanContainer.getBoundingClientRect();
        // gunmanContainer.style.paddingLeft = positionObject.left + 350 + 'px';
        gunmanContainer.style.paddingLeft = "50%";
         intro.play();
        // introMichael.play();
    };

    function gunmanStay() {
        gunman.style.backgroundPosition = "-225px 0px";
        wait.play();
    }
    
    function gunmanReady() {
        gunman.style.backgroundPosition = "-457px 0px";
        fire.play();

    }

    function playRound() {

        moveToCenter();

        setTimeout(gunmanStay, 5000);

        var inTime;
        var outTime;
        var checkTime;

        var timerId = setTimeout(function () {
            inTime = new Date().getTime();
            gunmanReady();
            canFire();
        }, delayFight);

        function canFire() {
            function userFire() {
                outTime = new Date().getTime();
                console.log("hit");
                shot.play();

                check();
            };

            function check() {
                checkTime = outTime - inTime;
                console.log(checkTime);
                // shot.play();
                if(checkTime < 1000) {
                      win();
                    fightMessage = document.createElement("div");
                    fightMessage.className = "fightMessage";
                    container.appendChild(fightMessage);
                    fightMessage.innerHTML = "You win!";
                    check = null;
                    clearTimeout(timerId);
                    gunman.removeEventListener("mousedown", check);
                } else if(checkTime >= 1000){
                     lost();
                    var foul = new Audio("foul.mp3");
                    foul.play();
                    fightMessage = document.createElement("div");
                    fightMessage.className = "fightMessage";
                    container.appendChild(fightMessage);
                    fightMessage.innerHTML = "GAME OVER";
                    check = null;

                }
            };

                gunman.addEventListener("mousedown", userFire);



        };

        function win() {
            gameFrame.style.boxShadow = "inset 0 0 300px white";
            gunman.style.backgroundPosition = "-761px 0px";
            var win = new Audio("win.mp3");
            win.play();
            nextLevel();
            newGame();

        };

        function lost() {
            gameFrame.style.boxShadow = "inset 0 0 300px red";
            gunman.style.backgroundPosition = "-608px 0px";
            death.play();
            newGame();

        };

        function nextLevel() {
            var nextLevelBtn = document.createElement("button");
            nextLevelBtn.className = "nextLevel";
            container.appendChild(nextLevelBtn);
            nextLevelBtn.innerHTML = "Next level >>";
        };

        function newGame() {
            var newGameBtn = document.createElement("button");
            newGameBtn.className = "newGame";
            container.appendChild(newGameBtn);
            newGameBtn.innerHTML = "NEW GAME";
        };



    };

    playRound();




})();





