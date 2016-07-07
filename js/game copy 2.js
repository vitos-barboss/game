(function () {

    var gunman = document.getElementsByClassName("gunman")[0];
    var gunmanContainer = document.getElementsByClassName("gunmanContainer")[0];
    var gameFrame = document.getElementsByClassName("gameFrame")[0];
    var positionObject;
    var delayFight;
        delayFight = 6000;

    function moveToCenter() {
        positionObject = gunmanContainer.getBoundingClientRect();
        gunmanContainer.style.paddingLeft = positionObject.left + 350 + 'px';
    };

    function gunmanStay() {
        gunman.style.backgroundPosition = "-225px 0px";
    }
    
    function gunmanReady() {
        gunman.style.backgroundPosition = "-457px 0px";
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
                check();
            };

            function check() {
                checkTime = outTime - inTime;
                console.log(checkTime)
                if(checkTime < 1000) {
                      win();
                    clearTimeout(timerId);
                    gunman.removeEventListener("mousedown", userFire);
                } else if(checkTime >= 1000){
                     lost();
                }
            };
            gunman.addEventListener("mousedown", userFire);
        };

        function lost() {
            gameFrame.style.boxShadow = "inset 0 0 300px red";
            gunman.style.backgroundPosition = "-608px 0px";
            return function(){
                console.log("You lost!");

            }

        };

        function win() {
            gameFrame.style.boxShadow = "inset 0 0 300px white";
            gunman.style.backgroundPosition = "-761px 0px";
            // gunmanContainer.style.transform = "scale(0.8)";
            // gunmanContainer.style.paddingTop = "176px";
            // gunmanContainer.style.transition = "2s";

            return function(){
                console.log("You won!");

            }

        };


    };

    playRound();




})();





