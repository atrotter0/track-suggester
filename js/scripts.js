// number of question sets
const SET_ONE = 1;
const SET_TWO = 2;
const SET_THREE = 3;
const SET_FOUR = 4;
const SET_FIVE = 5;

// check for local storage files first, then create or next
function checkStorage() {
  var count = localStorage.getItem("count");
  if (count === null) createSurveyObjects();
}

function createSurveyObjects() {
  console.log("creating survey...");
}

$(document).ready(function() {
  checkStorage();

  $("#formBtn").click(function(e) {
    e.preventDefault();
  });
});