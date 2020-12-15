window.onload = function () {
  document.querySelector('#black').className += ' selected';
};

const pixelBoard = document.querySelector('#pixel-board');
const colorPalette = document.querySelector('.colorPalette');
const palette1 = document.querySelector('#color1');
const btnErase = document.querySelector('#clear-board');
const numberSquare = document.querySelector('#board-size');
const generateSquare = document.querySelector('#generate-board');
const barde = document.querySelector('#barde');
const paleta = document.querySelector('#multColor')
let atualNumber = 20;


function makeLinePixels(line, numbers) {
  for (let index = 0; index < numbers; index += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    line.appendChild(pixel);
  }
  atualNumber = numbers;
}


function makePixels(numbers) {
  for (let index = 0; index < numbers; index += 1) {
    const pixelLine = document.createElement('div');
    makeLinePixels(pixelLine, numbers);
    pixelLine.className = 'linePixel';
    pixelBoard.appendChild(pixelLine);
  }
}

function isInside() {
  let rightSize = parseInt(numberSquare.value, 10);
  if (rightSize < 5) {
    rightSize = 5;
  } else if (rightSize > 100) {
    rightSize = 100;
  }
  makePixels(rightSize);
}

function reposeSquare() {
  if (numberSquare.value === '') {
    alert('Board inválido!');
  } else {
    const childrenPixel = document.querySelectorAll('.linePixel');
    for (let index = 0; index < atualNumber; index += 1) {
      pixelBoard.removeChild(childrenPixel[index]);
    }
    isInside();
  }
}

function setNumbersOfSquares() {
  generateSquare.addEventListener('click', reposeSquare);
}

function getColor() {

}

function makePixelColorized(event) {
  let color = document.querySelector('.selected');
  if (color.tagName == 'DIV') {
    color = color.id;
  } else {
    color = color.value;
  }
  event.target.style.backgroundColor = color;
  if (color !== 'white'){
    event.target.classList.add('colorized');
  } else {
    event.target.classList.remove('colorized');
  }
}

function colorizePixels() {
  pixelBoard.addEventListener('click', makePixelColorized);
}

function selectPalette(event) {
  const deSelected = document.querySelector('.selected')
  deSelected.classList.remove('selected');
  event.target.classList.add('selected');
}


function setSelected() {
  colorPalette.addEventListener('click', selectPalette);
}

function eraseAll() {
  const pixel = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].classList.remove('colorized');
    pixel[index].style.backgroundColor = 'white';
  }
}

function eraseScreen() {
  btnErase.addEventListener('click', eraseAll);
}

function colorizeAll() {
  barde.addEventListener('click', function () {
    const pixel = document.querySelectorAll('.pixel');
    for (let index = 0; index < pixel.length; index += 1) {
      if (pixel[index].classList.contains('colorized') == false) {
        pixel[index].style.backgroundColor = paleta.value;
      }
    }
  })
}

makePixels(20);
makePixels();
colorizePixels();
setSelected();
eraseScreen();
setNumbersOfSquares();
colorizeAll();
