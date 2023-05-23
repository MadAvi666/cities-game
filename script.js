let counter = 0;
let playerHelpCounter = 0;
let buttonPressCounter = 0;
let siteText = document.querySelector(".text-container h1");
let inputPlaceholder = document.querySelector(".text-input");
let surrenderButton = document.querySelector(".surrender");
let hintContainer = document.querySelector(".hint-container");
let helpButton = document.querySelector(".help-button");

inputPlaceholder.addEventListener("keyup", function (key) {
  if (key.keyCode == 13) {
    inputGetValue();
  }
});

helpButton.addEventListener("click", function () {
  buttonPressCounter += 1;
  console.log(buttonPressCounter);
  if (buttonPressCounter > 3) {
    newNotif("У вас закончились подсказки", 5000);
    helpButton.style.display = "none";
  } else {
    newNotif(`Подсказка: ${newRandomHelpWord()}`, 10000);
  }
});

surrenderButton.addEventListener("click", function () {
  console.log("Вы сдались и проиграли");
  endGame();
  siteText.textContent = "Вы сдались и проиграли";
});

function inputGetValue() {
  let userInput = inputPlaceholder.value.toLowerCase().trim();
  console.log(userInput);
  inputPlaceholder.value = "";
  gameStart(userInput);
}

function gameStart(userInput) {
  if (cities.includes(userInput)) {
    if (counter > 0) {
      if (userInput[0] !== nextSign) {
        console.log(`Ошибка! Введите слово на букву: ${nextSign}`);
        newNotif(`Ошибка! Введите слово на букву: ${nextSign}`, 5000);
      } else {
        console.log(`Ваше слово: ${userInput}`);
        counter += 1;
        inputHandler(userInput);
      }
    } else {
      console.log(`Ваше слово: ${userInput}`);
      counter += 1;
      inputHandler(userInput);
    }
  } else if (userInput === "") {
  } else {
    console.log("Такого города нет");
    newNotif("Такого города нет", 5000);
    if (counter > 0) {
      playerHelpCounter += 1;
      if (playerHelpCounter === 3) {
        helpButton.style.display = "block";
      }
    }
  }
}

function newRandomHelpWord() {
  let helpWords = [];
  for (let i of cities) {
    if (i[0] === nextSign) {
      helpWords.push(i);
    }
  }
  let rHelp = randomNum(helpWords.length);
  let helpWord = helpWords[rHelp];
  return helpWord;
}

function inputHandler(str) {
  let arrAnswers = [];
  let inputLastSign = str[str.length - 1];
  if (inputLastSign === "ы" || inputLastSign === "ь" || inputLastSign === "й") {
    inputLastSign = str[str.length - 2];
    if (inputLastSign === "ы") {
      inputLastSign = str[str.length - 3];
    }
  }
  for (let i of cities) {
    if (i[0] === inputLastSign) {
      arrAnswers.push(i);
    }
  }
  if (arrAnswers.length === 0) {
    computerLoose = true;
    console.log("Вы выиграли!");
    endGame();
    siteText.textContent = "Вы выиграли!";
  }
  cityDelete(cities.indexOf(str));
  let rNum = randomNum(arrAnswers.length);
  cityDelete(cities.indexOf(arrAnswers[rNum]));
  siteText.textContent = arrAnswers[rNum];
  console.log(`Компьютер: ${arrAnswers[rNum]}`);
  answerHandler(arrAnswers[rNum]);
}

function answerHandler(str) {
  nextSign = str[str.length - 1];
  if (nextSign === "й" || nextSign === "ы" || nextSign === "ь") {
    nextSign = str[str.length - 2];
    if (nextSign === "ы") {
      nextSign = str[str.length - 3];
    }
  }
  console.log(`Ваше слово должно быть на букву: ${nextSign}`);
  inputPlaceholder.placeholder = `Ваше следующее слово должно быть на букву: ${nextSign}`;
}

function newNotif(message, time) {
  hintContainer.style.display = "flex";
  let newDiv = document.createElement("div");
  newDiv.classList.add("test");
  newDiv.textContent = message;
  hintContainer.appendChild(newDiv);
  setTimeout(function () {
    newDiv.remove();
    if (hintContainer.querySelectorAll("*").length == 0) {
      hintContainer.style.display = "none";
    }
  }, time);
}

function cityDelete(index) {
  cities.splice(index, 1);
}

function randomNum(max) {
  return Math.floor(Math.random() * (max - 0 + 1) + 0);
}

function endGame() {
  inputPlaceholder.style.display = "none";
  surrenderButton.style.display = "none";
  helpButton.style.display = "none";
}
