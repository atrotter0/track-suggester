// score ranges for survey
const REACT_MAX = 5;
const CSHARP_MIN = 6;
const CSHARP_MAX = 10;
const RUBY_MIN = 11;

function initialize() {
  localStorage.clear();
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
  var counter = {
    "id": "counter",
    "currentQuestion": 1, // start at question 1
    "questionLimit": 5, // go to question 5
    "surveyScore": 0
  };

  var question1 = {
    "id": "question1",
    "title": "Question 1: Environment",
    "one": "I want to work at a small or medium-sized business.",
    "two": "I want to develop software for businesses to use internally.",
    "three": "I want to create web applications for anyone to be able to use."
  };

  var question2 = {
    "id": "question2",
    "title": "Question 2: Interests",
    "one": "I enjoy creating front-end interactivity.",
    "two": "I like to think about problems as a whole, and tackle issues a piece at a time.",
    "three": "I want access to a wide array of libraries. Magic is exciting!"
  };

  var question3 = {
    "id": "question3",
    "title": "Question 3: Syntax",
    "one": "Semi-colons are where it's at.",
    "two": "I want to declare data types ahead of time when creating my functions.",
    "three": "I can't stand punctuation. I enjoy elegant, readable code."
  };

  var question4 = {
    "id": "question4",
    "title": "Question 4: Work",
    "one": "I like sleek designs and interesting features that grab my attention.",
    "two": "I like a mixture of front-end and back-end work.",
    "three": "I like to work with user authentication and portals."
  };

  var question5 = {
    "id": "question5",
    "title": "Question 5: Personal Taste",
    "one": "I want more ways to manipulate the DOM.",
    "two": "I am interested in learning a language for game development.",
    "three": "I like things to just work behind the scenes, giving me tools to simplify the task at hand."
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
  $("#survey").fadeToggle(500);
  $("#nextBtn").fadeToggle(900);
  $(".progress-box").fadeToggle(700);
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
  var percent = (counter.currentQuestion / counter.questionLimit) * 100;
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
  $("#viewResults").fadeToggle(800);
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
  if (radioBoxChecked()) enable(btnId);
}

function radioBoxChecked() {
  var count = $("input[type=radio]:checked").length;
  if (count > 0) return true;
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
    addProgress(20);
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
