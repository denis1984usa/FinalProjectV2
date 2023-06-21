// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);

// load images ========================================================
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/backgroundearth2.jpg";


// Side image
var sideReady = false;
var sideImage = new Image();
sideImage.onload = function () {
    sideReady = true;
};
sideImage.src = "images/BorderLeft.jpg";

// Top image
var topReady = false;
var topImage = new Image();
topImage.onload = function () {
    topReady = true;
};
topImage.src = "images/BorderTop.jpg"; 



// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/Front.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/SpaceX.png";

// Meteorite
var rockReady = false;                    // Rock (meteorites) doesn============
var rockImage = new Image();
rockImage.onload = function () {
    rockReady = true;
};
rockImage.src = "images/Rock.png"; 

// done with load images ========================================================


// define objects and variables we need =========================================

// Game objects
var hero = {
    speed: 200, // movement in pixels per second
    x: 0,  // where on the canvas are they?
    y: 0  // where on the canvas are they?
};
var monster = {
// for this version, the monster does not move, so just and x and y
    x: 0,
    y: 0
};
var monstersCaught = 0;
var rock1 = {
    // for this version, the monster does not move, so just and x and y
     x: 100,
     y: 100
 };
 var rock2 = {
    // for this version, the monster does not move, so just and x and y
     x: 620,
     y: 250
 };
 var rock3 = {
    // for this version, the monster does not move, so just and x and y
     x: 350,
     y: 730
 };


// end define objects and variables we need =========================================

// keyboard control =============================================
// Handle keyboard controls
var keysDown = {}; //object were we properties when keys go down
                // and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down.  In our game loop, we will move the hero image if when
// we go thru render, a key is down

addEventListener("keydown", function (e) {
    
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
   
    delete keysDown[e.keyCode];
}, false);

// end keyboard control =============================================


// define functions ==============================================

// Update game objects
var update = function (modifier) {
   
   //  adjust based on keys
    if (38 in keysDown && hero.y > 16 + 0) { //  holding up key
    hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown && hero.y < canvas.height - (68 + 0)) { //  holding down key
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown && hero.x > (16 + 0)) { // holding left key
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown && hero.x < canvas.width - (50 + 0)) { // holding right key
        hero.x += hero.speed * modifier;
    }
    // Cancel if you touching meteorite?
    if (
        hero.x <= (rock1.x + 40)
        && rock1.x <= (hero.x + 40)
        && hero.y <= (rock1.y + 40)
        && rock1.y <= (hero.y + 40)
    ) {
        alert("Game Over, you crashed into meteorite")
    }
    if (
        hero.x <= (rock2.x + 30)
        && rock2.x <= (hero.x + 30)
        && hero.y <= (rock2.y + 30)
        && rock2.y <= (hero.y + 30)
    ) {
        alert("Game Over, you crashed into meteorite")
    }
    if (
        hero.x <= (rock3.x + 40)
        && rock3.x <= (hero.x + 40)
        && hero.y <= (rock3.y + 40)
        && rock3.y <= (hero.y + 40)
    ) {
        alert("Game Over, you crashed into meteorite")
    }

    // Are they touching?
    if (
        hero.x <= (monster.x + 100)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 100)
        && monster.y <= (hero.y + 50)
    ) {
        ++monstersCaught;       // keep track of our “score”
        reset();       // start a new cycle
    }
        
};

// Draw everything in the main render function
var render = function () {
    if (bgReady) {
 
        ctx.drawImage(bgImage, 0, 0);
    }
    if (sideReady) {
 
        ctx.drawImage(sideImage, 0, 0);
        ctx.drawImage(sideImage, 984, 0);
    }
    if (topReady) {
 
        ctx.drawImage(topImage, 0, 984);
        ctx.drawImage(topImage, 0, 0);
    }
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }
    if (rockReady) {
 
        ctx.drawImage(rockImage, rock1.x, rock1.y);
        ctx.drawImage(rockImage, rock2.x, rock2.y);
        ctx.drawImage(rockImage, rock3.x, rock3.y);
    }
    //rockImage
  
    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Space Shuttle loaded: " + monstersCaught, 32, 32);

};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    //  Request to do this again ASAP
    requestAnimationFrame(main);
};

// Reset the game when the player catches a monster
var reset = function () {
    hero.x = (canvas.width / 2) -16;
    hero.y = (canvas.height / 2) -16;

    //Place the monster somewhere on the screen randomly
    // but not in the hedges, Article in wrong, the 64 needs to be 
    //  hedge 32 + hedge 32 + char 32 = 96
    monster.x = 32 + (Math.random() * (canvas.width - 178));
    monster.y = 32 + (Math.random() * (canvas.height - 165));
};

// end of define functions ==============================================

// Let's play this game!  ===============
var then = Date.now();
reset();
main();  // call the main game loop.

