// score ranges for survey
const REACT_MAX = 5;
const CSHARP_MIN = 6;
const CSHARP_MAX = 10;
const RUBY_MIN = 11;

function initialState() {
  wipeStorage();
  buildStorage();
  disable("#nextBtn");
  disable("#viewResults");
}

function wipeStorage() {
  localStorage.clear();
}

function buildStorage() {
  createSurveyObjects();
}

function createSurveyObjects() {
  var counter = {
    "id": "counter",
    "currentQuestion": 1, // start at question 1
    "questionLimit": 5, // go to question 5
    "surveyScore": 0
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
    "title": "Question 4: Pesonal Taste Continued...",
    "one": "1",
    "two": "2",
    "three": "3"
  };

  var question5 = {
    "id": "question5",
    "title": "Question 5: Personal Taste Continued...",
    "one": "1",
    "two": "2",
    "three": "3"
  };

  var objectsArray = [
    counter,
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

// LocalStorage only allows for strings to be stored. Stringify object before storing
function addToStorage(item) {
  var key = item.id;
  var item = JSON.stringify(item);
  localStorage.setItem(key, item);
}

function showSurvey() {
  $("#survey").show();
  $("#nextBtn").show();
  $(".progress").show();
}

function incrementCounter() {
  var counter = getCounter();
  counter.currentQuestion++;
  console.log(counter.currentQuestion);
  addToStorage(counter);
  console.log("counter state adjusted: " + counter.currentQuestion);
}

function incrementScore() {
  var value = parseInt($("input:radio[name=questionSet]:checked").val())
  var counter = getCounter();
  counter.surveyScore = parseInt(counter.surveyScore) + value;
  addToStorage(counter);
  console.log("survey score = " + counter.surveyScore);
}

function loadData() {
  var counter = getCounter();
  console.log(counter);
  var question = parseItem(localStorage.getItem("question" + counter.currentQuestion));
  console.log(question);
  clearRadioChecked();
  addToSurvey(question, counter);
}

function getCounter() {
  var counter = parseItem(localStorage.getItem("counter"));
  return counter;
}

// parse string from LocalStorage to convert back to JSON object
function parseItem(item) {
  return JSON.parse(item);
}

function checkQuestion() {
  var counter = getCounter();
  loadData();
  if (counter.currentQuestion === counter.questionLimit) buttonSwap();
}

function buttonSwap() {
  $("#nextBtn").hide();
  disable("#nextBtn");
  $("#viewResults").show();
}

function clearRadioChecked() {
  $("input[type=radio]").each(function(index, val) {
    $(this).prop("checked", false);
  });
}

function addToSurvey(question, counter) {
  if (counter.currentQuestion > counter.questionLimit) return alert("Stop trying to break things...");

  $(".question-title").text(question.title);
  $("#question1Text").text(question.one);
  $("#question2Text").text(question.two);
  $("#question3Text").text(question.three);
}

function disable(element) {
  $(element).prop("disabled", "true");
}

function enable(element) {
  $(element).removeAttr("disabled");
}

function unlockBtn(btnId) {
  if (countRadioBoxes() === 1) enable(btnId);
}

function countRadioBoxes() {
  var count = 0;
  $("input:radio").each(function(index, item) {
    if ($(item).is(':checked')) count++;
  });
  return count;
}

function displayResults() {
  var counter = getCounter();

  hideAll();
  if (counter.surveyScore <= REACT_MAX) {
    $("#react").show()
  } else if (counter.surveyScore <= CSHARP_MAX && counter.surveyScore >= CSHARP_MIN) {
    $("#cSharp").show()
  } else if (counter.surveyScore >= RUBY_MIN) {
    $("#rails").show()
  } else {
    alert("You broke it...");
  }
}

function hideAll() {
  $(".results").children("div").hide();
  $(".results").show();
}

$(document).ready(function() {
  initialState();

  $("#start-survey").click(function() {
    disable("#start-survey");
    $("#start-survey").hide();
    showSurvey();
    loadData();
  });

  $("label, input[type=radio]").click(function() {
    var counter = getCounter();
    if (counter.currentQuestion === counter.questionLimit) return unlockBtn("#viewResults");

    unlockBtn("#nextBtn");
  });

  $("#nextBtn").click(function(e) {
    e.preventDefault();

    disable("#nextBtn");
    incrementCounter();
    incrementScore();
    checkQuestion();
  });

  $("#viewResults").click(function(e) {
    e.preventDefault();

    displayResults();
  });

  $("#retakeSurvey").click(function() {
    location.reload();
  })
});
