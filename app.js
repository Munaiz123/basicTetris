document.addEventListener('DOMContentLoaded', ()=>{
  const grid = document.querySelector('.grid')
  let squares = Array.from(document.querySelectorAll(".grid div"))
  const scoreDisplay = document.getElementById('score')
  const startButton = document.getElementById('start-button')
  const width = 10

  const lShape = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width, width * 2 + 2],
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
    [1, width + 2, width + 2, width * 2 + 1],
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
    [1, width, +1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const shapes = [lShape,zShape,tShape,oShape,iShape]

  let currentPosition = 4
  let currentRotation = 0

  // select shape at random
  let random = Math.floor(Math.random()*shapes.length)
  let current = shapes[random][0]


  function draw(){
    current.forEach(index =>{
      squares[currentPosition + index].classList.add('tetrimino')
    })
  }

  function undraw(){
    current.forEach(index =>{
      squares[currentPosition + index].classList.remove('tetrimino')
    })
  }

})
