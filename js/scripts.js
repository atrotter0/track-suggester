// number of question sets
const SET_ONE = 1;
const SET_TWO = 2;
const SET_THREE = 3;
const SET_FOUR = 4;
const SET_FIVE = 5;

// wipe storage each time page loads
function wipeStorage() {
  console.log("Wiping local storage...");
  localStorage.clear();
}

function buildStorage() {
  createSurveyObjects();
}

function createSurveyObjects() {
  console.log("creating questions...");

  var count = {
    "id": "count",
    "count": 0
  };

  var question1 = {
    "id": "question1",
    "title": "Question 1: Environment",
    "one": "1",
    "two": "2",
    "three": "3"
  };

  var question2 = {
    "id": "question2",
    "title": "Question 2: Usage",
    "one": "1",
    "two": "2",
    "three": "3"
  };

  var question3 = {
    "id": "question3",
    "title": "Question 3: Personal Taste",
    "one": "1",
    "two": "2",
    "three": "3"
  };

  var question4 = {
    "id": "question4",
    "title": "Question 4: Pesonal Taste Cont...",
    "one": "1",
    "two": "2",
    "three": "3"
  };

  var question5 = {
    "id": "question5",
    "title": "Question 5: Personal Taste Cont...",
    "one": "1",
    "two": "2",
    "three": "3"
  };

  var objectsArray = [
    count,
    question1,
    question2,
    question3,
    question4,
    question5
  ];

  buildLocalStorage(objectsArray);
}

function buildLocalStorage(array) {
  for(i = 0; i < array.length; i++) {
    addToStorage(array[i]);
  }
}

function addToStorage(item) {
  console.log("adding item " + item.id + " to storage");
  var key = item.id;
  var item = JSON.stringify(item);
  localStorage.setItem(key, item);
}

function resetCount() {
  localStorage.setItem("count", 0);
}

$(document).ready(function() {
  wipeStorage();
  buildStorage();

  $("#formBtn").click(function(e) {
    e.preventDefault();
  });
});