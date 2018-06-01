function initialState() {
  wipeStorage();
  buildStorage();
  disable("#nextBtn");
  disable("#viewResults");
}

function wipeStorage() {
  console.log("Wiping local storage...");
  localStorage.clear();
}

function buildStorage() {
  createSurveyObjects();
}

function createSurveyObjects() {
  console.log("creating questions...");

  var counter = {
    "id": "counter",
    "currentQuestion": 1, // start at question 1
    "questionLimit": 5 // go to question 5
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

function addToStorage(item) {
  console.log("adding item " + item.id + " to storage");
  var key = item.id;
  var item = JSON.stringify(item);
  localStorage.setItem(key, item);
}

function showSurvey() {
  $("#survey").show();
  $("#nextBtn").show();
  $(".progress").show();
}

function loadData() {
  var counter = getCounter();
  console.log(counter);
  var question = parseItem(localStorage.getItem("question" + counter.currentQuestion));
  console.log(question);
  clearRadioChecked();
  addToSurvey(question);
}

function getCounter() {
  var counter = parseItem(localStorage.getItem("counter"));
  return counter;
}

function parseItem(item) {
  return JSON.parse(item);
}

function incrementCounter() {
  var counter = getCounter();
  counter.currentQuestion++;
  console.log(counter.currentQuestion);
  addToStorage(counter);
  console.log("counter state adjusted: " + counter.currentQuestion);
}

function checkQuestion() {
  var counter = getCounter();
  loadData();
  if (counter.currentQuestion === counter.questionLimit) showResults();
}

function showResults() {
  $("#nextBtn").hide();
  disable("#nextBtn");
  enable("#viewResults");
  $("#viewResults").show();
}

function clearRadioChecked() {
  $("input[type=radio]").each(function(index, val) {
    $(this).prop("checked", false);
  });
}

function addToSurvey(question) {
  $(".question-title").text(question.title);
  $("#question1Text").text(question.one);
  $("#question2Text").text(question.two);
  $("#question3Text").text(question.three);
  $("input[type=radio]").attr("name", question.id);
}

function disable(element) {
  $(element).prop("disabled", "true");
}

function enable(element) {
  $(element).removeAttr("disabled");
}

function validateInput() {
  if (countRadioBoxes() === 1) enable("#nextBtn");
}

function countRadioBoxes() {
  var count = 0;
  $("input:radio").each(function(index, item) {
    if ($(item).is(':checked')) count++;
  });
  return count;
}

$(document).ready(function() {
  initialState();

  $("#start-survey").click(function() {
    showSurvey();
    loadData();
  });

  $("label, input[type=radio]").click(function() {
    validateInput();
  });

  $("#nextBtn").click(function(e) {
    e.preventDefault();

    disable("#nextBtn");
    incrementCounter();
    checkQuestion();
  });

  $("#viewResults").click(function(e) {
    e.preventDefault();

    // check state first before allowing button to be clicked
    // calculate results
  });
});
