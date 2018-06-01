// score ranges for survey
const REACT_MAX = 5;
const CSHARP_MIN = 6;
const CSHARP_MAX = 10;
const RUBY_MIN = 11;

function initialize() {
  buildStorage();
  disable("#nextBtn");
  disable("#viewResults");
}

function buildStorage() {
  var counter = getCounter();
  if (counter === null) return createSurveyObjects();

  resetCounter(counter);
}

function getCounter() {
  var counter = parseItem(localStorage.getItem("counter"));
  return counter;
}

// parse string from LocalStorage to convert back to JSON object
function parseItem(item) {
  return JSON.parse(item);
}

function resetCounter(counter) {
  var counterReset = {
    "id": "counter",
    "currentQuestion": 1,
    "questionLimit": 5,
    "surveyScore": 0
  };

  counter = counterReset;
  addToStorage(counter);
}

// LocalStorage only allows for strings to be stored. Stringify object before storing
function addToStorage(item) {
  var key = item.id;
  var item = JSON.stringify(item);
  localStorage.setItem(key, item);
}

function createSurveyObjects() {
  console.log("building ");
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

function showSurvey() {
  $("#survey").show();
  $("#nextBtn").show();
  $(".progress-box").show();
}

function incrementCounter() {
  var counter = getCounter();
  counter.currentQuestion++;
  addToStorage(counter);
}

function incrementScore() {
  var value = parseInt($("input:radio[name=questionSet]:checked").val())
  var counter = getCounter();
  counter.surveyScore = parseInt(counter.surveyScore) + value;
  addToStorage(counter);
}

function addProgress() {
  var counter = getCounter();
  var percent = ((counter.currentQuestion - 1) / counter.questionLimit) * 100;
  displayPercent(percent);

  if (onLastQuestion(counter)) displayPercent(100);
}

function displayPercent(percent) {
  $(".progress-bar").css("width", percent + "%");
  $("#surveyHeader").text("Survey Progress: " + percent + "%");
}

function onLastQuestion(counter) {
  return counter.currentQuestion === counter.questionLimit;
}

function loadData() {
  var counter = getCounter();
  var question = parseItem(localStorage.getItem("question" + counter.currentQuestion));
  clearRadioChecked();
  addToSurvey(question, counter);
}

function checkQuestion() {
  var counter = getCounter();
  loadData();
  if (onLastQuestion(counter)) buttonSwap();
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

  hideElements();
  if (counter.surveyScore <= REACT_MAX) {
    $("#react").fadeToggle()
  } else if (counter.surveyScore <= CSHARP_MAX && counter.surveyScore >= CSHARP_MIN) {
    $("#cSharp").fadeToggle()
  } else if (counter.surveyScore >= RUBY_MIN) {
    $("#rails").fadeToggle()
  } else {
    alert("You broke it...");
  }
}

function hideElements() {
  $("form, .progress-box, .jumbotron").hide();
  $(".results").children("div").hide();
  $(".results").show();
}

$(document).ready(function() {
  initialize();

  $("#start-survey").click(function() {
    disable("#start-survey");
    $(".jumbotron").hide();
    showSurvey();
    loadData();
  });

  $("label, input[type=radio]").click(function() {
    var counter = getCounter();
    if (onLastQuestion(counter)) unlockBtn("#viewResults");

    unlockBtn("#nextBtn");
  });

  $("#nextBtn").click(function(e) {
    e.preventDefault();

    disable("#nextBtn");
    incrementCounter();
    incrementScore();
    addProgress();
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
