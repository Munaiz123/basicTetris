document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const scoreDisplay = document.getElementById("score");
  const startButton = document.getElementById("start-button");
  const width = 10;

  const lShape = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zShape = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tShape = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oShape = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iShape = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const shapes = [lShape, zShape, tShape, oShape, iShape];

  let currentPosition = 4;
  let currentRotation = 0;

  // select shape at random
  let random = Math.floor(Math.random() * shapes.length);
  let current = shapes[random][0];

  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("tetrimino");
    });
  }

  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetrimino");
    });
  }

  // allows shape to move down every second
  let timerId = setInterval(moveDown, 500);

  function control(event){
    if(event.keyCode === 37) moveLeft() // ◀️ left arrow key
    if(event.keyCode === 38) rotate() // 🔼 up arrow key
    if(event.keyCode === 39) moveRight() //  ▶️ right arrow key
  }
  document.addEventListener('keyup',control)


  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );

      // start new shape falling
      random = Math.floor(Math.random() * shapes.length);
      current = shapes[random][currentRotation];
      currentPosition = 4;
      draw();
    }
  }

  // move the shape left until it's at the edge of the gameboard or there is another
  // shape blocking it.
  function moveLeft(){
    undraw()
    const isAtLeftEdge = current.some(index =>(currentPosition + index) % width === 0)

    if(!isAtLeftEdge) currentPosition -=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
      currentPosition +=1
    }
    draw()
  }

  function moveRight(){
    undraw()
    const isAtRigtEdge = current.some(index =>(currentPosition + index) % width === width -1)

    if(!isAtRigtEdge) currentPosition +=1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
      currentPosition -=1
    }
    draw()
  }

  function rotate(){
    undraw()
    currentRotation ++
    // if current rotation = 4 go back to original position of the shape ⤵️
    if(currentRotation === current.length) currentRotation = 0;
    current = shapes[random][currentRotation]
    draw()
  }

});
