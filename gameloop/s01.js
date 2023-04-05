      // Define the canvas and context
      var canvas = document.getElementById("gameCanvas");
      var ctx = canvas.getContext("2d");

      // Define the game state
      var gameState = {
        score: 0,
        playerX: canvas.width / 2,
        playerY: canvas.height - 50,
        playerSpeed: 5,
        bulletSpeed: 10,
        enemies: [],
        bullets: []
      };

       // Define the sounds
       var bulletSound = new Audio("bullet.mp3");
       var gameSound = new Audio("gamesound.mp3");

        // Set the width and height of the canvas
      canvas.width = 400;
      canvas.height = 700;

      var input = {
        left: false,
        right: false,
        up: false,
        down: false
      };

      // Update player position based on input
      if (input.left && player.x > 0) {
        player.x -= player.speed;
      }
      if (input.right && player.x < canvas.width - player.width) {
        player.x += player.speed;
      }
      if (input.up && player.y > 0) {
        player.y -= player.speed;
      }
      if (input.down && player.y < canvas.height - player.height) {
        player.y += player.speed;
      }

    
      // Define the game loop function
      function gameLoop() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Move the player based on keyboard input
        if (keys.ArrowLeft) {
          gameState.playerX -= gameState.playerSpeed;
        }
        if (keys.ArrowRight) {
          gameState.playerX += gameState.playerSpeed;
        }
        gameSound.play();

      
         

        // Draw the player
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(gameState.playerX - 25, gameState.playerY - 25, 50, 50);

        // Add enemies randomly
        if (Math.random() < 0.01) {
          gameState.enemies.push({
            x: Math.random() * canvas.width,
            y: -50,
            speed: Math.random() * 2 + 1
          });
        }

        // Move and draw enemies
        ctx.fillStyle = "#FF0000";
        gameState.enemies.forEach(function(enemy) {
          enemy.y += enemy.speed;
          ctx.fillRect(enemy.x - 25, enemy.y - 25, 50, 50);
        });

        // Move and draw bullets
        ctx.fillStyle = "#FFFF00";
        gameState.bullets.forEach(function(bullet) {
          bullet.y -= gameState.bulletSpeed;
          ctx.fillRect(bullet.x - 5, bullet.y - 5, 10, 10);
        });

        // Check for collisions between enemies and bullets
        gameState.enemies.forEach(function(enemy) {
          gameState.bullets.forEach(function(bullet) {
            if (
              bullet.x > enemy.x - 25 &&
              bullet.x < enemy.x + 25 &&
              bullet.y > enemy.y - 25 &&
              bullet.y < enemy.y + 25
            ) {
              gameState.score++;
              gameState.enemies.splice(gameState.enemies.indexOf(enemy), 1);
              gameState.bullets.splice(gameState.bullets.indexOf(bullet), 1);
              bulletSound.play();
            }
          });
        });

        // Draw the score
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "24px Arial";
        ctx.fillText("Score: " + gameState.score, 10, 30);

        // Call this function again on the next frame
        requestAnimationFrame(gameLoop);
      }

      // Define the keyboard input handling
      var keys = {};
      window.addEventListener("keydown", function(event) {
        keys[event.code] = true;
      });
      window.addEventListener("keyup", function(event) {
        keys[event.code] = false;
      });

      // Define the bullet firing handling
      window.addEventListener("click", function(event) {
        gameState.bullets.push({
          x: gameState.playerX,
          y: gameState.playerY - 25
        });
      });


      // Start the game loop
      requestAnimationFrame(gameLoop);
