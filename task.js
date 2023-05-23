let counter = 0;
let nextSign = 0;
let computerLoose = false;

gameStart();

function gameStart() {
  let userInput = "";
  do {
    userInput = prompt("Введите город");
    if (cities.includes(userInput)) {
      if (counter > 0) {
        if (userInput[0] !== nextSign) {
          console.log(`Ошибка! Введите слово на букву: ${nextSign}`);
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
    } else if (userInput === "" || userInput === null) {
      console.log("Вы проиграли");
      userInput = null;
    } else {
      console.log("Такого слова нет!");
    }
  } while (userInput !== null && computerLoose !== true);
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
    console.log("Вы победили!");
  }
  cityDelete(cities.indexOf(str));
  let rNum = randomNum(arrAnswers.length);
  cityDelete(cities.indexOf(arrAnswers[rNum]));
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
}

function cityDelete(index) {
  cities.splice(index, 1);
}

function randomNum(max) {
  return Math.floor(Math.random() * (max - 0 + 1) + 0);
}
