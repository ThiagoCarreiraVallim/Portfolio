const btnTask = document.querySelector('#criar-tarefa');
const taskList = document.querySelector('#lista-tarefas');
const btnDel = document.querySelector('#apaga-tudo');
const btnDelComplete = document.querySelector('#remover-finalizados');
const btnSave = document.querySelector('#salvar-tarefas');
const btnUp = document.querySelector('#mover-cima');
const btnDown = document.querySelector('#mover-baixo');
const btnDelSelect = document.querySelector('#remover-selecionado');

function presetList() {
  const storage = localStorage.getItem(0);
  if (storage !== null) {
    for (let index = 0; index < localStorage.length; index += 1) {
      let atual = localStorage.getItem(index);
      if (atual !== null) {
        atual = atual.split(',');
        const beforeLi = document.createElement('li');
        beforeLi.innerText = atual[0];
        beforeLi.className = atual[1];
        taskList.appendChild(beforeLi);
        if (beforeLi.classList.contains('completed')) {
          const newIcon = document.createElement('i');
          newIcon.className = 'fas fa-check-circle';
          beforeLi.appendChild(newIcon);
        }
      }
    }
  }
}

function createList(event) {
  const inputTask = document.querySelector('#texto-tarefa');
  const key = event.keyCode
  if (inputTask.value !== '') {
    if (key == 13 || event.target.id === 'criar-tarefa') {
      const creatLi = document.createElement('li');
      creatLi.innerText = inputTask.value;
      creatLi.className = 'task';
      taskList.appendChild(creatLi);
      inputTask.value = '';
    }
  }
}

function addListButton() {
  const inputText = document.querySelector('#texto-tarefa');
  btnTask.addEventListener('click', createList);
  inputText.addEventListener('keyup', createList);
}

function selectTask(event) {
  if (event.target.id !== 'lista-tarefas'){
    const listOfTasks = document.querySelector('.selected');
    if (listOfTasks !== null) {
      listOfTasks.classList.remove('selected');
    }
    event.target.classList.toggle('selected');
  }
}

function completedTask(event) {
  const listTask = document.querySelectorAll('.task i');
  const icon = document.createElement('i');
  icon.className = 'fas fa-check-circle'
  const i = event.target.children
  if (event.target.id !== 'lista-tarefas'){
    event.target.classList.toggle('completed');
    if (event.target.children.length > 0) {
      event.target.removeChild(i[0]);
    } else {
      event.target.appendChild(icon);
    }
  }
}

function creatSelectTask() {
    taskList.addEventListener('click', selectTask);
    taskList.addEventListener('dblclick', completedTask);
}

function deleteAll() {
  btnDel.addEventListener('click', function () {
    const listOfDel = document.querySelectorAll('.task');
    for (let index = 0; index < listOfDel.length; index += 1) {
      taskList.removeChild(listOfDel[index]);
    }
  });
}

function removeCompleted() {
  btnDelComplete.addEventListener('click', function () {
    const listOfComplete = document.querySelectorAll('.completed');
    for (let index = 0; index < listOfComplete.length; index += 1) {
      taskList.removeChild(listOfComplete[index]);
    }
  });
}

function storageList() {
  const list = document.querySelectorAll('.task');
  localStorage.clear();
  for (let index = 0; index < list.length; index += 1) {
    const arrayList = [];
    arrayList.push(list[index].innerText);
    arrayList.push(list[index].className);
    localStorage.setItem(index, arrayList);
  }
}

function saveList() {
  btnSave.addEventListener('click', storageList);
}

function pickIndex(classItem) {
  let numb;
  const numberOfPos = document.querySelectorAll('.task');
  for (let index = 0; index < numberOfPos.length; index += 1) {
    if (numberOfPos[index].classList.contains(classItem)) {
      numb = index;
    }
  }
  return numb;
}

function changeIndex(newIndex, event, newPosition) {
  const numberOfPos = document.querySelectorAll('.task');
  if (newIndex > 0 && event.currentTarget.id === 'mover-cima') {
    taskList.removeChild(numberOfPos[newIndex]);
    taskList.insertBefore(newPosition, numberOfPos[newIndex - 1]);
  }
  if (newIndex < numberOfPos.length && event.currentTarget.id === 'mover-baixo') {
    taskList.removeChild(numberOfPos[newIndex]);
    taskList.insertBefore(newPosition, numberOfPos[newIndex + 2]);
  }
}
function upSelected(event) {
  const liSelected = document.querySelector('.selected');
  if (liSelected !== null) {
    const newPosition = document.createElement('li');
    newPosition.innerText = liSelected.innerText;
    newPosition.className = liSelected.className;
    const newIndex = pickIndex('selected');
    changeIndex(newIndex, event, newPosition);
  }
}

function changePosition() {
  btnUp.addEventListener('click', upSelected);
  btnDown.addEventListener('click', upSelected);
}

function removeSelected() {
  btnDelSelect.addEventListener('click', function () {
    const numberOfPos = document.querySelectorAll('.task');
    const ind = pickIndex('selected');
    if (ind !== undefined) {
      taskList.removeChild(numberOfPos[ind]);
    }
  });
}

presetList();
addListButton();
creatSelectTask();
deleteAll();
removeCompleted();
saveList();
changePosition();
removeSelected();
