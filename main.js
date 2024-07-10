let circlep = {x: 0, y: 0};
let charImageIndex = 0;
let dkeyp = false;
let akeyp = false;
let timerStarted = false;
let timerStopped = false;
let startTime;
let timerInterval;

document.addEventListener('keydown', function(keypressevent) {
  let key = keypressevent.key;
  if (!timerStarted && !timerStopped && ['w', 'a', 's', 'd'].includes(key)) {
    timerStarted = true;
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 100);
  }
  updatecharp(key);
});

function updatecharp(key) {
  if (timerStopped) return;

  switch (key) 
  {
    case 'w':
      circlep.y -= 10; 
      document.getElementById("char_img").src = "walk_normal.svg";
      break;
    
    case 's':
      circlep.y += 10; 
      document.getElementById("char_img").src = "walk_normal.svg";
      break;
    
    case 'a':
      circlep.x -= 10;
      if (!akeyp) {
        akeyp = true;
        animatechar_l();
      }
      break;
    
    case 'd':
      if (!dkeyp) {
        dkeyp = true;
        animatechar_r();
      }
      circlep.x += 10;
      break;
  }
  console.log(`Char position: (${circlep.x}, ${circlep.y})`);

  document.getElementById("char").style.top = `${circlep.y}px`;
  document.getElementById("char").style.left = `${circlep.x}px`;

  checkCollision();
}

function animatechar_r() 
{
  let images = ["walk_right_1.svg", "walk_right_2.svg"];
  for (let i = 0; i < images.length; i++) {
    setTimeout(function(index) {
      document.getElementById("char_img").src = images[index];
    }, i * 300, i);
  }
  setTimeout(function() {
    dkeyp = false;
  }, images.length * 500);
}

function animatechar_l() 
{
  let images = ["walk_left_1.svg", "walk_left_2.svg"];
  for (let i = 0; i < images.length; i++) {
    setTimeout(function(index) {
      document.getElementById("char_img").src = images[index];
    }, i * 300, i);
  }
  setTimeout(function() {
    akeyp = false;
  }, images.length * 500);
}

function getRandomPosition(container, element) {
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  const maxX = containerRect.width - elementRect.width;
  const maxY = containerRect.height - elementRect.height;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  return { x: randomX, y: randomY };
}

function randomizeDivPositions() {
  const container = document.getElementById('container');
  const divs = document.getElementsByClassName('random-div');

  Array.from(divs).forEach(div => {
    const { x, y } = getRandomPosition(container, div);
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
  });
}

function checkCollision() {
  const char = document.getElementById("char");
  const charRect = char.getBoundingClientRect();
  const divs = document.getElementsByClassName('random-div');

  Array.from(divs).forEach(div => {
    const divRect = div.getBoundingClientRect();

    if (charRect.left < divRect.right &&
        charRect.right > divRect.left &&
        charRect.top < divRect.bottom &&
        charRect.bottom > divRect.top) {
      div.remove();
    }
  });

  checkDivs();
}

function checkDivs() {
  const remainingDivs = document.getElementsByClassName('random-div').length;

  if (remainingDivs === 0) {
    clearInterval(timerInterval);
    const endTime = new Date().getTime();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(3);
    document.getElementById('timer').textContent = `Time: ${timeTaken} seconds - Game Over`;
    timerStopped = true;
  }
}

function updateTimer() {
  if (timerStopped) return;
  const currentTime = new Date().getTime();
  const timepassed = ((currentTime - startTime) / 1000).toFixed(3);
  document.getElementById('timer').innerHTML = `Time: ${timepassed} seconds`;
}

window.onload = randomizeDivPositions;

// eeeeeeeeeeeeeeeeeeeeeeeeeee